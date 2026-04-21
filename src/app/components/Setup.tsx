'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const SNAPSHOT_KEY = 'desk-snapshot-v1';

const Setup = () => {
  const mount = useRef<HTMLDivElement>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  // Show cached snapshot immediately — zero load time on return visits
  useEffect(() => {
    try {
      const cached = localStorage.getItem(SNAPSHOT_KEY);
      if (cached) setSnapshot(cached);
    } catch {}
  }, []);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    container.innerHTML = '';

    let spinSpeed = 0.003;
    const spinDecay = 0.985;
    let userInteracting = false;
    let animId: number;
    let snapshotTaken = false;

    const scene = new THREE.Scene();
    scene.background = null;

    const w = container.clientWidth || 240;
    const h = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
      preserveDrawingBuffer: true, // needed for toDataURL snapshot
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const resize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw && nh) {
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Lighting with shadows
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 20;
    scene.add(dirLight);

    // Shadow receiver ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.35 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.65;
    ground.receiveShadow = true;
    scene.add(ground);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.addEventListener('start', () => { userInteracting = true; spinSpeed = 0; });
    controls.addEventListener('end', () => { userInteracting = false; });

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    let modelGroup: THREE.Group;

    loader.load('setup.glb', (gltf) => {
      modelGroup = new THREE.Group();
      modelGroup.add(gltf.scene);
      scene.add(modelGroup);

      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(center);

      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1 / maxDim;
      gltf.scene.scale.set(scale, scale, scale);

      camera.position.set(0, (size.y * scale) / 3, 1.5);
      camera.lookAt(0, 0, 0);

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;

      if (modelGroup && !userInteracting && spinSpeed > 0) {
        modelGroup.rotation.y += spinSpeed;
        spinSpeed *= spinDecay;
      }
      controls.update();
      renderer.render(scene, camera);

      // Capture snapshot after model has settled (~2s of spin)
      if (modelGroup && !snapshotTaken && spinSpeed < 0.001) {
        snapshotTaken = true;
        setCanvasReady(true);
        try {
          const dataUrl = renderer.domElement.toDataURL('image/webp', 0.75);
          localStorage.setItem(SNAPSHOT_KEY, dataUrl);
          setSnapshot(dataUrl);
        } catch {}
      }

      // Show canvas once model is loaded (even before snapshot)
      if (modelGroup && !canvasReady) {
        setCanvasReady(true);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      container.innerHTML = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {snapshot && (
        <img
          src={snapshot}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: canvasReady ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />
      )}
      <div
        ref={mount}
        style={{
          width: '100%',
          height: '100%',
          opacity: canvasReady ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  );
};

export default Setup;

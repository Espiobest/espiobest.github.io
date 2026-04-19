import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Setup = () => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    container.innerHTML = '';

    let spinSpeed = 0.003;
    const spinDecay = 0.985;
    let userInteracting = false;
    let animId: number;

    const scene = new THREE.Scene();
    scene.background = null;

    const w = container.clientWidth || 240;
    const h = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    // Cap pixel ratio at 1.5 — avoids 4× buffer on retina with no visible benefit at 240px
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    // No shadow maps — saves ~8MB of GPU memory per light
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

    // Lighting — hemisphere + directional, no shadows
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

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

    loader.load(
      'setup.glb',
      (gltf) => {
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
      },
    );

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;
      if (modelGroup && !userInteracting && spinSpeed > 0) {
        modelGroup.rotation.y += spinSpeed;
        spinSpeed *= spinDecay;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  return (
    <div ref={mount} style={{ width: '100%', height: '100%', background: 'transparent' }} />
  );
};

export default Setup;

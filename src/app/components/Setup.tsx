import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Setup = () => {
  const mount = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mount.current || rendererRef.current) return;

    let spinSpeed = 0.003;
    const spinDecay = 0.985;
    let userInteracting = false;

    const scene = new THREE.Scene();
    scene.background = null;

    const w = mount.current.clientWidth || 240;
    const h = mount.current.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mount.current.appendChild(renderer.domElement);

    const resize = () => {
      if (!mount.current) return;
      const nw = mount.current.clientWidth;
      const nh = mount.current.clientHeight;
      if (nw && nh) {
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mount.current);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    scene.add(dirLight);

    // Shadow ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.5 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.65;
    ground.receiveShadow = true;
    scene.add(ground);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // Stop auto-spin when user drags
    controls.addEventListener('start', () => {
      userInteracting = true;
      spinSpeed = 0;
    });
    controls.addEventListener('end', () => {
      userInteracting = false;
    });

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    let modelGroup: THREE.Group;

    const loadModel = (retryCount = 0) => {
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

          const modelHeight = size.y * scale;
          camera.position.set(0, modelHeight / 3, 1.5);
          camera.lookAt(0, 0, 0);

          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        },
        undefined,
        () => {
          if (retryCount < 3) setTimeout(() => loadModel(retryCount + 1), 1000);
        },
      );
    };

    loadModel();

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
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
      rendererRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mount}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    />
  );
};

export default Setup;

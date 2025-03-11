import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Setup = () => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current) return;
    if (mount.current.hasChildNodes()) return;

    let spinSpeed = 0.3;
    const spinDecay = 0.99;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 0.5;
    camera.position.y = -0.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
    });

    const WIDTH = 550;
    const HEIGHT = 300;

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows

    renderer.setClearColor(0x000000, 0);
    mount.current.appendChild(renderer.domElement);

    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // add light to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // add ground to receive shadows
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.5 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.65;
    ground.receiveShadow = true;
    scene.add(ground);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    let modelGroup: THREE.Group;

    interface GLTF {
      animations: THREE.AnimationClip[];
      scene: THREE.Group;
      scenes: THREE.Group[];
      cameras: THREE.Camera[];
      asset: object;
    }

    loader.load(
      'computerSetup.glb',
      (gltf: GLTF) => {
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
        camera.position.set(0, modelHeight / 3, 1.5 / scale);
        camera.lookAt(0, 0, 0);

        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      },

      (error) => {
        console.error('An error occurred while loading the model:', error);
      },
    );

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelGroup) {
        modelGroup.rotation.y += spinSpeed;

        if (spinSpeed > 0.005) {
          spinSpeed *= spinDecay;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      mount.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mount}
      style={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
      }}
    />
  );
};

export default Setup;

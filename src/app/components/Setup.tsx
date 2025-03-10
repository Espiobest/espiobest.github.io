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
            logarithmicDepthBuffer: true
        });
        renderer.setSize(400, 400);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        mount.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

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

        interface Progress {
            loaded: number;
            total: number;
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

                camera.position.z = 1.5 / scale;

                gltf.scene.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
            },
            (progress: Progress) => {
                console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
            },
            (error) => {
                console.error('An error occurred while loading the model:', error);
            }
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
    
    return <div 
        ref={mount} 
        style={{ 
            width: '400px', 
            height: '400px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent' 
        }} 
    />;
};

export default Setup;
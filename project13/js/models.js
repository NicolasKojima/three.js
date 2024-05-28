import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { scene } from './setup.js';

export function loadModels() {
    const cabinLoader = new GLTFLoader();
    cabinLoader.load(
        '/store/scene.gltf',
        function (gltf) {
            const cabin = gltf.scene;
            scene.add(cabin);
        },
        undefined,
        function (error) {
            console.error('An error happened loading the cabin model:', error);
        }
    );

    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-2, 4, -0.5);
    scene.add(sphere);

    const stemGeometry = new THREE.BoxGeometry(0.1, 2.7, 0.1);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(4, 1.5, 2);
    scene.add(stem);

    // Define the 3D screen at the position of the rectangle
    const screenGeometry = new THREE.BoxGeometry(0.1, 1.5, 3.6);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // Change color as needed
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    const screenRadians = THREE.MathUtils.degToRad(16.5);
    screen.rotation.y = screenRadians;
    screen.position.set(1, 1.6, -1.1);
    scene.add(screen);

    // Add some sample interactive elements on the screen
    const buttonGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.05);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(1, 1.6, -1.05); // Adjust position relative to screen
    scene.add(button);
}

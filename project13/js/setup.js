import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer();
export const raycaster = new THREE.Raycaster();
export const mouse = new THREE.Vector2();

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;

export function initializeRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.background = new THREE.Color(0x000000); // Set background to black
    console.log('Renderer initialized'); // Check if renderer is initialized

    camera.position.set(12, 6,-4);
    camera.lookAt(0, 0, 0); // Make sure the camera is looking at the scene
    controls.target.set(0, 0, 0);
    controls.update();

    console.log('Camera position:', camera.position); // Check camera position
    console.log('Controls target:', controls.target); // Check controls target

    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for smooth damping
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initializeRenderer();

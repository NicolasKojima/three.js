import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);  // The point to orbit around
controls.update(); // Required if controls.enableDamping or controls.autoRotate are set to true

// Create a cube using BoxGeometry and MeshBasicMaterial
const geometry = new THREE.BoxGeometry(20, 20, 20); // Parameters: width, height, depth
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate are true
    renderer.render(scene, camera);
}

animate();

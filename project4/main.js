import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load(
    '/psx-wet-floor-sign/source/model.gltf', // Adjust path to where you have your model in the public folder
    function (gltf) {
        scene.add(gltf.scene);
        animate();
    },
    undefined,
    function (error) {
        console.error('An error happened loading the model:', error);
    }
);

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
camera.position.z = 2;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

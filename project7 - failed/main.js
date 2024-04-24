import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

const loader = new FBXLoader();
loader.load(
    '/source/house.fbx', // Ensure the path to your FBX file is correct
    function (object) {
        scene.add(object);
        animate();
    },
    undefined,
    function (error) {
        console.error('An error happened loading the model:', error);
    }
);

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
camera.position.z = 100; // Adjusted for potentially larger FBX models

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

loader.load(
    '/source/house.fbx',
    function (object) {
        object.scale.set(0.01, 0.01, 0.01); // Scale down if the model is too large
        object.position.set(0, 0, 0); // Adjust position if needed
        object.rotation.y = Math.PI; // Rotate if needed
        scene.add(object);
        console.log('Model loaded and added to scene!');
        animate();
    },
    undefined,
    function (error) {
        console.error('An error happened loading the model:', error);
    }
);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

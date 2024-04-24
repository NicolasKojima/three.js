import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(100, 100, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);
controls.update();

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const loader = new FBXLoader();
loader.load(
    '/source/house.fbx',
    function (object) {
        object.scale.set(0.1, 0.1, 0.1);
        object.position.set(0, 0, 0);
        object.rotation.y = Math.PI;
        scene.add(object);
        console.log('Model loaded and added to scene!');
    },
    undefined,
    function (error) {
        console.error('An error happened loading the model:', error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

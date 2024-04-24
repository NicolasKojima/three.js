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

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(-10, 0, 0)
];

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);
scene.add(line);


const points1 = [
    new THREE.Vector3( -10, 0, 0 ),
    new THREE.Vector3( -10, 0, -10 ),
    new THREE.Vector3( 0, 10, -10 ),
    new THREE.Vector3( 0, 10, 0 ),
    new THREE.Vector3( 0, 10, -10 ),
    new THREE.Vector3( 10, 0, -10 ),
    new THREE.Vector3( 10, 0, 0 ),
    new THREE.Vector3( 10, 0, -10 ),
    new THREE.Vector3( 0, -10, -10 ),
    new THREE.Vector3( 0, -10, 0 ),
    new THREE.Vector3( 0, -10, -10 ),
    new THREE.Vector3( -10, 0, -10 )

];

const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
const line1 = new THREE.Line(geometry1, material);
scene.add(line1);

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}

animate();

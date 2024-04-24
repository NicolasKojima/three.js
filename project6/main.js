import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 50, 100); // Adjusted to better fit the house in view
camera.lookAt(0, 10, 0);

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);  // Adjusting the target to center on the house
controls.update();

// Load a texture for the walls
const loader = new THREE.TextureLoader();
const woodTexture = loader.load('public/wood1.jpg'); // Ensure the path to your wood texture is correct
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(3, 1); // Adjust the repetition for better texture coverage

// Load a texture for the walls
const loader1 = new THREE.TextureLoader();
const roofTexture = loader.load('public/roof.jpg'); // Ensure the path to your wood texture is correct
roofTexture.wrapS = THREE.RepeatWrapping;
roofTexture.wrapT = THREE.RepeatWrapping;
roofTexture.repeat.set(3, 1); // Adjust the repetition for better texture coverage

// Material for the walls using the wood texture, darkened
const material = new THREE.MeshBasicMaterial({ 
    map: woodTexture, 
    color: 0x555555 // Darkens the texture by applying a dark gray multiplier
});

// Main body of the house (cube)
const houseGeometry = new THREE.BoxGeometry(28, 20, 28);
const house = new THREE.Mesh(houseGeometry, material);
house.position.set(0, 10, 0);
scene.add(house);

// gutter (cube format)
const gutterMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 }); 
const gutterGeometry = new THREE.BoxGeometry(30, 2, 30);
const gutter = new THREE.Mesh(gutterGeometry, gutterMaterial);
gutter.position.set(0, 20.7, 0);
scene.add(gutter);

// Roof of the house (pyramid), can be created using ConeGeometry with 4 radial segments
const roofMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 }); // Dark red for the roof
const roofGeometry = new THREE.ConeGeometry(21, 10, 4);
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(0, 26.5, 0); // Positioning the roof on top of the house
roof.rotation.y = Math.PI / 4; // Rotating the roof to align properly
scene.add(roof);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

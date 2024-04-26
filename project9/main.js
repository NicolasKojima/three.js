import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Reduce the overall lighting to make the scene darker
const ambientLight = new THREE.AmbientLight(0x787878, 0.5); // Adjust the color and intensity as needed
scene.add(ambientLight);

// Floor Setup
const textureLoader = new THREE.TextureLoader();
const snowTexture = textureLoader.load('designs/snow.jpg'); 
snowTexture.wrapS = THREE.RepeatWrapping;
snowTexture.wrapT = THREE.RepeatWrapping;
snowTexture.repeat.set(4, 4);

const floorMaterial = new THREE.MeshBasicMaterial({ map: snowTexture });
const floorGeometry = new THREE.PlaneGeometry(40, 40);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.1;
scene.add(floor);

// GLTF Model Loading for the house
const houseLoader = new GLTFLoader();
houseLoader.load(
    '/house/scene.gltf',
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the house model:', error);
    }
);

// Load the campfire model and add it to the scene
const campfireLoader = new GLTFLoader();
let campfire;
campfireLoader.load('campfire/scene.gltf', function (gltf) {
    campfire = gltf.scene;
    campfire.scale.set(0.075, 0.075, 0.075);
    campfire.position.set(2.8, 0, 2.4);
    scene.add(campfire);

    // Significantly stronger Point Light for the campfire
    const fireLight = new THREE.PointLight(0xffa500, 10, 50); // Greatly increased intensity, slightly wider range
    fireLight.position.set(3, 0.5, 3);
    scene.add(fireLight);
}, undefined, function (error) {
    console.error('An error happened loading the campfire model:', error);
});

// GLTF Model Loading for the snowboard
const snowboardLoader = new GLTFLoader();
snowboardLoader.load('snowboard/scene.gltf', function (gltf) {
    const snowboard = gltf.scene;
    snowboard.scale.set(0.1, 0.1, 0.1);  // Scale down the snowboard as needed
    snowboard.rotation.x = Math.PI;  // Rotate to lay flat
    snowboard.position.set(1.4, 0.5, 2.3);  // Position right outside the house's entrance
    scene.add(snowboard);
}, undefined, function (error) {
    console.error('An error happened loading the snowboard model:', error);
});

// GLTF Model Loading for the chair
const chairLoader = new GLTFLoader();
chairLoader.load('chair/scene.gltf', function (gltf) {
    const chair = gltf.scene;
    chair.scale.set(0.8, 0.8, 0.8);  // Scale down the chair as needed
    chair.rotation.y = -50 * Math.PI / 180;  // Rotate -60 degrees around the Y-axis
    chair.position.set(3, 0.3, 2.2);  // Position right outside the house's entrance
    scene.add(chair);
}, undefined, function (error) {
    console.error('An error happened loading the chair model:', error);
});

// GLTF Model Loading for the chair
const chair1Loader = new GLTFLoader();
chair1Loader.load('chair/scene.gltf', function (gltf) {
    const chair1 = gltf.scene;
    chair1.scale.set(0.8, 0.8, 0.8);  // Scale down the chair1 as needed
    chair1.rotation.y = -80 * Math.PI / 180;  // Rotate -60 degrees around the Y-axis
    chair1.position.set(3.1, 0.3, 2.5);  // Position right outside the house's entrance
    scene.add(chair1);
}, undefined, function (error) {
    console.error('An error happened loading the chair1 model:', error);
});

// GLTF Model Loading for the snowboard
const signLoader = new GLTFLoader();
signLoader.load('sign/scene.gltf', function (gltf) {
    const sign = gltf.scene;
    sign.scale.set(0.02, 0.02, 0.02);  // Scale down the sign as needed
    // sign.rotation.x = Math.PI;  // Rotate to lay flat
    sign.position.set(-1.5, -0.2, 3);  // Position right outside the house's entrance
    scene.add(sign);
// Significantly stronger Point Light for the campfire
    const signLight = new THREE.PointLight(0xffa500, 1, 1); // Greatly increased intensity, slightly wider range
    signLight.position.set(-1.5, 1, 3.2);
    scene.add(signLight);
    }, undefined, function (error) {
    console.error('An error happened loading the campsign model:', error);
});



// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;

// Initial Camera Position
camera.position.z = 10;

// Raycaster and Mouse for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Convert the mouse position to a normalized device coordinate space
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        console.log('Intersected objects:', intersects.map(obj => obj.object.name));
        const intersectedCampfire = intersects.find(intersect => intersect.object.name === 'campfire');
        if (intersectedCampfire) {
            zoomOnCampfire();
        }
    }
}

function zoomOnCampfire() {
    console.log('Zooming on campfire');
    const targetPosition = new THREE.Vector3();
    campfire.getWorldPosition(targetPosition); // Get the world position of the campfire
    controls.target.copy(targetPosition); // Set the controls' target to the campfire's position
    camera.position.set(targetPosition.x, targetPosition.y + 1, targetPosition.z + 5); // Position the camera to focus on the campfire
    controls.update(); // Update the controls to reflect the new target
}

window.addEventListener('click', onMouseClick);


function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls if damping or auto-rotate is enabled
    renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

animate();

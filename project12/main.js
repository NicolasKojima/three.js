import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Fetch and load homepage.html content
let homepageContentElement = document.getElementById('homepageContent');

fetch('homepage.html')
    .then(response => response.text())
    .then(data => {
        homepageContentElement.innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching homepage.html:', error);
    });

// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(10, 5, 0);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05; // Damping factor
controls.screenSpacePanning = false; // Do not allow panning in screen space
controls.minDistance = 1; // Minimum zoom distance
controls.maxDistance = 100; // Maximum zoom distance
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation to 90 degrees

// GLTF Model Loading for the store
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

// Sphere add it to the scene
const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-2, 4, -0.5);
scene.add(sphere);

// Create a point light at the same position as the sphere
const pointLight = new THREE.PointLight(0xffffff, 2, 100); // white light, increased intensity to 2, range 100
pointLight.position.set(1, 5, 1);
scene.add(pointLight);

// Create a point light at the same position as the rectangle
const pointLight1 = new THREE.PointLight(0xff00ff, 50, 100); // magenta light, increased intensity to 2, range 100
pointLight1.position.set(0.4, 3.8, -1);
scene.add(pointLight1);

// Create a point light at the same position as the rectangle
const pointLight2 = new THREE.PointLight(0x1F51FF, 50, 100); // blue light, increased intensity to 2, range 100
pointLight2.position.set(2.8, 2, 3.1);
scene.add(pointLight2);

const signLight1 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 10
signLight1.position.set(4.14, 2.7, 2);
scene.add(signLight1);
const signLight2 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 100
signLight2.position.set(4.14, 1.2, 2);
scene.add(signLight2);
const signLight3 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 100
signLight3.position.set(4.14, 2.2, 2);
scene.add(signLight3);
const signLight4 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 100
signLight4.position.set(4.14, 1.7, 2);
scene.add(signLight4);

// Add an ambient light for some global illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light, increased intensity to 1
scene.add(ambientLight);

// Create lamp stem
const stemGeometry = new THREE.BoxGeometry(0.1, 2.7, 0.1);
const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const stem = new THREE.Mesh(stemGeometry, stemMaterial);
stem.position.set(4, 1.5, 2); // Adjust the position to start at y=0 and go up to y=3
scene.add(stem);

// Create a canvas and draw fake website content
const canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 512;
const context = canvas.getContext('2d');
context.fillStyle = '#ffffff';
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = '#000000';
context.font = '50px Arial';
context.fillText('Welcome to My Fake Website', 50, 100);
context.font = '30px Arial';
context.fillText('This is a sample website content displayed on a 3D screen.', 50, 200);
context.fillText('You can put any HTML content here.', 50, 250);

// Create texture from canvas
const texture = new THREE.CanvasTexture(canvas);

// Create rectangle with texture
const screenGeometry1 = new THREE.BoxGeometry(0.1, 1.5, 3.6);
const screenMaterial1 = new THREE.MeshStandardMaterial({ map: texture });
const screen1 = new THREE.Mesh(screenGeometry1, screenMaterial1);
screen1.position.set(0.4, 1.6, -1.1); // Adjust the position to start at y=0 and go up to y=3
const angleInRadians = THREE.MathUtils.degToRad(16.5);
screen1.rotation.y = angleInRadians;
// Add the mesh to the scene
scene.add(screen1);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const signMeshes = [];

// Helper function to create signs
function createSign(text, color, position) {
    const signGeometry = new THREE.BoxGeometry(1.3, 0.4, 0.05); // Reduced size by half
    const signMaterial = new THREE.MeshStandardMaterial({ color: color });
    const sign = new THREE.Mesh(signGeometry, signMaterial);

    // Create text on the sign
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 0.18, // Reduced size by half
            height: 0, // Reduced height by half
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.005,
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-0.45, -0.075, 0.03); // Adjust position to fit on sign
        sign.add(textMesh);
        scene.add(sign); // Add the sign to the scene after the text is added
        signMeshes.push({ mesh: sign, text: text }); // Add to clickable signs array
    });

    sign.position.set(position.x, position.y, position.z);
    sign.rotation.y = 111 * Math.PI / 180; // Rotate 111 degrees around Y-axis
    return sign;
}

// Add signs to the stem
const signs = [
    // { text: 'Click A Sign', color: 0x000000, position: { x: 4.1, y: 2.9, z: 2 } },
    { text: 'projects', color: 0xf72585, position: { x: 4.1, y: 2.5, z: 2 } },
    { text: 'articles', color: 0x3a0ca3, position: { x: 4.1, y: 2, z: 2 } },
    { text: 'about me', color: 0x4361ee, position: { x: 4.1, y: 1.5, z: 2 } },
    { text: 'credits', color: 0x4cc9f0, position: { x: 4.1, y: 1, z: 2 } },
];

signs.forEach(signInfo => {
    createSign(signInfo.text, signInfo.color, signInfo.position);
});

const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry("Nicolas' Website", {
        font: font,
        size: 0.4,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(3, -0.2, -1.5); // Adjust the initial position (1 unit above the floor to avoid z-fighting)
    textMesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to face upwards
    textMesh.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(textMesh);

    // Add smaller, less bold text
    const smallTextGeometry = new TextGeometry("Full-Stack Engineer", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh = new THREE.Mesh(smallTextGeometry, smallTextMaterial);
    smallTextMesh.position.set(textMesh.position.x + 0.3, textMesh.position.y, textMesh.position.z + -0.8); // Offset by 2 on x-axis
    smallTextMesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh);

    // Add smaller, less bold text
    const smallTextGeometry1 = new TextGeometry("Data Scientist", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial1 = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh1 = new THREE.Mesh(smallTextGeometry1, smallTextMaterial1);
    smallTextMesh1.position.set(textMesh.position.x + 0.6, textMesh.position.y, textMesh.position.z + -0.9); // Offset by 2 on x-axis
    smallTextMesh1.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh1.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh1);

    // Add smaller, less bold text
    const smallTextGeometry2 = new TextGeometry("Cyber Security Novice", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial2 = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh2 = new THREE.Mesh(smallTextGeometry2, smallTextMaterial2);
    smallTextMesh2.position.set(textMesh.position.x + 0.9, textMesh.position.y, textMesh.position.z + -1); // Offset by 2 on x-axis
    smallTextMesh2.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh2.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh2);

    // Add smaller, less bold text
    const smallTextGeometry3 = new TextGeometry("Cloud Engineer", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh3 = new THREE.Mesh(smallTextGeometry3, smallTextMaterial3);
    smallTextMesh3.position.set(textMesh.position.x + 1.2, textMesh.position.y, textMesh.position.z + -1.1); // Offset by 2 on x-axis
    smallTextMesh3.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh3.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh3);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for smooth interaction
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersected by the ray
    const intersects = raycaster.intersectObjects(signMeshes.map(sign => sign.mesh));

    if (intersects.length > 0) {
        const clickedSign = signMeshes.find(sign => sign.mesh === intersects[0].object);
        if (clickedSign) {
            showNotification(clickedSign.text);
            if (clickedSign.text === 'projects') {
                // Disable the orbit controls
                controls.enabled = false;

                // Set the camera position
                camera.position.set(3, 2, -1.8);

                // Create a target vector directly in the -x direction from the camera's current position
                const target = new THREE.Vector3(camera.position.x - 3.5, camera.position.y , camera.position.z + 1);

                // Make the camera look at the target vector
                camera.lookAt(target);

                // Update the controls target (optional)
                controls.target.copy(target);
                controls.update();

                // Show the back button and homepage content
                showBackButton();
            }
        }
    }
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function showBackButton() {
    const backButton = document.getElementById('backButton');
    backButton.style.display = 'block';
    homepageContentElement.style.display = 'block';

    // Position the homepage content relative to the canvas
    const rect = renderer.domElement.getBoundingClientRect();
    homepageContentElement.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (homepageContentElement.offsetWidth / 2)}px`;
    homepageContentElement.style.top = `${rect.top + window.scrollY + (rect.height / 2) - (homepageContentElement.offsetHeight / 2)}px`;
}

function hideBackButton() {
    const backButton = document.getElementById('backButton');
    backButton.style.display = 'none';
    homepageContentElement.style.display = 'none';
    camera.position.set(10, 5, 0);
    controls.enabled = true;
}

// Create and add back button
const backButton = document.createElement('button');
backButton.id = 'backButton';
backButton.textContent = 'Back';
backButton.style.position = 'absolute';
backButton.style.top = '10px';
backButton.style.left = '10px';
backButton.style.zIndex = '2000';
backButton.style.display = 'none';
backButton.addEventListener('click', hideBackButton);
document.body.appendChild(backButton);

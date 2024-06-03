import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { scene, renderer } from './setup.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
RectAreaLightUniformsLib.init();


let screenImage;

export function createInteractiveScreen() {
    // Define the 3D screen at the position of the rectangle
    const screenGeometry = new THREE.BoxGeometry(0.1, 1.5, 3.6);
    const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide }); // Change color to black
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    const screenRadians = THREE.MathUtils.degToRad(16.5);
    screen.rotation.y = screenRadians;
    screen.position.set(0.4, 1.6, -1.1); // Change x position to 0.5
    scene.add(screen);

    // Load and display the image on the screen
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/jpg/goldcoast.jpg', (texture) => {
        texture.minFilter = THREE.LinearFilter; // Use linear filtering
        texture.magFilter = THREE.LinearFilter; // Use linear filtering
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Set anisotropy for better quality

        const imageGeometry = new THREE.PlaneGeometry(3.6, 1.5);
        const imageMaterial = new THREE.MeshStandardMaterial({ map: texture });
        screenImage = new THREE.Mesh(imageGeometry, imageMaterial);
        screenImage.position.set(0.5, 1.6, -1.1); // Slightly in front of the screen
        const screenImageRadians = THREE.MathUtils.degToRad(106.5);
        screenImage.rotation.y = screenImageRadians; // Align with the screen
        scene.add(screenImage);
    });

    // Create buttons on the screen
    createButton1('Developed Web Applications', 0x000000, { x: 0.5, y: 2.25, z: -1.2 }, handleButton1Click, screenRadians);
    createButton('Button 2', 0xff0000, { x: 0.5, y: 1.5, z: -1.1 }, handleButton2Click, screenRadians);
    createButton('Button 3', 0x0000ff, { x: 0.5, y: 1.3, z: -1.1 }, handleButton3Click, screenRadians);
}

// Helper function to create a button
function createButton(label, color, position, onClick, rotationY) {
    const buttonGeometry = new THREE.BoxGeometry(2, 0.2, 0.05);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(position.x, position.y, position.z);
    const buttonRadians = THREE.MathUtils.degToRad(106.5);
    button.rotation.y = buttonRadians;
    button.userData = { onClick: onClick };
    button.isInteractive = true; // Flag to indicate this object is interactive
    scene.add(button);

    // Create text label for the button
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry(label, {
            font: font,
            size: 0.07,
            height: 0.02
        });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-0.22, -0.05, 0.03); // Adjust text position relative to the button
        button.add(textMesh);
    });
}

function createButton1(label, color, position, onClick, rotationY) {
    const buttonGeometry = new THREE.BoxGeometry(2, 0.2, 0.05);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(position.x, position.y, position.z);
    const buttonRadians = THREE.MathUtils.degToRad(106.5);
    button.rotation.y = buttonRadians;
    button.userData = { onClick: onClick };
    button.isInteractive = true; // Flag to indicate this object is interactive
    scene.add(button);

    // Create text label for the button
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry(label, {
            font: font,
            size: 0.1,
            height: 0.02
        });
        const textMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xff00ff, // Fluorescent pink
            emissive: 0xff00ff, // Make it glow
            emissiveIntensity: 1
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Center the text within the box
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        const textHeight = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
        textMesh.position.set(-textWidth / 2, -textHeight / 2, 0.03); // Adjust text position relative to the button

        button.add(textMesh);

        // Add a RectAreaLight to evenly illuminate the text
        const rectLight = new THREE.RectAreaLight(0xff00ff, 5, textWidth, 1); // width and height of the light
        rectLight.position.set(position.x + 0.1, position.y, position.z); // Slightly in front of the text
        rectLight.rotation.y = buttonRadians; // Rotate the light to match the button
        rectLight.lookAt(button.position); // Ensure the light points at the button
        scene.add(rectLight);
    });
}


// Event handlers for the buttons
function handleButton1Click() {
    console.log('Button 1 clicked');
    // Add logic for Button 1 click
}

function handleButton2Click() {
    console.log('Button 2 clicked');
    // Add logic for Button 2 click
}

function handleButton3Click() {
    console.log('Button 3 clicked');
    // Add logic for Button 3 click
}

// Function to hide the image
export function hideScreenImage() {
    if (screenImage) {
        screenImage.visible = false;
    }
}

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { scene, renderer, camera, controls } from './setup.js';
import TWEEN from '@tweenjs/tween.js';

let screenImage;
let button1, button2, button3, button4, button5, button6;
let goBackButton;

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
    button1 = createButton1('Developed Web Applications', 0x000000, { x: 0.5, y: 2.25, z: -1.2 }, handleButton1Click, screenRadians);
    button2 = createButton('three.js - snowhouse', 0xff0000, { x: 0.5, y: 1.5, z: -1.1 }, handleButton2Click, screenRadians);
    button3 = createButton('To-Do List Application', 0x0000ff, { x: 0.5, y: 1.3, z: -1.1 }, handleButton3Click, screenRadians);
    button4 = createButton('Blog Application', 0xff0000, { x: 0.5, y: 1.7, z: -1.1 }, handleButton4Click, screenRadians);
    button5 = createButton('Project Management Application', 0x0000ff, { x: 0.5, y: 1.9, z: -1.1 }, handleButton5Click, screenRadians);
    button6 = createButton2('2D Website', 0x00FFFF, { x: 0.5, y: 1.1, z: -1.1 }, handleButton6Click, screenRadians);

    button1.visible = false;
    button2.visible = false;
    button3.visible = false;
    button4.visible = false;
    button5.visible = false;
    button6.visible = false;

    createGoBackButton();
}

// Helper function to create a button
function createButton(label, color, position, onClick, rotationY) {
    const buttonGeometry = new THREE.BoxGeometry(2, 0.2, 0.05);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(position.x, position.y, position.z);
    const buttonRadians = THREE.MathUtils.degToRad(106.5);
    button.rotation.y = buttonRadians;
    button.userData = { onClick: onClick }; // Ensure onClick is properly assigned
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

    return button;
}

function createButton1(label, color, position, onClick, rotationY) {
    const buttonGeometry = new THREE.BoxGeometry(2, 0.2, 0.05);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(position.x, position.y, position.z);
    const buttonRadians = THREE.MathUtils.degToRad(106.5);
    button.rotation.y = buttonRadians;
    button.userData = { onClick: onClick }; // Ensure onClick is properly assigned
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
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Center the text within the box
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        const textHeight = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
        textMesh.position.set(-textWidth / 2, -textHeight / 2, 0.03); // Adjust text position relative to the button

        button.add(textMesh);
    });

    return button;
}

function createButton2(label, color, position, onClick, rotationY) {
    const buttonGeometry = new THREE.BoxGeometry(2, 0.2, 0.05);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(position.x, position.y, position.z);
    const buttonRadians = THREE.MathUtils.degToRad(106.5);
    button.rotation.y = buttonRadians;
    button.userData = { onClick: onClick }; // Ensure onClick is properly assigned
    button.isInteractive = true; // Flag to indicate this object is interactive
    scene.add(button);

    const fontLoader = new FontLoader();
        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry(label, {
        font: font,
        size: 0.07,
        height: 0.02
    });
    const textMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00FFFF, // Fluorescent blue
        emissive: 0x00FFFF, // Emissive color for the glow effect
        emissiveIntensity: 1
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.22, -0.05, 0.03); // Adjust text position relative to the button
    button.add(textMesh);
});


    return button;
}

function handleButton1Click() {
    console.log('Button 1 clicked');
    // Add logic for Button 1 click
}

function handleButton2Click() {
    console.log('Button 2 clicked');
    window.open('https://www.google.com', '_blank');
}

function handleButton3Click() {
    console.log('Button 3 clicked'); 
    window.open('https://nicolaskojima.online/notes-app/public/index.html', '_blank');
}

function handleButton4Click() {
    console.log('Button 4 clicked');
    window.open('https://nicolaskojima.online/blog-app/public/bloghome.php', '_blank');
}

function handleButton5Click() {
    console.log('Button 5 clicked');
    window.open('https://nicolaskojima.online/ProjectManagementApplication/public/login', '_blank');
}

function handleButton6Click() {
    console.log('Button 6 clicked');
    window.open('https://nicolaskojima.online/', '_blank');
}

// Function to hide the image
export function hideScreenImage() {
    if (screenImage) {
        screenImage.visible = false;
    }
}

export function showButtons() {
    if (button1) {
        button1.visible = true;
    }
    if (button2) {
        button2.visible = true;
    }
    if (button3) {
        button3.visible = true;
    }
    if (button4) {
        button4.visible = true;
    }
    if (button5) {
        button5.visible = true;
    }
    if (button6) {
        button6.visible = true;
    }
    if (goBackButton) {
        goBackButton.style.display = 'block';
    }
}

function createGoBackButton() {
    goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.style.position = 'absolute';
    goBackButton.style.top = '10px';
    goBackButton.style.left = '10px';
    goBackButton.style.zIndex = '2000';
    goBackButton.style.display = 'none';
    goBackButton.addEventListener('click', handleGoBackClick);
    document.body.appendChild(goBackButton);
}

function handleGoBackClick() {
    // Logic to move the camera back to its original position
    const from = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };
    const to = { //12, 6,-4
        x: 12,
        y: 6,
        z: -4
    };
    const target = new THREE.Vector3(0, 0, 0);

    new TWEEN.Tween(from)
        .to(to, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.position.set(from.x, from.y, from.z);
            camera.lookAt(target);
            controls.target.copy(target); // Update controls target
            controls.update();
        })
        .onComplete(() => {
            camera.position.set(to.x, to.y, to.z);
            camera.lookAt(target);
            controls.target.copy(target); // Ensure controls target is updated
            controls.update();
            goBackButton.style.display = 'none';
        })
        .start();
}

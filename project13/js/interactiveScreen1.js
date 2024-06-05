import * as THREE from 'three';
import { scene, renderer, camera, controls } from './setup.js';
import TWEEN from '@tweenjs/tween.js';

let scrollOffset = 0;
let canvas, context, texture, screen;
let goBackButton1;

export function createInteractiveScreen1() {
    // Define the 3D screen at the position of the rectangle
    const screenGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.01);
    const screenMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide }); // Change color to black
    screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(-1, 1.5, -4.5); // Change x position to 0.5
    scene.add(screen);

    // Create a canvas for the scrollable UI
    canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    context = canvas.getContext('2d');

    // Set canvas background to black
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create a texture from the canvas
    texture = new THREE.CanvasTexture(canvas);
    screen.material.map = texture;
    screen.material.needsUpdate = true;

    // Draw initial content
    drawContent();

    // Add scroll event listener
    window.addEventListener('wheel', onScroll, { passive: false });

    // Update loop to refresh the texture
    function animate() {
        requestAnimationFrame(animate);
        drawContent();
    }
    animate();

    createGoBackButton1();
}

function drawContent() {
    // Clear the canvas and set the background to black
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    context.fillStyle = '#ffffff';
    context.font = '24px Arial';

    // Draw text lines
    const lines = [
        'Line 1: This is some scrollable text.',
        'Line 2: You can add multiple lines.',
        'Line 3: Scrolling is implemented.',
        'Line 4: This is a demo of scrollable UI.',
        'Line 5: Using canvas texture in THREE.js.',
        'Line 6: More text here.',
        'Line 7: Even more text.',
        'Line 8: Keep adding lines.',
        'Line 9: And it will scroll.',
        'Line 10: Enjoy the demo!'
    ];

    const lineHeight = 30;
    let y = 50 + scrollOffset;

    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], 10, y);
        y += lineHeight;
    }

    // Update the texture
    texture.needsUpdate = true;
}

function onScroll(event) {
    // Prevent default scrolling behavior
    event.preventDefault();

    // Adjust the scroll offset based on the scroll event
    scrollOffset -= event.deltaY * 0.1;
    if (scrollOffset > 0) scrollOffset = 0; // Prevent scrolling up beyond the start
    if (scrollOffset < -300) scrollOffset = -300; // Adjust this value based on content height
}

export function moveCameraToScreen1() {
    controls.enabled = false; // Disable controls to prevent movement

    const from = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };
    const to = {
        x: -1,
        y: 1.5,
        z: -5.6
    };
    const target = new THREE.Vector3(to.x, to.y, to.z + 1.1);

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
            showBackButton1(); // Show the back button after moving the camera
        })
        .start();
}

function createGoBackButton1() {
    goBackButton1 = document.createElement('button');
    goBackButton1.id = 'backButton1';
    goBackButton1.textContent = 'Go Back';
    goBackButton1.style.position = 'absolute';
    goBackButton1.style.top = '10px'; // Adjusted position to avoid conflict with the first back button
    goBackButton1.style.left = '10px';
    goBackButton1.style.zIndex = '2000';
    goBackButton1.style.display = 'none';
    goBackButton1.addEventListener('click', hideBackButton1);
    document.body.appendChild(goBackButton1);
}

function showBackButton1() {
    if (goBackButton1) {
        goBackButton1.style.display = 'block';
    } else {
        console.error('Back button element not found');
    }
}

function hideBackButton1() {
    if (goBackButton1) {
        goBackButton1.style.display = 'none';
    }
    const from = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };
    const to = { // Original camera position
        x: 10,
        y: 5,
        z: 0
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
            controls.enabled = true; // Enable controls to allow movement
        })
        .start();
}

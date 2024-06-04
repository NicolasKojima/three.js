import * as THREE from 'three';
import { scene, renderer, camera, controls } from './setup.js';

let scrollOffset = 0;
let canvas, context, texture, screen;

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

    // Set canvas background to green
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create a texture from the canvas
    texture = new THREE.CanvasTexture(canvas);
    screen.material.map = texture;
    screen.material.needsUpdate = true;

    // Draw initial content
    drawContent();

    // Add scroll event listener
    window.addEventListener('wheel', onScroll, false);

    // Update loop to refresh the texture
    function animate() {
        requestAnimationFrame(animate);
        drawContent();
    }
    animate();
}

function drawContent() {
    // Clear the canvas and set the background to green
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    context.fillStyle = '#ffffff';
    context.font = '24px Arial';

    // Draw text lines
    const lines = [
        'Line 1: This is some scrollable text.',
        'Line 2: This is a sample of a 3D website.',
        'Line 3: wouldnt it be fucking amazing if .',
        'Line 4: all website were made in 3D.',
        'Line 5: and instead of just accessing the website',
        'Line 6: you were able to go inside the website',
        'Line 7: and experience it.',
        'Line 8: All of this is source code and ',
        'Line 9: on my github, if youre interested',
        'Line 10: access my website and make your own!!'
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
    // Adjust the scroll offset based on the scroll event
    scrollOffset -= event.deltaY * 0.1;
    if (scrollOffset > 0) scrollOffset = 0; // Prevent scrolling up beyond the start
    if (scrollOffset < -300) scrollOffset = -300; // Adjust this value based on content height
}

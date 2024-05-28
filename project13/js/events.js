import * as THREE from 'three';
import { camera, renderer, controls } from './setup.js';
import { signMeshes } from './ui.js';
import TWEEN from '@tweenjs/tween.js';

export const raycaster = new THREE.Raycaster();
export const mouse = new THREE.Vector2();

export function setupEvents() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onMouseClick, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(signMeshes.map(sign => sign.mesh));
    console.log(intersects); // Debug: Check intersected objects

    if (intersects.length > 0) {
        const clickedSign = signMeshes.find(sign => sign.mesh === intersects[0].object);
        if (clickedSign) {
            console.log(`Clicked on sign: ${clickedSign.text}`); // Debug: Check clicked sign
            showNotification(clickedSign.text);

            if (clickedSign.text === 'Click Me') {
                clickedSign.mesh.visible = false;
                signMeshes.forEach(sign => {
                    if (sign.text !== 'Click Me') {
                        sign.mesh.visible = true;
                        slideIn(sign.mesh);
                    }
                });
            }

            if (clickedSign.text === 'projects') {
                moveCameraToScreen();
            }
        }
    } else {
        // Check if clicking on interactive elements on the screen
        const interactiveElements = scene.children.filter(child => child.isInteractive);
        const screenIntersects = raycaster.intersectObjects(interactiveElements);
        if (screenIntersects.length > 0) {
            const clickedElement = screenIntersects[0].object;
            handleScreenInteraction(clickedElement);
        }
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    } else {
        console.error('Notification element not found');
    }
}

function moveCameraToScreen() {
    const from = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };
    const to = {
        x: 3,
        y: 2,
        z: -1.8
    };
    new TWEEN.Tween(from)
        .to(to, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.position.set(from.x, from.y, from.z);
            camera.lookAt(new THREE.Vector3(camera.position.x - 3.5, camera.position.y, camera.position.z + 1));
        })
        .start();
}

function handleScreenInteraction(clickedElement) {
    if (clickedElement.name === 'button') {
        console.log('Button clicked');
        // Add your button interaction logic here
    }
}

function showBackButton() {
    const backButton = document.getElementById('backButton');
    backButton.style.display = 'block';

    const rect = renderer.domElement.getBoundingClientRect();
    // Adjust as necessary if homepageContentElement is used
}

function hideBackButton() {
    const backButton = document.getElementById('backButton');
    backButton.style.display = 'none';
    camera.position.set(10, 5, 0);
    controls.enabled = true;
}

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

function slideIn(mesh) {
    const targetY = mesh.position.y;
    mesh.position.y -= 2;
    new TWEEN.Tween(mesh.position)
        .to({ y: targetY }, 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start();
}

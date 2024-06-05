import * as THREE from 'three';
import { camera, renderer, scene, controls, raycaster, mouse } from './setup.js'; // Ensure to import `controls`
import { signMeshes } from './ui.js';
import { hideScreenImage, showButtons } from './interactiveScreen.js';
import { moveCameraToScreen1, createInteractiveScreen1 } from './interactiveScreen1.js'; // Ensure to import the correct function
import TWEEN from '@tweenjs/tween.js';

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
                hideScreenImage();
                showButtons();
                moveCameraToScreen();
            }
            if (clickedSign.text === 'about me') {
                moveCameraToScreen1();
            }
        }
    } else {
        // Check if clicking on interactive elements on the screen
        const interactiveElements = scene.children.filter(child => child.isInteractive);
        const screenIntersects = raycaster.intersectObjects(interactiveElements);
        if (screenIntersects.length > 0) {
            const clickedElement = screenIntersects[0].object;
            if (typeof clickedElement.userData.onClick === 'function') {
                clickedElement.userData.onClick();
            }
        }
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        // notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    } else {
        console.error('Notification element not found');
    }
}

function moveCameraToScreen() {
    controls.enabled = false; // Disable controls to prevent movement

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
    const target = new THREE.Vector3(to.x - 3.5, to.y, to.z + 1);

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
        })
        .start();
}

function slideIn(mesh) {
    const targetY = mesh.position.y;
    mesh.position.y -= 2;
    new TWEEN.Tween(mesh.position)
        .to({ y: targetY }, 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .start();
}

// Call createInteractiveScreen1 to initialize the screen
createInteractiveScreen1();

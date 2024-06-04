import * as THREE from 'three';
import { scene } from './setup.js';

export function addLights() {
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(1, 5, 1);
    scene.add(pointLight);
    console.log('Lights added to the scene'); // Check if lights are added

    const pointLight1 = new THREE.PointLight(0xff00ff, 50, 100);
    pointLight1.position.set(0.4, 3.8, -1);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x1F51FF, 50, 100);
    pointLight2.position.set(2.8, 2, 3.1);
    scene.add(pointLight2);

    const signLight1 = new THREE.PointLight(0xFFFFFF, 1, 10);
    signLight1.position.set(4.14, 2.7, 2);
    scene.add(signLight1);

    const signLight2 = new THREE.PointLight(0xFFFFFF, 1, 10);
    signLight2.position.set(4.14, 1.2, 2);
    scene.add(signLight2);

    const signLight3 = new THREE.PointLight(0xFFFFFF, 1, 10);
    signLight3.position.set(4.14, 2.2, 2);
    scene.add(signLight3);

    const signLight4 = new THREE.PointLight(0xFFFFFF, 1, 10);
    signLight4.position.set(4.14, 1.7, 2);
    scene.add(signLight4);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
}

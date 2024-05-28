import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { scene } from './setup.js';

export const signMeshes = [];

export function createSign(text, color, position, visible = true) {
    const signGeometry = new THREE.BoxGeometry(1.3, 0.4, 0.05);
    const signMaterial = new THREE.MeshStandardMaterial({ color: color });
    const sign = new THREE.Mesh(signGeometry, signMaterial);

    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 0.18,
            height: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.005,
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-0.45, -0.075, 0.03);
        sign.add(textMesh);
        scene.add(sign);
        sign.visible = visible; // Set initial visibility
        signMeshes.push({ mesh: sign, text: text });
    });

    sign.position.set(position.x, position.y, position.z);
    sign.rotation.y = 111 * Math.PI / 180;
    return sign;
}

export function setupSigns() {
    // Create the initial "Click Me" sign
    createSign('Click Me', 0xff0000, { x: 4.1, y: 1, z: 2 });

    // Create the other signs but set them to be initially hidden
    createSign('projects', 0xf72585, { x: 4.1, y: 2.5, z: 2 }, false);
    createSign('articles', 0x3a0ca3, { x: 4.1, y: 2, z: 2 }, false);
    createSign('about me', 0x4361ee, { x: 4.1, y: 1.5, z: 2 }, false);
    createSign('credits', 0x4cc9f0, { x: 4.1, y: 1, z: 2 }, false);
}

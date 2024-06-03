import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { scene } from './setup.js';
import { createInteractiveScreen } from './interactiveScreen.js'; // Import the function


export function loadModels() {
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

    // const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    // const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphere.position.set(0.5, 2.25,-1.2);
    // scene.add(sphere);

    const stemGeometry = new THREE.BoxGeometry(0.1, 2.7, 0.1);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(4, 1.5, 2);
    scene.add(stem);

    // Load font and add text elements
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
        smallTextMesh.position.set(textMesh.position.x + 0.3, textMesh.position.y, textMesh.position.z - 0.8); // Offset by 2 on x-axis
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
        smallTextMesh1.position.set(textMesh.position.x + 0.6, textMesh.position.y, textMesh.position.z - 0.9);
        smallTextMesh1.rotation.x = -Math.PI / 2;
        smallTextMesh1.rotation.z = 111 * Math.PI / 180;
        scene.add(smallTextMesh1);

        // Add smaller, less bold text
        const smallTextGeometry2 = new TextGeometry("Cyber Security Novice", {
            font: font,
            size: 0.2,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.015,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 3
        });

        const smallTextMaterial2 = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const smallTextMesh2 = new THREE.Mesh(smallTextGeometry2, smallTextMaterial2);
        smallTextMesh2.position.set(textMesh.position.x + 0.9, textMesh.position.y, textMesh.position.z - 1);
        smallTextMesh2.rotation.x = -Math.PI / 2;
        smallTextMesh2.rotation.z = 111 * Math.PI / 180;
        scene.add(smallTextMesh2);

        // Add smaller, less bold text
        const smallTextGeometry3 = new TextGeometry("Cloud Engineer", {
            font: font,
            size: 0.2,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.015,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 3
        });

        const smallTextMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const smallTextMesh3 = new THREE.Mesh(smallTextGeometry3, smallTextMaterial3);
        smallTextMesh3.position.set(textMesh.position.x + 1.2, textMesh.position.y, textMesh.position.z - 1.1);
        smallTextMesh3.rotation.x = -Math.PI / 2;
        smallTextMesh3.rotation.z = 111 * Math.PI / 180;
        scene.add(smallTextMesh3);
    });

    //import code for interactive screen
    createInteractiveScreen();

}

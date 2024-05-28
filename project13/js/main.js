console.log('main.js loaded');

import { initializeRenderer, scene, camera } from './setup.js';
import { addLights } from './lighting.js';
import { loadModels } from './models.js';
import { setupSigns } from './ui.js';
import { animate } from './animation.js';
import { setupEvents } from './events.js';

initializeRenderer();
addLights();
loadModels();
setupSigns();
setupEvents();
animate();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

console.log(scene.children);

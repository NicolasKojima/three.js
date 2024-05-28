import { controls, renderer, scene, camera } from './setup.js';
import TWEEN from '@tweenjs/tween.js';

export function animate() {
    requestAnimationFrame(animate);
    controls.update();
    TWEEN.update();
    renderer.render(scene, camera);
}

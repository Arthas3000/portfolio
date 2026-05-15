import { initNavbar } from './ui-components.js';
import { initRevealAnimations, initVisualSystem } from './animations.js';
import { initVideoScrollSync } from './video-sync.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar('navbar');
    initRevealAnimations();
    initVideoScrollSync('scroll-video');
    // Inicializa sistema visual 3D no hero
    initVisualSystem({ containerId: 'hero-visual' }).catch(() => {});
});

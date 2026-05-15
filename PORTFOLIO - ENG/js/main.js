import { initNavbar } from './ui-components.js';
import { initRevealAnimations } from './animations.js';
import { initVideoScrollSync } from './video-sync.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar('navbar');
    initRevealAnimations();
    initVideoScrollSync('scroll-video');
});

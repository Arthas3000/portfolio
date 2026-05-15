export function initNavbar(navbarId) {
    const navbar = document.getElementById(navbarId);
    if (!navbar) return;

    navbar.classList.add('bg-transparent');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/60', 'border-b', 'border-white/10');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-black/60', 'border-b', 'border-white/10');
            navbar.classList.add('bg-transparent');
        }
    });
}

export function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

export async function initVisualSystem(opts = {}) {
    const container = document.getElementById(opts.containerId || 'hero-visual');
    if (!container) return;

    // Dynamic import of Three.js to avoid bundling and keep runtime lightweight
    const THREE = await import('https://unpkg.com/three@0.154.0/build/three.module.js');

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace || renderer.outputEncoding;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    // Lighting — soft, cinematic
    const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.8);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.5);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    // Group to hold shapes
    const group = new THREE.Group();
    scene.add(group);

    // Simple refined abstract objects: icosahedron + torus + plane subtle
    const icoGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const torGeo = new THREE.TorusGeometry(1.6, 0.06, 8, 80);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.12, roughness: 0.45, transparent: true, opacity: 0.9 });

    const ico = new THREE.Mesh(icoGeo, mat.clone());
    ico.scale.set(0.86, 0.86, 0.86);
    ico.position.set(-0.4, -0.1, 0);
    group.add(ico);

    const tor = new THREE.Mesh(torGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.02, roughness: 0.7, transparent: true, opacity: 0.06 }));
    tor.rotation.x = Math.PI / 2;
    tor.position.set(0.6, 0.15, -0.1);
    group.add(tor);

    // subtle wireframe edge for depth
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(icoGeo), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 }));
    edges.position.copy(ico.position);
    edges.scale.copy(ico.scale);
    group.add(edges);

    // resize handling
    function onResize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // Interactions: smooth mouse / scroll response
    let mouse = { x: 0, y: 0 };
    let target = { rx: 0, ry: 0, ty: 0 };
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    window.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        mouse.x = nx;
        mouse.y = ny;
    });

    // scroll affects camera z slightly to create parallax
    function onScroll() {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const scroll = docH > 0 ? window.scrollY / docH : 0;
        target.ty = (scroll - 0.2) * 2.2; // subtle vertical shift
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animation loop
    let last = performance.now();
    function animate(now) {
        const dt = (now - last) / 1000;
        last = now;

        // easing mouse -> rotation targets
        target.ry = mouse.x * 0.8;
        target.rx = mouse.y * 0.6;

        // Lerp group rotation and position for smooth, cinematic feel
        group.rotation.x = lerp(group.rotation.x, target.rx * 0.6, 0.08);
        group.rotation.y = lerp(group.rotation.y, target.ry * 0.9, 0.08);
        group.position.y = lerp(group.position.y, target.ty * -0.8, 0.06);

        // organic floating
        const t = now * 0.0005;
        ico.rotation.x += 0.0012;
        ico.rotation.y += 0.0009;
        ico.position.y += Math.sin(t * 1.2) * 0.0009;
        tor.rotation.z += 0.0006;

        renderer.render(scene, camera);
        container._raf = requestAnimationFrame(animate);
    }

    // initial call
    onResize();
    onScroll();
    animate(performance.now());

    // expose a small API for external tweaks
    return {
        dispose() {
            cancelAnimationFrame(container._raf);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', () => {});
            window.removeEventListener('scroll', onScroll);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        }
    };
}

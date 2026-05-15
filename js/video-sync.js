export function initVideoScrollSync(videoId) {
    const video = document.getElementById(videoId);
    if (!video) return;

    let isVideoLoaded = false;

    video.addEventListener('loadedmetadata', () => {
        isVideoLoaded = true;
        video.pause();
    });

    if (window.innerWidth < 768) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch(() => {
            console.log('Autoplay restrito, fallback seguro ativo.');
        });
        return;
    }

    let targetTime = 0;
    let currentTime = 0;

    const updateVideoTime = () => {
        if (!isVideoLoaded || isNaN(video.duration)) {
            requestAnimationFrame(updateVideoTime);
            return;
        }

        const scrollPosition = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) {
            requestAnimationFrame(updateVideoTime);
            return;
        }

        const scrollFraction = Math.min(Math.max(scrollPosition / maxScroll, 0), 1);
        targetTime = video.duration * scrollFraction;
        currentTime += (targetTime - currentTime) * 0.1;
        video.currentTime = currentTime;

        requestAnimationFrame(updateVideoTime);
    };

    requestAnimationFrame(updateVideoTime);
}

const serviceRevealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

serviceRevealElements.forEach((el) => serviceObserver.observe(el));

const previewVideos = document.querySelectorAll(
  ".video-grid video, .service-hero-preview video"
);

previewVideos.forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("loop", "");
  video.setAttribute("autoplay", "");
  video.preload = "auto";

  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  video.addEventListener("loadeddata", tryPlay, { once: true });
  video.addEventListener("mouseenter", () => video.pause());
  video.addEventListener("mouseleave", tryPlay);
  tryPlay();
});

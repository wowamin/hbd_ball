(() => {
  const screen = document.getElementById("welcome-screen");
  const video = document.getElementById("welcome-video");
  const skipBtn = document.getElementById("welcome-skip");

  if (!screen || !video) return;

  document.body.classList.add("welcome-active");
  let entered = false;

  const triggerBackgroundAudio = () => {
    if (entered) return;
    entered = true;
    document.dispatchEvent(new Event("welcome:enter"));
  };

  const closeWelcome = () => {
    if (screen.classList.contains("is-hidden")) return;
    screen.classList.add("is-hidden");
    document.body.classList.remove("welcome-active");
    video.pause();
    window.setTimeout(() => {
      screen.remove();
    }, 900);
  };

  video.addEventListener("ended", closeWelcome);
  video.addEventListener("error", closeWelcome);

  if (skipBtn) {
    skipBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      closeWelcome();
    });
  }

  video.addEventListener("playing", triggerBackgroundAudio, { once: true });

  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      // Autoplay can be blocked on some browsers; user can skip.
    });
  }
})();

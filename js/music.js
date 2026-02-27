/**
 * Project: hbd_ball
 * Author: wowamin
 * URL: https://wowamin.github.io/hbd_ball/
 * Copyright (c) 2024 wowamin.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

(() => {
  const audio = document.getElementById("myAudio");
  if (!audio) return;

  let unlocked = false;

  const unlockAndPlayAudio = () => {
    if (unlocked) return;
    unlocked = true;
    audio.muted = false;
    audio.volume = 0.4;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  document.addEventListener("click", unlockAndPlayAudio, { once: true });
  document.addEventListener("touchstart", unlockAndPlayAudio, { once: true });
  document.addEventListener("welcome:enter", unlockAndPlayAudio, { once: true });
})();

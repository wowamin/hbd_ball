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

  audio.muted = false;
  audio.volume = 0.4;

  let unlocked = false;

  const playOnFirstGesture = () => {
    if (unlocked) return;
    unlocked = true;

    audio.muted = false;
    audio.volume = 0.4;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // If playback is still blocked, wait for another user gesture.
        unlocked = false;
        bindGestureUnlock();
      });
    }
  };

  const bindGestureUnlock = () => {
    document.addEventListener("pointerdown", playOnFirstGesture, { once: true });
    document.addEventListener("touchstart", playOnFirstGesture, { once: true });
    document.addEventListener("keydown", playOnFirstGesture, { once: true });
  };

  bindGestureUnlock();
})();

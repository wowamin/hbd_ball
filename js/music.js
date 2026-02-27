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

  let autoPlayTimer = null;
  let gestureUnlockBound = false;

  const playAudio = () => {
    audio.muted = false;
    audio.volume = 0.4;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        bindGestureUnlock();
      });
    }
  };

  const unlockByGesture = () => {
    playAudio();
  };

  const bindGestureUnlock = () => {
    if (gestureUnlockBound) return;
    gestureUnlockBound = true;
    document.addEventListener("pointerdown", unlockByGesture, { once: true });
    document.addEventListener("touchstart", unlockByGesture, { once: true });
    document.addEventListener("keydown", unlockByGesture, { once: true });
  };

  const scheduleAutoPlayAfterEnter = () => {
    if (autoPlayTimer !== null) return;
    autoPlayTimer = window.setTimeout(() => {
      playAudio();
    }, 2000);
  };

  document.addEventListener("welcome:enter", scheduleAutoPlayAfterEnter, { once: true });
})();

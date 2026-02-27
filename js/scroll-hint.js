(() => {
  const hint = document.getElementById("scroll-hint");
  if (!hint) return;

  const mobileQuery = window.matchMedia("(max-width: 600px)");
  let hiddenByScroll = false;

  const hideHint = () => {
    if (hiddenByScroll) return;
    hiddenByScroll = true;
    hint.classList.add("is-hidden");
  };

  const syncState = () => {
    if (!mobileQuery.matches) {
      hint.classList.add("is-hidden");
      return;
    }

    if (hiddenByScroll || window.scrollY > 24) {
      hideHint();
      return;
    }

    hint.classList.remove("is-hidden");
  };

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 24) hideHint();
    },
    { passive: true }
  );

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", syncState);
  } else {
    mobileQuery.addListener(syncState);
  }

  syncState();
})();

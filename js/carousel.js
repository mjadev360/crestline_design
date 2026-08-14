const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-carousel]").forEach((root) => {
  const slides = [...root.querySelectorAll(".carousel-slide")];
  if (slides.length < 2) return;

  const dotsWrap = root.querySelector(".carousel-dots");
  const prevBtn = root.querySelector(".carousel-prev");
  const nextBtn = root.querySelector(".carousel-next");
  let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
  let timer;

  slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Show image ${i + 1}`);
    dot.addEventListener("click", () => {
      goTo(i);
      start();
    });
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.querySelectorAll(".carousel-dot")];

  function goTo(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      dots[i].classList.toggle("is-active", active);
      dots[i].setAttribute("aria-current", String(active));
    });
  }

  function start() {
    stop();
    if (prefersReducedMotion) return;
    timer = window.setInterval(() => goTo(index + 1), 5500);
  }

  function stop() {
    window.clearInterval(timer);
  }

  prevBtn?.addEventListener("click", () => {
    goTo(index - 1);
    start();
  });

  nextBtn?.addEventListener("click", () => {
    goTo(index + 1);
    start();
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) start();
  });

  goTo(index);
  start();
});

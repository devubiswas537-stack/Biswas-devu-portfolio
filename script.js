document.documentElement.classList.add("js-ready");

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});
document.getElementById("year").textContent = new Date().getFullYear();

// Intro sequence: brief welcome, then reveal the portfolio.
const intro = document.getElementById("introScreen");
window.addEventListener("load", () => {
  window.setTimeout(() => intro.classList.add("is-done"), 1850);
});

// Reading progress indicator.
const progress = document.getElementById("scrollProgress");
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Reveal sections and cards as they enter the viewport.
const revealTargets = document.querySelectorAll(
  ".content-section, .education-section, .contact-section, .about-grid, .skill-layout, .visual-work-grid, .metrics-grid, .education-grid, .pointer-panel, .timeline-item"
);
revealTargets.forEach((el) => {
  el.classList.add("reveal");
  if (el.matches(".about-grid, .visual-work-grid, .metrics-grid, .education-grid")) {
    el.classList.add("reveal-stagger");
  }
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add("is-visible"));
}

// Gentle pointer glow on desktop; disabled on touch-first devices.
if (window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("pointermove", (event) => {
    document.body.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.body.style.setProperty("--pointer-y", `${event.clientY}px`);
  }, { passive: true });
}

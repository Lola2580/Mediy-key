/* =========================
   SAFE DOM SELECTORS
========================= */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const servicesBtn = document.getElementById("servicesBtn");
const aboutBtn = document.getElementById("aboutBtn");
const bookBtns = document.querySelectorAll(".primary-btn2, .book-btn");
const freeCallBtn = document.querySelector(".secondary-btn");

const servicesSection = document.getElementById("services");
const visionSection = document.getElementById("vision");
const bookingSection = document.getElementById("booking");

const timelineProgress = document.querySelector(".timeline-progress");
const revealItems = document.querySelectorAll(
  ".service-card, .glass-card, .timeline-item, .choose-card, .trust-card, .team-card, .compare-row"
);

const playButtons = document.querySelectorAll(".play-btn");
const videos = document.querySelectorAll(".work-video");
const navAnchors = document.querySelectorAll(".nav-links a");

/* =========================
   MOBILE NAVBAR TOGGLE
========================= */
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* close mobile nav after click */
navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) navLinks.classList.remove("active");
  });
});

/* =========================
   SMOOTH SCROLL HELPER
========================= */
function smoothTo(target) {
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* Services */
if (servicesBtn && servicesSection) {
  servicesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    smoothTo(servicesSection);
  });
}

/* About / Leadership */
if (aboutBtn && visionSection) {
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    smoothTo(visionSection);
  });
}

/* Book Call buttons */
bookBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    smoothTo(bookingSection);
  });
});

/* Free Call */
if (freeCallBtn && bookingSection) {
  freeCallBtn.addEventListener("click", () => {
    smoothTo(bookingSection);
  });
}

/* =========================
   SCROLL REVEAL (INTERSECTION OBSERVER)
========================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

/* =========================
   TIMELINE PROGRESS GLOW
========================= */
function updateTimelineProgress() {
  const timeline = document.querySelector(".timeline");
  if (!timeline || !timelineProgress) return;

  const rect = timeline.getBoundingClientRect();
  const total = rect.height;
  const visible = window.innerHeight - rect.top;

  let progress = (visible / total) * 100;

  progress = Math.max(0, Math.min(progress, 100));

  timelineProgress.style.height = `${progress}%`;
}

window.addEventListener("scroll", updateTimelineProgress);
window.addEventListener("load", updateTimelineProgress);

/* =========================
   VIDEO PLAY / PAUSE
   only one video at a time
========================= */
playButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".video-card");
    const video = card?.querySelector(".work-video");
    if (!video) return;

    /* pause all others */
    videos.forEach((v) => {
      if (v !== video) {
        v.pause();
        v.currentTime = 0;
        v.closest(".video-card")?.classList.remove("playing");
      }
    });

    /* toggle current */
    if (video.paused) {
      video.play();
      card.classList.add("playing");
    } else {
      video.pause();
      card.classList.remove("playing");
    }
  });
});

/* reset after end */
videos.forEach((video) => {
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.closest(".video-card")?.classList.remove("playing");
  });
});

/* =========================
   TOUCH SAFE (disable hover tilt on mobile)
========================= */
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
  const cards = document.querySelectorAll(".team-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 18;
      const rotateY = (x - rect.width / 2) / 18;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

/* =========================
   RESIZE FIX
========================= */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navLinks) {
    navLinks.classList.remove("active");
  }
});

/* =========================
   DOM ELEMENTS
========================= */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const bookBtn = document.getElementById("bookBtn");
const freeCallBtn = document.getElementById("freeCallBtn");
const bookingSection = document.getElementById("book-call");
const servicesBtn = document.getElementById("servicesBtn");
const aboutBtn = document.getElementById("aboutBtn");

const servicesSection = document.getElementById("services");
const visionSection = document.getElementById("vision");
/* =========================
   NAVBAR TOGGLE
========================= */
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* =========================
   SMOOTH SCROLL BUTTONS
========================= */
function smoothScrollToBooking() {
  if (!bookingSection) return;

  bookingSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

if (bookBtn) {
  bookBtn.addEventListener("click", smoothScrollToBooking);
}

if (freeCallBtn) {
  freeCallBtn.addEventListener("click", smoothScrollToBooking);
}
/* =========================
   NAV LINK SMOOTH SCROLL
========================= */

if (servicesBtn && servicesSection) {
  servicesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    servicesSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

if (aboutBtn && visionSection) {
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    visionSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
/* =========================
   SCROLL REVEAL CARDS
========================= */
const revealCards = document.querySelectorAll(
  ".service-card, .glass-card, .choose-card, .trust-card, .compare-row, .team-card"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(60px)";
  card.style.transition = "0.7s ease";
  revealObserver.observe(card);
});

/* =========================
   HOW WE WORK TIMELINE
========================= */
const timeline = document.querySelector(".timeline");
const timelineProgress = document.getElementById("timelineProgress");
const timelineItems = document.querySelectorAll(".timeline-item");

function updateTimeline() {
  if (!timeline || !timelineProgress) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const totalHeight = timeline.offsetHeight;

  let progress = ((windowHeight - rect.top) / totalHeight) * 100;
  progress = Math.max(0, Math.min(100, progress));

  timelineProgress.style.height = progress + "%";

  timelineItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    const dot = item.querySelector(".timeline-dot");

    if (top < windowHeight - 120) {
      item.classList.add("show");
    }

    if (dot) {
      if (top < windowHeight / 2 && top > 0) {
        dot.style.boxShadow = "0 0 40px rgba(0,255,180,.6)";
        dot.style.transform = "translateX(-50%) scale(1.12)";
      } else {
        dot.style.boxShadow = "0 0 30px rgba(125,92,255,.45)";
        dot.style.transform = "translateX(-50%) scale(1)";
      }
    }
  });
}

window.addEventListener("scroll", updateTimeline);
window.addEventListener("load", updateTimeline);

/* =========================
   OUR WORK VIDEO SYSTEM
========================= */
const workCards = document.querySelectorAll(".video-card");

workCards.forEach((card) => {
  const video = card.querySelector(".work-video");
  const playBtn = card.querySelector(".play-btn");

  if (!video || !playBtn) return;

  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    // baki sab video stop
    workCards.forEach((otherCard) => {
      const otherVideo = otherCard.querySelector(".work-video");

      if (otherVideo && otherVideo !== video) {
        otherVideo.pause();
        otherVideo.currentTime = 0;
        otherVideo.controls = false;
        otherCard.classList.remove("playing");
      }
    });

    // toggle current
    if (video.paused) {
      video.controls = true;
      video.play();
      card.classList.add("playing");
    } else {
      video.pause();
      card.classList.remove("playing");
    }
  });

  // video click = pause/play
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      card.classList.add("playing");
    } else {
      video.pause();
      card.classList.remove("playing");
    }
  });

  // end = reset
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.controls = false;
    card.classList.remove("playing");
  });

  // pause manually
  video.addEventListener("pause", () => {
    if (!video.ended) {
      card.classList.remove("playing");
    }
  });
});

/* =========================
   TEAM CARD 3D HOVER
========================= */
const teamCards = document.querySelectorAll(".team-card");

teamCards.forEach((card) => {
  const shape = card.querySelector(".rotating-shape");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;

    if (shape) {
      shape.style.transform = `
        rotate(${(x / rect.width) * 360}deg)
        scale(1.05)
      `;
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;

    if (shape) {
      shape.style.transform = "rotate(45deg) scale(1)";
    }
  });
});

/* =========================
   SCROLL TO TOP (ADVANCE)
========================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.style.backdropFilter = "blur(16px)";
    navbar.style.background = "rgba(8,8,8,0.72)";
  } else {
    navbar.style.backdropFilter = "blur(10px)";
    navbar.style.background = "rgba(138,151,149,0.35)";
  }
});

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
const teamCards = document.querySelectorAll(".team-card:not(.active-card)");
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
// Video Data
const videos = [
  {
    id: 1,
    src: "assets/videos/AstroEdit.mp4",
    title: "Brand Story"
  },
  {
    id: 2,
    src: "assets/videos/Short.mp4",
    title: "Product Launch"
  },
  {
    id: 3,
    src: "assets/videos/isa edit.mp4",
    title: "Corporate Film"
  },
  {
    id: 4,
    src: "assets/videos/VID-20231216-WA0002.mp4",
    title: "Social Media Ad"
  },
  {
    id: 5,
    src: "assets/videos/Sample 100$dollar.mp4",
    title: "Social Media Ad"
  },
  {
    id: 6,
    src: "assets/videos/portfolio-video-1-CWGO_eCh.mp4",
    title: "Social Media Ad"
  }
];
// Populate Carousel
const track = document.getElementById('carouselTrack');
let html = '';

// Original videos
videos.forEach(video => {
  html += `
    <div class="carousel-card">
      <div class="video-wrapper">
       <video class="work-video" preload="metadata" controls playsinline>
          <source src="${video.src}" type="video/mp4">
        </video>
        <button class="play-btn-overlay">▶</button>
        <div class="video-title">${video.title}</div>
      </div>
    </div>
  `;
});

// Duplicate for seamless loop
videos.forEach(video => {
  html += `
    <div class="carousel-card">
      <div class="video-wrapper">
        <video class="work-video" preload="metadata"
       playsinline>
          <source src="${video.src}" type="video/mp4">
        </video>
        <button class="play-btn-overlay">▶</button>
        <div class="video-title">${video.title}</div>
      </div>
    </div>
  `;
});

track.innerHTML = html;

// Auto Scroll Logic
const container = document.getElementById('carouselContainer');

let isHovering = false;
let currentPlayingVideo = null;
let animationId = null;

function startAutoScroll() {

  if (animationId) cancelAnimationFrame(animationId);

  function scroll() {

    // Agar mouse hover hai ya koi video chal raha hai
    if (!isHovering && currentPlayingVideo === null && container) {

      const trackEl = document.querySelector('.carousel-track');

      if (trackEl) {

        trackEl.scrollLeft += 1.2;

        if (
          trackEl.scrollLeft + trackEl.clientWidth >=
          trackEl.scrollWidth - 10
        ) {
          trackEl.scrollLeft = 0;
        }
      }
    }

    animationId = requestAnimationFrame(scroll);
  }

  scroll();
}

// Hover Pause
if (container) {

  container.addEventListener('mouseenter', () => {
    isHovering = true;
  });

  container.addEventListener('mouseleave', () => {
    isHovering = false;
  });

}

startAutoScroll();
const trackEl = document.querySelector('.carousel-track');

let isDragging = false;
let startX = 0;
let scrollStart = 0;

trackEl.addEventListener('mousedown', (e) => {

  isDragging = true;

  startX = e.pageX;
  scrollStart = trackEl.scrollLeft;

  trackEl.style.cursor = 'grabbing';

});

window.addEventListener('mouseup', () => {

  isDragging = false;

  trackEl.style.cursor = 'grab';

});

trackEl.addEventListener('mousemove', (e) => {

  if (!isDragging) return;

  e.preventDefault();

  const walk = (e.pageX - startX) * 1.5;

  trackEl.scrollLeft = scrollStart - walk;

});

// VIDEO SYSTEM
document.querySelectorAll('.carousel-card').forEach((card) => {

  const video = card.querySelector('.work-video');
  const playBtn = card.querySelector('.play-btn-overlay');

  if (!video || !playBtn) return;

  // Start me controls hide
  video.controls = false;

  // Play Button
  playBtn.addEventListener('click', (e) => {

    e.stopPropagation();

    // Sab videos stop
    document.querySelectorAll('.work-video').forEach((v) => {

      if (v !== video) {

        v.pause();
        v.controls = false;

        const btn = v.closest('.carousel-card')
          ?.querySelector('.play-btn-overlay');

        if (btn) btn.style.opacity = '1';
      }

    });

    if (video.paused) {

      video.controls = true;
      video.play();

    } else {

      video.pause();

    }

  });

  // Video Playing
  video.addEventListener('play', () => {

    currentPlayingVideo = video;

    playBtn.style.opacity = '0';

  });

  // Video Pause
  video.addEventListener('pause', () => {

    if (currentPlayingVideo === video) {
      currentPlayingVideo = null;
    }

    video.controls = false;

    playBtn.style.opacity = '1';

  });

  // Video End
  video.addEventListener('ended', () => {

    currentPlayingVideo = null;

    video.controls = false;

    playBtn.style.opacity = '1';

  });

  // Double Click Fullscreen
  video.addEventListener('dblclick', () => {

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }

  });

});
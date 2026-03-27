const audioDemos = [
  {
    title: "Wilco – Anniversary Deals",
    meta: "Commercial",
    file: "wilco-anniversary-deals.mp3"
  },
  {
    title: "Wensom Caravans – With a Smile",
    meta: "Commercial",
    file: "wensom-caravans.mp3"
  },
  {
    title: "Trago Mills – Kitchen Sale 2025",
    meta: "Commercial",
    file: "trago-kitchen-sale.mp3"
  },
  {
    title: "Tamar Security – Home & Business Protection",
    meta: "Commercial",
    file: "tamar-security.mp3"
  },
  {
    title: "Inter-Line – Cheap as Chips",
    meta: "Jingle",
    file: "inter-line-cheap-as-chips.mp3"
  },
  {
    title: "GHA – Stop Smoking",
    meta: "Commercial",
    file: "gha-stop-smoking.mp3"
  },
  {
    title: "Floor 24 – Jingle",
    meta: "Jingle",
    file: "floor-24-jingle.mp3"
  },
  {
    title: "D&G Autocare – Really Care",
    meta: "Jingle",
    file: "d-and-g-autocare.mp3"
  },
  {
    title: "CY Sheet Metals – What What?",
    meta: "Jingle",
    file: "cy-sheet-metals.mp3"
  },
  {
    title: "Builders Beams 4U – Single Beam to Full Structure",
    meta: "Commercial",
    file: "builders-beams-4u.mp3"
  },
  {
    title: "Mattressman – Imagine",
    meta: "Commercial",
    file: "mattressman-imagine.mp3"
  },
  {
    title: "Squires Garden Centres – Spring 2026",
    meta: "Commercial",
    file: "squires-spring-2026.mp3"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  renderDemos();
  initMobileNav();
  initScrollHeader();
  initBackToTop();
  initContactForm();
  initCopyrightYear();
  initLiveListen();
});

function initCopyrightYear() {
  var el = document.getElementById("copyright-year");
  if (el) el.textContent = new Date().getFullYear();
}

function renderDemos() {
  const grid = document.getElementById("demos-grid");
  if (!grid) return;
  grid.innerHTML = audioDemos
    .filter(function (demo) { return !demo.hidden; })
    .map(function (demo) {
      const encodedFile = encodeURIComponent(demo.file);
      return '<div class="demo-card">' +
        '<h3>' + demo.title + '</h3>' +
        '<p class="demo-meta">' + demo.meta + '</p>' +
        '<audio controls preload="none"><source src="/audio/' + encodedFile + '" type="audio/mpeg">Your browser does not support audio.</audio>' +
        '<a href="/audio/' + encodedFile + '" download class="demo-download">Download MP3</a>' +
        '</div>';
    })
    .join("");

  var allAudio = grid.querySelectorAll("audio");
  allAudio.forEach(function (player) {
    player.addEventListener("play", function () {
      allAudio.forEach(function (other) {
        if (other !== player) {
          other.pause();
          other.currentTime = 0;
        }
      });
    });
  });
}

function initMobileNav() {
  var toggle = document.querySelector(".mobile-toggle");
  var nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initScrollHeader() {
  var header = document.querySelector(".site-header");
  if (!header) return;
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

function initBackToTop() {
  var btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initLiveListen() {
  var btn = document.getElementById("live-listen-btn");
  var audio = document.getElementById("torbay-radio-audio");
  if (!btn || !audio) return;
  var iconPlay = btn.querySelector(".icon-play");
  var iconStop = btn.querySelector(".icon-stop");
  var label = btn.querySelector("span");
  var playing = false;

  function reset() {
    playing = false;
    btn.classList.remove("playing");
    iconPlay.style.display = "";
    iconStop.style.display = "none";
    label.textContent = "Listen Live";
  }

  btn.addEventListener("click", function () {
    if (playing) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      reset();
    } else {
      audio.src = "/api/stream/torbay";
      audio.load();
      audio.play().then(function () {
        playing = true;
        btn.classList.add("playing");
        iconPlay.style.display = "none";
        iconStop.style.display = "";
        label.textContent = "Stop";
      }).catch(function () {
        reset();
      });
    }
  });

  audio.addEventListener("error", function () { reset(); });
}

function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = document.getElementById("form-status");
    var btn = form.querySelector('button[type="submit"]');
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      status.className = "form-status error";
      status.textContent = "Please fill in all fields.";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending...";

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, message: message })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          status.className = "form-status success";
          status.textContent = data.message;
          form.reset();
        } else {
          status.className = "form-status error";
          status.textContent = data.error || "Something went wrong. Please try again.";
        }
      })
      .catch(function () {
        status.className = "form-status error";
        status.textContent = "Could not send message. Please call us instead.";
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = "Send Message";
      });
  });
}

// Randomise client logo order on every page load
(function () {
  var slides = document.querySelectorAll(".clients-slide");
  if (!slides.length) return;

  var imgs = Array.from(slides[0].querySelectorAll("img"));
  for (var i = imgs.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = imgs[i]; imgs[i] = imgs[j]; imgs[j] = tmp;
  }

  slides.forEach(function (slide) {
    imgs.forEach(function (img) {
      slide.appendChild(img.cloneNode(true));
    });
    Array.from(slide.querySelectorAll("img")).slice(0, -imgs.length).forEach(function (old) {
      slide.removeChild(old);
    });
  });
}());

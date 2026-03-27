const audioDemos = [
  {
    title: "Harpers Furniture – Summer Sale",
    meta: "Commercial Demo",
    file: "Harpers Furniture - Summer Sale - MANY - 070616.mp3"
  },
  {
    title: "Crayford & Abs – The Smart Choice",
    meta: "Commercial Demo",
    file: "Crayford and Abs the smart choice 02-11-16.mp3"
  },
  {
    title: "Choice Carpets",
    meta: "Commercial Demo",
    file: "ChoiceCarpets.mp3"
  },
  {
    title: "John Parker Fixings – We're The Best",
    meta: "Commercial Demo",
    file: "John Parker Fixings -We're the best - 091116.mp3"
  },
  {
    title: "Macmillan Cancer Support – Brighton Marathon",
    meta: "Charity Commercial",
    file: "Macmillan Cancer Support - Brighton Marathon - 180214.mp3"
  },
  {
    title: "Leslie Bike Shop",
    meta: "Commercial Demo",
    file: "Leslie Bike Shop.mp3"
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

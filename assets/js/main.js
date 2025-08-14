/***************************************************
==================== JS INDEX ======================
****************************************************

****************************************************/
// Scroll JS
document.querySelector(".hero-sec-scroll").addEventListener("click", function(e) {
  e.preventDefault();
  const headerOffset = 100; // navbar height
  const element = document.querySelector("#scroll-section");
  const offsetPosition = element.offsetTop - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
});

// Counter JS
function animateCounter(counter, target, duration) {
  const isDecimal = target % 1 !== 0;
  let start = 0;
  const stepTime = 20; // ms per step
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    counter.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
  }, stepTime);
}

let hasAnimated = false;

const section = document.querySelector("#counter-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      hasAnimated = true;
      const counters = document.querySelectorAll(".counter");
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        animateCounter(counter, target, 2000); // 2 sec
      });
    }
  });
}, {
  threshold: 0.5
});

observer.observe(section);

// Filter Menu Js
function setupFilterAnimation(containerSelectors) {
  const selectors = Array.isArray(containerSelectors) ? containerSelectors : [containerSelectors];

  selectors.forEach(containerSelector => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Support both "button-group" and "menu-group"
    const buttons = container.querySelectorAll(".button-group button, .menu-group button");
    if (!buttons.length) return;

    const initial = container.querySelector(".button-group .active, .menu-group .active");
    if (initial) {
      initial.classList.add("active");
    }

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });
}

setupFilterAnimation([".tabs-filter-menu", ".demo-filter-menu"]);

// Filter Item Js
document.addEventListener("DOMContentLoaded", function () {
  const filterSetups = [
    {
      containerSelector: ".filter-box",
      itemSelector: ".feature-item",
      buttonGroupSelector: ".filter-button-group"
    },
    {
      containerSelector: ".demo-box",
      itemSelector: ".demo-filter-item",
      buttonGroupSelector: ".demo-button-group"
    }
  ];

  filterSetups.forEach(setup => {
    const container = document.querySelector(setup.containerSelector);
    if (!container) return;

    imagesLoaded(container, function () {
      const iso = new Isotope(container, {
        itemSelector: setup.itemSelector,
        percentPosition: true,
        masonry: {
          columnWidth: container.querySelector(".filter-sizer"),
          gutter: container.querySelector(".gutter-sizer"),
        }
      });

      const buttonGroup = document.querySelector(setup.buttonGroupSelector);
      if (!buttonGroup) return;

      buttonGroup.addEventListener("click", function (event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === "button") {
          // Remove active class
          const buttons = buttonGroup.querySelectorAll("button");
          buttons.forEach(btn => btn.classList.remove("active"));

          target.classList.add("active");

          const filterValue = target.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });
        }
      });
    });
  });
});

// Accordion JS
document.querySelectorAll(".accordion-item.active .faq-text").forEach(content => {
  content.style.height = content.scrollHeight + "px";
});

document.querySelectorAll(".accordion-item .faq-title").forEach((title) => {
  title.addEventListener("click", function () {
      const item = this.parentElement;
      const content = item.querySelector(".faq-text");

      document.querySelectorAll(".accordion-item.active").forEach((otherItem) => {
          if (otherItem !== item) {
              otherItem.classList.remove("active");
              const otherContent = otherItem.querySelector(".faq-text");
              otherContent.style.height = "0px";
          }
      });

      if (item.classList.contains("active")) {
          item.classList.remove("active");
          content.style.height = "0px";
      } else {
          item.classList.add("active");
          content.style.height = content.scrollHeight + "px";
      }
  });
});

// Testimonial JS
if ($(".testimonial-slider").length > 0) {
  var testimonial = new Swiper(".testimonial-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 7000,
    },
    speed: 2000,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}












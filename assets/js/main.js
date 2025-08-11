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
document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-list > li");

  accordionItems.forEach(item => {
    const desc = item.querySelector(".faq-desc");
    if (desc) {
      desc.style.maxHeight = "0px";
      desc.style.overflow = "hidden";
      desc.style.transition = "max-height 0.3s ease";
    }
  });

  accordionItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const desc = this.querySelector(".faq-desc");
      const activeItem = document.querySelector(".accordion-list > li.active");

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        if (desc) desc.style.maxHeight = "0px";
      } else {
        
        if (activeItem) {
          activeItem.classList.remove("active");
          const activeDesc = activeItem.querySelector(".faq-desc");
          if (activeDesc) activeDesc.style.maxHeight = "0px";
        }
        this.classList.add("active");
        if (desc) desc.style.maxHeight = desc.scrollHeight + "px";
      }
    });
  });
});









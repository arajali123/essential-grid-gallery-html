/***************************************************
==================== JS INDEX ======================
****************************************************

****************************************************/

// Fun Fact Js
$(".counter").counterUp({
  delay: 10,
  time: 1000,
});

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

// Feature Filter Js
function setupFilterAnimation(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) return;

  const buttons = container.querySelectorAll(".button-group button");

  if (!buttons.length) return;

  // Initial setup for default active button
  const initial = container.querySelector(".button-group .active");
  if (initial) {
    initial.classList.add("active");
  }

  // Event listener for each button
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

// Call function for both filters
setupFilterAnimation(".tabs-filter-menu");


// Feature Filter Js
document.addEventListener("DOMContentLoaded", function () {
  const featureBox = document.querySelector(".feature-box");

  if (!featureBox) return;

  // Wait until all images are loaded
  imagesLoaded(featureBox, function () {
    // Initialize Isotope
    const iso = new Isotope(featureBox, {
      itemSelector: ".feature-item",
      percentPosition: true,
      masonry: {
        columnWidth: featureBox.querySelector(".feature-sizer"),
        gutter: featureBox.querySelector(".gutter-sizer"),
      }
    });

    // Filter button click
    const buttonGroup = document.querySelector(".filter-button-group");
    if (!buttonGroup) return;

    buttonGroup.addEventListener("click", function (event) {
      const target = event.target;
      if (target.tagName.toLowerCase() === "button") {
        // Remove active from all
        const buttons = buttonGroup.querySelectorAll("button");
        buttons.forEach(btn => btn.classList.remove("active"));

        // Add active to clicked
        target.classList.add("active");

        const filterValue = target.getAttribute("data-filter");
        iso.arrange({ filter: filterValue });
      }
    });
  });
});


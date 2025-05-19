document.addEventListener("DOMContentLoaded", () => {
  const labels = ["Home", "Explore", "Settings"];
  const iconUrls = ["../img/home.svg", "/img/explore.svg", "/img/user.svg"];
  const activeIconUrls = [
    "../img/home-fill.svg",
    "/img/explore-fill.svg",
    "/img/user-fill.svg",
  ];

  // Initialize Swiper with the default active slide set to 0 (Home)

  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    autoHeight: false,
    loop: false,
    initialSlide: 0, // Ensure it starts on the "Home" slide
    height: "100vh",
    touchMoveStopPropagation: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: (index, className) => {
        return `<span class="${className}">
            <img src="${
          iconUrls[index]
        }" class="icons-pagination" data-index="${index}"/>
            ${labels[index]}
          </span>`;
      },
    },
    on: {
      slideChange: function () {
        updatePaginationIcons(this.activeIndex);
        runLanguageDetection();
        console.log("Current scroll position:", window.scrollY);
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log("After scroll:", window.scrollY);

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
      },
    },
  });

  // Call the updatePaginationIcons function after Swiper initialization
  updatePaginationIcons(swiper.activeIndex);

  function updatePaginationIcons(activeIndex) {
    const bullets = document.querySelectorAll(
      ".swiper-pagination .swiper-pagination-bullet",
    );
    bullets.forEach((bullet, index) => {
      const imgElement = bullet.querySelector(".icons-pagination");
      imgElement.src = index === activeIndex
        ? activeIconUrls[index] // Use the filled version if active
        : iconUrls[index]; // Use the regular version if not active
    });
  }

  // Ensure that "Home" is active by default after content is loaded
  updatePaginationIcons(0); // Set the Home icon to be active by default

  // Populate Swiper content and run language detection
  document.getElementById("home-slide-content").innerHTML =
    document.getElementById("home-content").innerHTML;
  document.getElementById("explore-slide-content").innerHTML =
    document.getElementById("explore-content").innerHTML;
  document.getElementById("settings-slide-content").innerHTML =
    document.getElementById("settings-content").innerHTML;

  runLanguageDetection(); // Initial language detection after content load

  // Language Detection Functions
  function runLanguageDetection() {
    addPersiaClass();
    addEnglishClass();
  }

  function addPersiaClass() {
    const persianRegex = /[\u0600-\u06FF\u0750-\u077F]/;
    document.querySelectorAll("*").forEach((el) => {
      const directText = Array.from(el.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.nodeValue)
        .join("");
      const containsPersian = persianRegex.test(directText) ||
        (el.hasAttribute("placeholder") &&
          persianRegex.test(el.getAttribute("placeholder")));
      if (containsPersian) el.classList.add("farsi");
    });
  }

  function addEnglishClass() {
    const englishRegex = /[A-Za-z]/;
    document.querySelectorAll("*").forEach((el) => {
      const directText = Array.from(el.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.nodeValue)
        .join("");
      const containsEnglish = englishRegex.test(directText) ||
        (el.hasAttribute("placeholder") &&
          englishRegex.test(el.getAttribute("placeholder")));
      if (containsEnglish) el.classList.add("english");
    });
  }
  const swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 0,
    loop: true,
    mousewheel: true,
    autoplay: {
      delay: 3000, // Delay between transitions (in milliseconds)
      disableOnInteraction: false, // Keep autoplay running even after interactions
    },
    pagination: {
      el: ".swiper-pagination-2",
      clickable: true,
    },
    autoHeight: false,
    touchMoveStopPropagation: true, // Prevent child swiper from affecting parent swiper
    nested: true, // Ensure it works in a nested swiper scenario
  });
  // Function to initialize Swiper based on the current window width
  // Function to initialize Swiper based on the current window width

  // Initialize or update the Swiper instance
  const swiper3 = new Swiper(".mySwiper3", {
    slidesPerView: "auto", // Ensure at least 1 slide is visible
    spaceBetween: 10, // Use the dynamically calculated gap
    autoHeight: false,
    touchMoveStopPropagation: true, // Prevent child swiper from affecting parent swiper
    nested: true, // Ensure it works in a nested swiper scenario
    freeMode: true,
    loop: false,
  });

  /* explore movie */
  //   button slider
  const btn = document.getElementById("btn");
  const movieBtn = document.getElementById("movie");
  const seriesBtn = document.getElementById("series");

  movieBtn.addEventListener("click", function () {
    btn.style.right = "48%";
  });
  seriesBtn.addEventListener("click", function () {
    btn.style.right = "1%";
  });

  // button click
  document.querySelectorAll(".blob-button").forEach((button) => {
    button.addEventListener("click", function (event) {
      const blob = this.querySelector(".blob");

      // Get the click position relative to the button
      const rect = this.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      // Position the blob at the click location
      blob.style.top = `${clickY - blob.offsetHeight / 2}px`; // Center blob at click position
      blob.style.left = `${clickX - blob.offsetWidth / 2}px`; // Center blob at click position

      // Reset the blob before applying the animation (in case of multiple clicks)
      blob.style.animation = "none";
      blob.offsetHeight; // Trigger reflow to restart animation

      // Apply the animation to make the blob expand and change color
      blob.style.animation = "expandBlob 0.6s ease-out forwards";

      // Reset the blob back to its initial state after the animation duration
      setTimeout(() => {
        blob.style.animation = "none"; // Reset animation
        blob.style.transform = "scale(0)"; // Reset size to small
        blob.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // Reset color to transparent
      }, 600); // Match the timeout to the animation duration (0.6s)
    });
  });
});

// Selecting elements
const searchIcon = document.querySelector(".search-icon ");
const searchIconImg = document.querySelector(".search-icon img");
const searchOverlay = document.getElementById("searchOverlay");

// Flag to check if the overlay is open or not
let overlayOpen = false;

// Search icon click event to toggle overlay
searchIcon.addEventListener("click", function () {
  if (overlayOpen) {
    searchOverlay.classList.remove("active"); // Hide the overlay
    searchIconImg.src = "/img/search.svg"; // Change the icon back to search.svg
    searchIconImg.classList.remove("fade-in");
    searchIconImg.classList.add("fade-out"); // If open, close it
  } else {
    searchOverlay.classList.add("active"); // Show the overlay
    searchIconImg.src = "/img/close.svg"; // Change the icon to close.svg
    searchIconImg.classList.remove("fade-out"); // If closed, open it
    searchIconImg.classList.add("fade-in");
  }
  overlayOpen = !overlayOpen; // Toggle the flag
});
document.addEventListener;

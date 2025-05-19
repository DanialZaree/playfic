const menuItems = document.querySelectorAll(".menu-item");
const menu = document.getElementById("menu");
const menuItems2 = document.querySelectorAll(".menu-item2");
const menu2 = document.getElementById("menu2");
// Initialize Swiper

// Update underline position initially
document.addEventListener("DOMContentLoaded", () => {
  // Parent Swiper
  const swiper = new Swiper(".parent-swiper", {
    loop: false,
    touchMoveStopPropagation: false,
    autoHeight: true,
    spaceBetween: 30,
    on: {
      slideChange: function () {
        updateMenuNav(swiper.activeIndex);
      },
    },
  });
  const swiper2 = new Swiper(".parent-swiper2", {
    loop: false,
    touchMoveStopPropagation: true,
    autoHeight: true,
    nested: true,
    spaceBetween: 30,
    allowTouchMove: false,
    on: {
      slideChange: function () {
        updateMenuNav2(swiper2.activeIndex);
      },
    },
  });

  // Child Swiper 1 (nested inside the parent swiper)
  const swiper1 = new Swiper(".swiper-container1", {
    slidesPerView: "auto",
    spaceBetween: 10,
    autoHeight: false,
    touchMoveStopPropagation: true,
    nested: true,
    freeMode: true,
    loop: false,
  });

  // Add click event listener for menu items
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Navigate to the corresponding slide and update menu
      swiper.slideTo(index);
      updateMenuNav(index);
    });
  });

  // Function to update active menu item
  function updateMenuNav(activeIndex) {
    menuItems.forEach((menu) => menu.classList.remove("active"));

    // Add active class to the current menu item
    const activeItem = menuItems[activeIndex];
    activeItem.classList.add("active");

    // Get the menu container and calculate scrolling manually
    const menuContainer = document.getElementById("menu");
    const containerWidth = menuContainer.offsetWidth;
    const containerScrollLeft = menuContainer.scrollLeft;

    const itemOffsetLeft = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;

    // Calculate new scroll position to keep the active item visible
    const newScrollLeft = itemOffsetLeft - (containerWidth - itemWidth) / 2;

    // Smoothly scroll to the calculated position
    menuContainer.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  }
  updateMenuNav(0); // Start with the first item active

  // Add click event listener for menu items
  menuItems2.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Navigate to the corresponding slide and update menu
      swiper2.slideTo(index);
      updateMenuNav2(index);
    });
  });

  // Function to update active menu item
  function updateMenuNav2(activeIndex) {
    menuItems2.forEach((menu) => menu.classList.remove("active"));

    // Add active class to the current menu item
    const activeItem = menuItems2[activeIndex];
    activeItem.classList.add("active");

    // Get the menu container and calculate scrolling manually
    const menuContainer = document.getElementById("menu2");
    const containerWidth = menuContainer.offsetWidth;
    const containerScrollLeft = menuContainer.scrollLeft;

    const itemOffsetLeft = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;

    // Calculate new scroll position to keep the active item visible
    const newScrollLeft = itemOffsetLeft - (containerWidth - itemWidth) / 2;

    // Smoothly scroll to the calculated position
    menuContainer.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  }
  updateMenuNav2(0); // Start with the first item active
});

// Dynamic styles to hide scrollbar
menu.style.overflowX = "scroll";
menu.style.scrollbarWidth = "none"; // Firefox
menu.style.webkitOverflowScrolling = "touch"; // Smooth scrolling on iOS devices

// For Webkit-based browsers (Chrome, Safari, Edge)
const style = document.createElement("style");
style.innerHTML = `
    #menu::-webkit-scrollbar {
        display: none;
    }
`;
document.head.appendChild(style);

// Add dragging functionality to the menu
let isDragging = false;
let startX;
let scrollLeft;

menu.addEventListener("mousedown", (e) => {
  isDragging = true;
  menu.classList.add("dragging"); // Optional: Add a visual cue during dragging
  startX = e.pageX - menu.offsetLeft;
  scrollLeft = menu.scrollLeft;
});

menu.addEventListener("mouseup", () => {
  isDragging = false;
  menu.classList.remove("dragging");
});

menu.addEventListener("mouseleave", () => {
  isDragging = false;
  menu.classList.remove("dragging");
});

menu.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - menu.offsetLeft;
  const walk = (x - startX) * 2; // Adjust multiplier for sensitivity
  menu.scrollLeft = scrollLeft - walk;
});
// Get the action bar and buttons
const actionBar = document.getElementById("actionBar");
const downloadBtn = document.getElementById("downloadBtn");
const watchBtn = document.getElementById("watchBtn");

// Add event listeners to swiper-slide items
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", () => {
    const downloadLink = item.getAttribute("data-download");
    const watchLink = item.getAttribute("data-watch");

    actionBar.classList.add("active");
    if (downloadLink && watchLink) {
      // Set the buttons' actions
      downloadBtn.setAttribute("href", downloadLink);
      watchBtn.setAttribute("href", watchLink);
    }
  });
});

// Add event listener to detect clicks outside the actionBar
document.addEventListener("click", (e) => {
  // Check if click is outside the actionBar or any relevant swiper-slide
  const isRelevantSwiperSlide = e.target.closest(
    ".swiper-slide[data-has-action]",
  );
  if (!actionBar.contains(e.target) && !isRelevantSwiperSlide) {
    actionBar.classList.remove("active");
  }
});

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
// range

const rangeSlider = document.querySelector(".range-slider");
const scaleItems = document.querySelectorAll(".scale-item");

rangeSlider.addEventListener("input", function () {
  const value = parseInt(this.value); // Ensure the slider value is treated as a number

  // Update the slider background
  const percent = (value - this.min) / (this.max - this.min) * 100;
  this.style.background =
    `linear-gradient(to right, #ffd100 ${percent}%, #29354B ${percent}%,#29354B 98%,transparent 99%)`;

  // Hide or show dots based on the slider value
  scaleItems.forEach((item) => {
    const itemValue = parseInt(item.getAttribute("data-value")); // Ensure itemValue is treated as a number
    if (value >= itemValue) {
      item.classList.add("hidden-dot"); // Hide dot for the exact value
    } else {
      item.classList.remove("hidden-dot"); // Show dot for all other values
    }
  });
});
const cbtn = document.querySelectorAll(".cbtn");

cbtn.forEach((item) => {
  item.addEventListener("click", function () {
    cbtn.forEach((btn) => btn.classList.remove("imdb-btn"));
    item.classList.add("imdb-btn");
  });
});
// bookmark
const bookmark = document.querySelector(".bookmark");
const markwrapp = document.querySelector(".icon-wrapper.mark");
markwrapp.addEventListener("click", function () {
  if (bookmark.src.includes("bookmark-fill.svg")) {
    setTimeout(() => {
      bookmark.src = "../img/bookmark.svg";
    }, 500);
  } else {
    setTimeout(() => {
      bookmark.src = "../img/bookmark-fill.svg";
    }, 500);
  }
});
// like dis

const likedis = document.querySelectorAll(".w25");

likedis.forEach((item) => {
  item.addEventListener("click", function () {
    const isAlreadyFilled = item.src.includes("-fill");
    if (isAlreadyFilled) {
      // If already liked, remove the like
      item.src = item.src.replace("-fill", "");
    } else {
      // If not liked, add the like
      const dotIndex = item.src.lastIndexOf(".");
      item.src = item.src.slice(0, dotIndex) + "-fill" +
        item.src.slice(dotIndex);
    }
  });
});

// Select all reply buttons
const replies = document.querySelectorAll(".reply");
const replyText = document.querySelector(".reply-text");

// Function to position and display reply-text
function showReplyText(button) {
  if (replyText.style.display === "flex") {
    replyText.style.display = "none";
  } else {
    replyText.style.display = "flex";
  }
}

// Event listener for reply buttons
replies.forEach((reply) => {
  reply.addEventListener("click", function (e) {
    e.stopPropagation();
    showReplyText(this);
  });
});

// Event listener for the button inside reply-text (hides reply-text)
replyText.querySelector("button").addEventListener("click", function () {
  replyText.style.display = "none"; // Hide reply-text
});

// Hide reply-text when clicking outside
document.addEventListener("click", function (e) {
  if (!replyText.contains(e.target)) {
    replyText.style.display = "none"; // Hide reply-text if clicked outside
  }
});

// spoil
document.addEventListener("DOMContentLoaded", function () {
  // Get the width of the .post-comment element
  const postComment = document.querySelector(".post-comment");
  const spoil = document.querySelector(".spoil");

  if (postComment && spoil) {
    spoil.style.width = `${postComment.offsetWidth}px`;
  }

  // Update on window resize
  window.addEventListener("resize", function () {
    spoil.style.width = `${postComment.offsetWidth}px`;
  });
});
// spoil
const spoil = document.querySelectorAll(".spoil");
const spoilbtn = document.querySelectorAll(".spoilbtn");

spoilbtn.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    if (spoil[index]) {
      spoil[index].classList.add("none");
    }
  });
});
// View reply
document.addEventListener("DOMContentLoaded", () => {
  const viewReplyButtons = document.querySelectorAll(".view-reply");

  viewReplyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let currentElement = button.closest(".post-comment").nextElementSibling;
      let hasHiddenReplies = false;

      // Loop through all consecutive reply comments (w-90)
      while (currentElement && currentElement.classList.contains("w-90")) {
        currentElement.classList.toggle("none");
        if (!currentElement.classList.contains("none")) {
          hasHiddenReplies = true;
        }
        currentElement = currentElement.nextElementSibling;
      }

      // Update button text based on visibility
      button.textContent = hasHiddenReplies ? "Hide Replies" : "View Replies";
    });
  });
});

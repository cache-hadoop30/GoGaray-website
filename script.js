//Header Functionality

$(function () {
  var navbar = $(".header-inner");
  $(window).scroll(function () {
    if ($(window).scrollTop() <= 40) {
      navbar.removeClass("navbar-scroll");
    } else {
      navbar.addClass("navbar-scroll");
    }
  });
});

//------------------- Carousel - Top Destinations -------------------

//define variable carousel
const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

let firstImgWidth = firstImg.clientWidth + 14; //getting first img width and adading 14 margin value
let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //getting max scrollable width

//function showHideIcons
const showHideIcons = () => {
  //show and hide prev/next arrow icon according to carousel scroll left value
  arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  //If there is no image left to scroll then return from here
  if (carousel.scrollLeft >= scrollWidth) {
    if (!isMobileDevice()) {
      hideIcons();
    }
    return;
  }

  positionDiff = Math.abs((e.pageX || e.touches[0].pageX) - prevPageX);

  const valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // If user is scrolling to the right
    carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  } else {
    // If user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
};

const dragStart = (e) => {
  //prevent the default drag-and-drop behavior
  e.preventDefault();

  //updating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

//The image slides when mouse tap
const dragging = (e) => {
  //scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

// Add event listeners to handle mouse events
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop); // Add event listener for mouse leave to handle cases where the mouse leaves
carousel.addEventListener("mouseup", dragStop);

//Add event listeners to handle touch events
carousel.addEventListener("touchstart", (e) => {
  dragStart(e.touches[0]);
});
carousel.addEventListener("touchmove", (e) => {
  dragging(e.touches[0]);
});
carousel.addEventListener("touchend", dragStop);

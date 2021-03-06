// SUPPORT WOW.JS
wow = new WOW({
  mobile: false
});
wow.init();

// SIMPLEBAR
new SimpleBar(document.getElementById("areaForBtnThree"));
new SimpleBar(document.getElementById("areaForBtnFive"));

// GLOBAL VARIABLES
var navbar = document.getElementById("navbar");
var menuBtn = document.getElementById("menu-btn");
var crossBtn = document.getElementById("cross");
var secBtnWrapper = document.getElementById("sec-btn-wrapper");
var secButtons = document.getElementsByClassName("section-btn");
var areas = document.getElementsByClassName("area");
var carBGVideo = document.getElementById("car-bg-video");
var cVideoVol = document.getElementById("c-video-vol");
var downBtn = document.getElementById("downBtn");

// Getting the top scroll of the page
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

// Getting offset top of the areas
function elmYPosition(clickedId) {
  var areaOffset = document.getElementById("areaFor" + clickedId).offsetTop;
  return areaOffset;
}

// Smooth scrolling to the areas
function smoothScroll() {
  var startY = currentYPosition();
  var stopY = elmYPosition(this.id);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  // if (distance < 100) {
  //   scrollTo(0, stopY);
  //   return;
  // }

  var speed = Math.round(distance / 20);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
}

// Wheel Slider in small devices
var wheelSlider = function() {
  var box = document.querySelectorAll(".box-wrapper .item");

  if (window.innerWidth < 1200) {
    if (!$(".box-wrapper").hasClass("slick-initialized")) {
      $(".box-wrapper").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        arrows: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
      for (i = 0; i < box.length; i++) {
        box[i].classList.remove("col-lg-3");
      }
    }
  } else {
    if ($(".box-wrapper").hasClass("slick-initialized")) {
      $(".box-wrapper").slick("unslick");
      for (i = 0; i < box.length; i++) {
        box[i].classList.add("col-lg-3");
      }
    }
  }
};

// Filling the circle buttons with blue color
var btnFill = function() {
  for (i = 0; i < areas.length; i++) {
    var areaT = areas[i].getBoundingClientRect().top;
    var windowT = window.innerHeight;
    var areaY = Math.round((areaT * 100) / windowT);
    if (areaY > -50 && areaY < 50) {
      var btnId = areas[i].id.replace("areaFor", "");
      for (i = 0; i < secButtons.length; i++) {
        secButtons[i].style.cssText = "background-color:#ffffff;border:none";
        document.getElementById(btnId).style.cssText =
          "background-color:#0099ff;border: 2px solid #ffffff";
      }
    }
  }
};

// Scrolling page by down button
var scrollWithDownBtn = function() {
  for (i = 0; i < areas.length; i++) {
    var areaT = areas[i].getBoundingClientRect().top;
    if (areaT > 0) {
      var btnId = areas[i].id.replace("areaFor", "");
      document.getElementById(btnId).click();
      return;
    }
  }
};

// Scrolling page by keyboard's keys
var scrollWithKeyboardKey = function(event) {
  var keyName = event.key;
  var downBtnDisplay = downBtn.style.display;
  if (downBtnDisplay != "none") {
    if (keyName == "ArrowDown" || keyName == "PageDown") {
      downBtn.click();
    } else if (keyName == "ArrowUp" || keyName == "PageUp") {
      for (i = areas.length - 1; i >= 0; i--) {
        var areaB = areas[i].getBoundingClientRect().top;
        if (areaB < 0) {
          var btnId = areas[i].id.replace("areaFor", "");
          document.getElementById(btnId).click();
          return;
        }
      }
    }
  }
};

// Scrolling page by mousewheel
var scrollWithMouseWheel = function(event) {
  var delta;

  if (event.wheelDelta) {
    delta = event.wheelDelta;
  } else {
    delta = -1 * event.deltaY;
  }

  var downBtnDisplay = downBtn.style.display;

  if (downBtnDisplay != "none") {
    if (delta < 0) {
      downBtn.click();
    } else if (delta > 0) {
      for (i = areas.length - 1; i >= 0; i--) {
        var areaB = areas[i].getBoundingClientRect().top;
        if (areaB < 0) {
          var btnId = areas[i].id.replace("areaFor", "");
          document.getElementById(btnId).click();
          return;
        }
      }
    }
  }
};

// Removing the down button when the page is scrolled to the bottom
var btnOut = function() {
  if (window.innerWidth >= 768) {
    var scrollBottom =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      window.innerHeight;
    if (scrollBottom == 0) {
      downBtn.style.cssText = "right:-100%;bottom:-100%";
    } else {
      downBtn.style.cssText = "right:10px;bottom:10px";
    }
  } else {
    downBtn.style.cssText = "display:none";
  }
};

// CONTROLLING BACKGROUND VIDEO
var controllingBGVideo = function() {
  if (cVideoVol.classList.contains("fa-volume-off")) {
    cVideoVol.classList.remove("fa-volume-off");
    cVideoVol.classList.add("fa-volume-up");
  } else {
    cVideoVol.classList.remove("fa-volume-up");
    cVideoVol.classList.add("fa-volume-off");
  }

  if (carBGVideo.muted) {
    carBGVideo.muted = false;
  } else {
    carBGVideo.muted = true;
  }
};

var controllingBGVideo2 = function() {
  var areaT = areas[3].getBoundingClientRect().top;
  var windowT = window.innerHeight;
  var areaY = Math.round((areaT * 100) / windowT);
  if (areaY > -50 && areaY < 50) {
    carBGVideo.play();
  } else {
    carBGVideo.pause();
  }
};

// Refine layout on resize
var refineL = function() {
  for (i = 0; i < areas.length; i++) {
    var areaT = areas[i].getBoundingClientRect().top;
    var windowT = window.innerHeight;
    var areaY = Math.round((areaT * 100) / windowT);
    if (areaY > -50 && areaY < 50) {
      var btnId = areas[i].id.replace("areaFor", "");
      document.getElementById(btnId).click();
    }
  }
};

// Calling the functions
window.addEventListener("load", btnFill);
window.addEventListener("load", wheelSlider);
window.addEventListener("load", btnOut);

window.addEventListener("scroll", btnFill);
window.addEventListener("scroll", controllingBGVideo2);
window.addEventListener("scroll", btnOut);

window.addEventListener("resize", wheelSlider);
window.addEventListener("resize", btnOut);
window.addEventListener("resize", refineL);

for (i = 0; i < secButtons.length; i++) {
  secButtons[i].addEventListener("click", smoothScroll);
}
menuBtn.addEventListener("click", function() {
  document.getElementById("mobile-menu").style.cssText =
    "visibility:visible;opacity:1";
});
crossBtn.addEventListener("click", function() {
  document.getElementById("mobile-menu").style.cssText =
    "opacity:0;visibility:hidden";
});
cVideoVol.addEventListener("click", controllingBGVideo);
downBtn.addEventListener("click", scrollWithDownBtn);

document.addEventListener("keydown", scrollWithKeyboardKey);
document.addEventListener("wheel", scrollWithMouseWheel);

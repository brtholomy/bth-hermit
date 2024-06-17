/**
 * Utils
 */

// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// addEventListener Helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

// Google Ads generated this.
function gtagConversionEventOutboundClick(url) {
    // Helper function to delay opening a URL until a gtag event is sent.
    // Call it in response to an action that should navigate to a URL.
    var callback = function () {
        if (typeof url === 'string') {
            window.location = url;
        }
    };
    gtag('event', 'conversion_event_outbound_click', {
        'event_callback': callback,
        'event_timeout': 2000,
        // added param:
        'url': url,
    });
    // NOTE: this will prevent default behavior, meaning not navigate.
    return false;
}

/**
 * Functions
 */

// Auto Hide Header
//
let header = document.getElementById('site-header');
let lastScrollPosition = window.pageYOffset;

const autoHideHeader = () => {
  let currentScrollPosition = Math.max(window.pageYOffset, 0);
  if (currentScrollPosition > lastScrollPosition + 150) {
    header.classList.remove('slideInDown');
    header.classList.add('slideOutUp');
  } else if (currentScrollPosition < lastScrollPosition - 150) {
    header.classList.remove('slideOutUp');
    header.classList.add('slideInDown');
  }
  lastScrollPosition = currentScrollPosition;
}

// Header menu toggles
//
let worksMenuVisible = false;

const toggleWorksMenu = () => {
  let worksMenu = document.getElementById('works-menu');
  if (infoMenuVisible == true) {
    toggleInfoMenu();
  }
  if (worksMenuVisible == false) {
    worksMenu.style.animationName = 'fadeIn';
    worksMenu.style.webkitAnimationName = 'fadeIn';
    worksMenu.style.display = 'block';
    worksMenuVisible = true;
  } else {
    worksMenu.style.animationName = 'fadeOut';
    worksMenu.style.webkitAnimationName = 'fadeOut'
    worksMenu.style.display = 'none';
    worksMenuVisible = false;
  }
}

let infoMenuVisible = false;

const toggleInfoMenu = () => {
  let infoMenu = document.getElementById('info-menu');
  if (worksMenuVisible == true) {
    toggleWorksMenu();
  }
  if (infoMenuVisible == false) {
    infoMenu.style.animationName = 'fadeIn';
    infoMenu.style.webkitAnimationName = 'fadeIn';
    infoMenu.style.display = 'block';
    infoMenuVisible = true;
  } else {
    infoMenu.style.animationName = 'fadeOut';
    infoMenu.style.webkitAnimationName = 'fadeOut'
    infoMenu.style.display = 'none';
    infoMenuVisible = false;
  }
}

// Listeners : actual function invocation

// see note in style.scss about this query breakpoint.
var desktop = window.matchMedia("(min-width: 800px)")

if (header !== null) {
  listen('#works-btn', "click", toggleWorksMenu);
  listen('#info-btn', "click", toggleInfoMenu);

  window.addEventListener('scroll', throttle(() => {

    // don't hide the header on desktop anymore.
    if (desktop.matches == false) {
      autoHideHeader();
    }

    if (worksMenuVisible == true) {
      toggleWorksMenu();
    }
    if (infoMenuVisible == true) {
      toggleInfoMenu();
    }
  }, 250));
}

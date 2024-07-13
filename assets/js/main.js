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

// Header menu toggles
//
let header = document.getElementById('site-header');

let worksMenuVisible = false;

const toggleWorksMenu = () => {

  let worksMenu = document.getElementById('menu');
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

// Listeners : actual function invocation

if (header !== null) {
  listen('#menu-btn', "click", toggleWorksMenu);

  window.addEventListener('scroll', throttle(() => {

    if (worksMenuVisible == true) {
      toggleWorksMenu();
    }
  }, 250));
}

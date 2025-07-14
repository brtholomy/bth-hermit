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

const toggleTheme = () => {
    let link = document.getElementById('theme-link');

    let theme_current = link.getAttribute('data-current-theme');
    let theme_set = link.getAttribute('data-set-theme');
    let theme_light = link.getAttribute('data-light-theme');

    // we can't just use the href as key for the if block because it's fingerprinted.
    let theme_set_href = link.getAttribute('data-set-theme-path');
    let theme_light_href = link.getAttribute('data-light-theme-path');

    let theme_set_integ = link.getAttribute('data-set-integrity');
    let theme_light_integ = link.getAttribute('data-light-integrity');

    if (theme_current == theme_set) {
        link.setAttribute('data-current-theme', theme_light);
        link.setAttribute('integrity', theme_light_integ);
        link.setAttribute('href', theme_light_href);
    } else {
        link.setAttribute('data-current-theme', theme_set);
        link.setAttribute('integrity', theme_set_integ);
        link.setAttribute('href', theme_set_href);
    }
}

// Listeners : actual function invocation

if (header !== null) {
  listen('#menu-btn', "click", toggleWorksMenu);
  listen('#theme-toggle-btn', "click", toggleTheme);

  window.addEventListener('scroll', throttle(() => {

    if (worksMenuVisible == true) {
      toggleWorksMenu();
    }
  }, 250));
}

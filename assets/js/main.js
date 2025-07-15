/**
 * Utils
 */

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

let header = document.getElementById('site-header');
if (header !== null) {
  listen('#theme-toggle-btn', "click", toggleTheme);
}

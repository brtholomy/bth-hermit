const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

const toggleTheme = () => {
    let link = document.getElementById('light-theme-link');
    link.disabled = !link.disabled;
    // store state for theme-fetch.html:
    var isDarkTheme = link.disabled;
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

let header = document.getElementById('site-header');
if (header !== null) {
  listen('#theme-toggle-btn', "click", toggleTheme);
}

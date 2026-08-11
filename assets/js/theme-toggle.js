// toggles in both localStorage and on root.classList
document.getElementById('theme-toggle-btn').addEventListener('click', function() {
    var root = document.documentElement;
    var isLight = root.classList.contains('light');
    if (isLight) {
        root.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    } else {
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
});

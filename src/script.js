// script.js

// Load the saved mode from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }
    updateModeIcon();
});

function toggleMode() {
    const root = document.documentElement;

    // Toggle the 'dark-mode' class on the root element
    root.classList.toggle('dark-mode');

    // Save the current mode to localStorage
    const mode = root.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('mode', mode);

    // Update the mode icon
    updateModeIcon();
}

function updateModeIcon() {
    const modeIcon = document.getElementById('mode-icon');
    const isDarkMode = document.documentElement.classList.contains('dark-mode');

    if (isDarkMode) {
        modeIcon.classList.remove('bi-sun');
        modeIcon.classList.add('bi-moon');
        modeIcon.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
        modeIcon.classList.remove('bi-moon');
        modeIcon.classList.add('bi-sun');
        modeIcon.setAttribute('aria-label', 'Switch to Dark Mode');
    }
}

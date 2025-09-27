// Theme system using DaisyUI's built-in functionality
(function() {
  const LIGHT_THEME = 'nick-light';
  const DARK_THEME = 'nick-dark';

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme === DARK_THEME || savedTheme === LIGHT_THEME
      ? savedTheme
      : LIGHT_THEME;

    document.documentElement.setAttribute('data-theme', initialTheme);

    const checkbox = document.querySelector('.theme-controller');
    if (checkbox) {
      checkbox.checked = initialTheme === DARK_THEME;
    }
  }

  function handleThemeChange(event) {
    if (event.target.matches('.theme-controller')) {
      const newTheme = event.target.checked ? DARK_THEME : LIGHT_THEME;
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }

  function handlePageSwap(event) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    event.newDocument.documentElement.setAttribute('data-theme', currentTheme);

    const checkbox = event.newDocument.querySelector('.theme-controller');
    if (checkbox) {
      checkbox.checked = currentTheme === DARK_THEME;
    }
  }

  document.addEventListener('DOMContentLoaded', initTheme);
  document.addEventListener('change', handleThemeChange);
  document.addEventListener('astro:before-swap', handlePageSwap);
})();

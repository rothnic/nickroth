// Theme system using DaisyUI's built-in functionality
(function() {
  // Initialize theme on page load
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Sync checkbox state
    const checkbox = document.querySelector('.theme-controller');
    if (checkbox) {
      checkbox.checked = savedTheme === 'dark';
    }
  }

  // Handle theme changes
  function handleThemeChange(event) {
    if (event.target.matches('.theme-controller')) {
      const newTheme = event.target.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }

  // Theme persistence across page navigations
  function handlePageSwap(event) {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    event.newDocument.documentElement.setAttribute("data-theme", currentTheme);
    
    // Sync checkbox state in new document
    const checkbox = event.newDocument.querySelector('.theme-controller');
    if (checkbox) {
      checkbox.checked = currentTheme === 'dark';
    }
  }

  // Set up event listeners
  document.addEventListener('DOMContentLoaded', initTheme);
  document.addEventListener('change', handleThemeChange);
  document.addEventListener('astro:before-swap', handlePageSwap);
})();
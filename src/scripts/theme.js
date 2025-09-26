// Theme persistence across page navigations
document.addEventListener("astro:before-swap", (event) => {
  const currentTheme = document.documentElement.getAttribute("data-theme") || 
                      localStorage.getItem("color-scheme") || "light";
  event.newDocument.documentElement.setAttribute("data-theme", currentTheme);
});

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("color-scheme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
});

// Handle theme toggle
document.addEventListener("change", (event) => {
  if (event.target.matches('[data-toggle-theme]')) {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("color-scheme", newTheme);
  }
});
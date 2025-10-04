// Deep linking support for timeline phases
// Opens and scrolls to phase when URL contains #phase-slug

document.addEventListener('DOMContentLoaded', () => {
  // Check if there's a hash in the URL
  if (window.location.hash) {
    const phaseId = window.location.hash.substring(1); // Remove the # character
    const phaseElement = document.getElementById(phaseId);
    
    if (phaseElement) {
      // Open the details element if it's closed
      const detailsElement = phaseElement.querySelector('details');
      if (detailsElement && !detailsElement.open) {
        detailsElement.open = true;
      }
      
      // Scroll to the element with a small delay to ensure it's rendered
      setTimeout(() => {
        phaseElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
});

// Update URL hash when clicking on phase cards (for shareable links)
document.addEventListener('click', (event) => {
  const detailsElement = event.target.closest('details[id]');
  if (detailsElement) {
    // Only update hash if the details element is being opened
    if (!detailsElement.open) {
      const phaseId = detailsElement.id || detailsElement.closest('[id]')?.id;
      if (phaseId) {
        history.replaceState(null, '', `#${phaseId}`);
      }
    }
  }
});

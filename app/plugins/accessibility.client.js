// plugins/accessibility.client.js
export default defineNuxtPlugin({
  name: 'accessibility',
  setup() {
    // Add focus trap for modal dialogs
    const focusTrap = (element) => {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      element.addEventListener('keydown', handleTabKey);

      return () => {
        element.removeEventListener('keydown', handleTabKey);
      };
    };

    // Add skip link functionality
    const addSkipLink = () => {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'skip-link sr-only focus:not-sr-only';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
      `;
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    };

    // Add high contrast mode detection
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');
    const updateHighContrastMode = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };
    
    // Initialize
    if (process.client) {
      onMounted(() => {
        addSkipLink();
        prefersHighContrast.addEventListener('change', updateHighContrastMode);
        updateHighContrastMode(prefersHighContrast);
      });
    }

    return {
      provide: {
        focusTrap,
        addSkipLink
      }
    };
  }
});
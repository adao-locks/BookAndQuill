document.addEventListener('DOMContentLoaded', function() {
  const textField = document.getElementById('auto-save-field');
  const saveStatus = document.getElementById('save-status');

  // Load saved content when page loads
  textField.value = localStorage.getItem('savedText') || '';

  // Set up auto-save functionality
  let saveTimeout;

  textField.addEventListener('input', function() {
      // Clear previous timeout
      clearTimeout(saveTimeout);
      saveStatus.textContent = 'Typing...';

      // Set a new timeout to save after user stops typing for 500ms
      saveTimeout = setTimeout(function() {
          localStorage.setItem('savedText', textField.value);
          saveStatus.textContent = 'Saved at ' + new Date().toLocaleTimeString();

          // Reset status message after 3 seconds
          setTimeout(function() {
              if (saveStatus.textContent.startsWith('Saved at')) {
                  saveStatus.textContent = 'Ready';
              }
          }, 3000);
      }, 500);
  });

  // Also save when user leaves the page
  window.addEventListener('beforeunload', function() {
      localStorage.setItem('savedText', textField.value);
  });
});

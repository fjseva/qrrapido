import '@testing-library/jest-dom';

// Mock alert function globally
global.alert = () => {};

// Setup DOM helpers
beforeEach(() => {
  // Clear the document
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

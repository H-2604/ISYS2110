document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.main-btn');
  console.log('Buttons found:', buttons);

  // If you want to attach by button text:
  buttons.forEach(btn => {
    if (btn.textContent.includes('Login')) {
      btn.addEventListener('click', function() {
        window.location.href = '/login.html';
      });
    }
    if (btn.textContent.includes('Create Account')) {
      btn.addEventListener('click', function() {
        window.location.href = '/create-account.html';
      });
    }
  });
});

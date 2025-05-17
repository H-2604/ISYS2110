document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  document.querySelectorAll('.ca-eye').forEach(function(eye) {
    eye.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    });
  });

  // Handle form submission
  const form = document.querySelector('.ca-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const email = form.querySelector('input[type="text"]').value;
      const password = form.querySelector('input[type="password"]').value;

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Login successful! Welcome, ' + data.fullName);
          window.location.href = '/admin-dashboard.html';
        } else {
          alert(data.error || 'Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in');
      }
    });
  }
});

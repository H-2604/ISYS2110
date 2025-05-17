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
      
      const fullName = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const password = form.querySelector('input[type="password"]').value;
      const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

      // Validate passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const response = await fetch('/api/create-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Account created successfully!');
          window.location.href = '/index.html'; // Redirect to login page
        } else {
          alert(data.error || 'Failed to create account');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating your account');
      }
    });
  }
}); 
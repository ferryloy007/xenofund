// // auth.js
// // Make sure this file is linked in BOTH signup.html and login.html

// document.addEventListener('DOMContentLoaded', () => {
//   const signupForm = document.getElementById('signupForm');
//   const loginForm = document.getElementById('loginForm');

//   // === Handle Signup ===
//   if (signupForm) {
//     signupForm.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       const name = document.getElementById('name').value.trim();
//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value.trim();

//       try {
//         const res = await fetch('http://localhost:5000/api/register', {
//           // Change to your backend signup endpoint
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name, email, password }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           alert('Signup successful! Redirecting to login...');
//           window.location.href = 'login.html';
//         } else {
//           alert(data.message || 'Signup failed!');
//         }
//       } catch (err) {
//         console.error(err);
//         alert('Error connecting to server.');
//       }
//     });
//   }

//   // === Handle Login ===
//   if (loginForm) {
//     loginForm.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value.trim();

//       try {
//         const res = await fetch('http://localhost:5000/api/login', {
//           // Change to your backend login endpoint
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           alert('Login successful!');
//           localStorage.setItem('token', data.token); // Store token for auth
//           window.location.href = 'dashboard.html'; // Redirect after login
//         } else {
//           alert(data.message || 'Login failed!');
//         }
//       } catch (err) {
//         console.error(err);
//         alert('Error connecting to server.');
//       }
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  // Handle SIGNUP
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document
        .getElementById('confirmPassword')
        .value.trim();

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          alert('Signup successful!');
          window.location.href = 'login.html';
        } else {
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        console.error(err);
        alert('Error connecting to server');
      }
    });
  }

  // Handle LOGIN
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // Store token if your backend sends one
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          window.location.href = 'home.html';
        } else {
          console.error(data.message || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        console.error('Error connecting to server');
      }
    });
  }
});

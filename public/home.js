function getUserNameFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
  return payload.name;
}

document.addEventListener('DOMContentLoaded', () => {
  const name = getUserNameFromToken();
  if (name) {
    document.getElementById('greeting').textContent = `Hello ${name}`;
  } else {
    window.location.href = 'Xenova/public/home.html';
  }
});

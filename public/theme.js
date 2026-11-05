// The light/dark switch. The inline script in <head> picks the starting theme, from
// a saved choice or the system setting, so the page never flashes the wrong one.

const button = document.getElementById('theme');
const meta = document.querySelector('meta[name="theme-color"]');

function current() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  meta.content = theme === 'light' ? '#ffffff' : '#000000';
  const next = theme === 'light' ? 'dark' : 'light';
  button.textContent = next === 'light' ? 'Light' : 'Dark';
  button.setAttribute('aria-label', `Switch to ${next} mode`);
}

button.addEventListener('click', () => {
  const theme = current() === 'light' ? 'dark' : 'light';
  apply(theme);
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    // Private browsing can block storage. The switch still works for this visit.
  }
});

apply(current());
button.hidden = false;

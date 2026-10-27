'use strict';

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('open', expanded);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 25), { passive: true });
window.matchMedia('(min-width: 651px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const form = document.querySelector('#quote-form');
const success = document.querySelector('#form-success');
const serviceSelect = document.querySelector('#service-select');
function restoreForm() {
  success.hidden = true;
  form.hidden = false;
  document.querySelector('.form-heading').hidden = false;
}
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    restoreForm();
    serviceSelect.value = link.dataset.service;
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const nameField = form.elements.namedItem('name');
  const phoneField = form.elements.namedItem('phone');
  nameField.setCustomValidity(nameField.value.trim() ? '' : 'Please enter your name.');
  phoneField.setCustomValidity(phoneField.value.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number with at least 7 digits.');
  if (!form.reportValidity()) return;
  document.querySelector('#success-name').textContent = nameField.value.trim().split(/\s+/)[0];
  form.hidden = true;
  document.querySelector('.form-heading').hidden = true;
  success.hidden = false;
  form.reset();
  success.focus({ preventScroll: true });
  success.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
});
form.addEventListener('input', event => {
  if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
});
document.querySelector('#form-reset').addEventListener('click', () => {
  restoreForm();
  form.elements.namedItem('name').focus({ preventScroll: true });
});

document.querySelector('#year').textContent = new Date().getFullYear();

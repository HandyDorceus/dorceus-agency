// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    // Close menu when clicking on a nav link
    const navButtons = navLinks.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
      button.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Smooth scroll for CTA links pointing to #quote-form
  document.querySelectorAll('a[href="#quote-form"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById('quote-form');
      if (!target) return;
      var nav = document.querySelector('nav');
      var navHeight = nav ? nav.offsetHeight : 0;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  // Quote Form Validation
  var quoteForm = document.getElementById('quoteForm');
  var formMessage = document.getElementById('quoteFormMessage');

  if (quoteForm && formMessage) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous state
      formMessage.className = 'quote-form-message';
      formMessage.textContent = '';
      quoteForm.querySelectorAll('.error').forEach(function(el) {
        el.classList.remove('error');
      });

      var errors = [];
      var firstErrorField = null;

      // Required: first name
      var firstName = quoteForm.querySelector('#firstName');
      if (!firstName.value.trim()) {
        errors.push('First name is required.');
        firstName.classList.add('error');
        if (!firstErrorField) firstErrorField = firstName;
      }

      // Required: last name
      var lastName = quoteForm.querySelector('#lastName');
      if (!lastName.value.trim()) {
        errors.push('Last name is required.');
        lastName.classList.add('error');
        if (!firstErrorField) firstErrorField = lastName;
      }

      // Required: email + format
      var email = quoteForm.querySelector('#email');
      var emailValue = email.value.trim();
      if (!emailValue) {
        errors.push('Email is required.');
        email.classList.add('error');
        if (!firstErrorField) firstErrorField = email;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        errors.push('Please enter a valid email address.');
        email.classList.add('error');
        if (!firstErrorField) firstErrorField = email;
      }

      // Optional: phone format
      var phone = quoteForm.querySelector('#phone');
      var phoneValue = phone.value.trim();
      if (phoneValue && !/^[\d\s\-\(\)\+\.]+$/.test(phoneValue)) {
        errors.push('Please enter a valid phone number.');
        phone.classList.add('error');
        if (!firstErrorField) firstErrorField = phone;
      }

      if (errors.length > 0) {
        formMessage.className = 'quote-form-message error';
        formMessage.textContent = errors[0];
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Success
      formMessage.className = 'quote-form-message success';
      formMessage.textContent = 'Thank you! Your quote request has been submitted. We will contact you soon.';
      quoteForm.reset();
    });
  }
});

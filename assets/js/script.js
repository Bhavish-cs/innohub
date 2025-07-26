'use strict';

/**
 * add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * toggle navbar
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header active & back to top
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * Dark mode toggle
 */
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', function() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

/**
 * Animated Counter
 */
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current);
    
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
};

/**
 * Intersection Observer for counters
 */
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      
      // Only animate if not already animated
      if (!counter.classList.contains('animated')) {
        counter.classList.add('animated');
        animateCounter(counter, target);
      }
    }
  });
}, observerOptions);

// Observe all counter elements
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stats-number');
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
});

/**
 * Scroll Popup
 */
let hasScrolledOnce = false;
const scrollPopup = document.getElementById('scrollPopup');
const popupClose = document.getElementById('popupClose');

// Check if popup has been shown before
const popupShown = localStorage.getItem('popupShown');

window.addEventListener('scroll', function() {
  if (!hasScrolledOnce && !popupShown && window.scrollY > 50) {
    hasScrolledOnce = true;
    showPopup();
  }
});

function showPopup() {
  scrollPopup.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hidePopup() {
  scrollPopup.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
  localStorage.setItem('popupShown', 'true'); // Remember that popup was shown
}

// Close popup events
popupClose.addEventListener('click', hidePopup);

scrollPopup.addEventListener('click', function(e) {
  if (e.target === scrollPopup) {
    hidePopup();
  }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && scrollPopup.classList.contains('active')) {
    hidePopup();
  }
});

/**
 * Smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close popup if clicking on anchor link inside popup
      if (scrollPopup.classList.contains('active')) {
        hidePopup();
      }
    }
  });
});

/**
 * Enhanced scroll animations
 */
const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in animation to service cards and project cards
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.service-card, .project-card, .blog-card');
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
  });
});
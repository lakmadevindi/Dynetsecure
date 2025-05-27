// Responsive nav menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle && navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Dropdowns (close on click outside)
document.addEventListener('click', function(e) {
  document.querySelectorAll('.dropdown').forEach(drop => {
    if (!drop.contains(e.target)) {
      const menu = drop.querySelector('.dropdown-menu');
      if (menu) menu.style.display = '';
    }
  });
});

// Dropdown hover delay logic
(function() {
  var dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(function(dropdown) {
    var timeout;
    var menu = dropdown.querySelector('.dropdown-menu');
    dropdown.addEventListener('mouseenter', function() {
      clearTimeout(timeout);
      dropdown.classList.add('open');
      if (menu) menu.style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', function() {
      timeout = setTimeout(function() {
        dropdown.classList.remove('open');
        if (menu) menu.style.display = '';
      }, 250);
    });
    if (menu) {
      menu.addEventListener('mouseenter', function() {
        clearTimeout(timeout);
        dropdown.classList.add('open');
        menu.style.display = 'block';
      });
      menu.addEventListener('mouseleave', function() {
        timeout = setTimeout(function() {
          dropdown.classList.remove('open');
          menu.style.display = '';
        }, 500);
      });
    }
  });
})();

// Smooth scroll for nav links and scroll button
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navMenu) navMenu.classList.remove('open');
      }
    }
  });
});

// Hide hero scroll button after scrolling
const heroScrollBtn = document.querySelector('.hero-scroll-btn');
function toggleHeroScrollBtn() {
  if (!heroScrollBtn) return;
  if (window.scrollY > 40) {
    heroScrollBtn.classList.add('hide');
  } else {
    heroScrollBtn.classList.remove('hide');
  }
}
window.addEventListener('scroll', toggleHeroScrollBtn);
window.addEventListener('load', toggleHeroScrollBtn);

// Navbar active link highlight
function setActiveNav() {
  const sections = document.querySelectorAll('main section');
  const navItems = document.querySelectorAll('.nav-link');
  let index = sections.length;
  while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navItems.forEach(link => link.classList.remove('active'));
  if (sections[index]) {
    const id = sections[index].id;
    const activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
    if (activeLink) activeLink.classList.add('active');
  }
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Prevent form submission (demo only)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting DynetSecure! (Demo only)');
  });
}

// AOS animation init (already in HTML, but for safety)
if (window.AOS) {
  AOS.init({
    duration: 900,
    once: true,
    offset: 80
  });
}

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Scroll-triggered animation for Literature Survey section
function revealLiteratureSection() {
  const img = document.querySelector('.literature-animate-left');
  const text = document.querySelector('.literature-animate-right');
  if (!img || !text) return;
  const windowHeight = window.innerHeight;
  const imgTop = img.getBoundingClientRect().top;
  const textTop = text.getBoundingClientRect().top;
  if (imgTop < windowHeight - 80) {
    img.classList.add('visible');
  }
  if (textTop < windowHeight - 80) {
    text.classList.add('visible');
  }
}
window.addEventListener('scroll', revealLiteratureSection);
window.addEventListener('load', revealLiteratureSection);

// Optional: Floating effect for team cards on hover
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.animation = 'team-float 1.2s infinite alternate';
  });
  card.addEventListener('mouseleave', () => {
    card.style.animation = '';
  });
});

// --- Force AOS animation for Literature Survey when scrolling from top ---
(function() {
  const section = document.getElementById('literature-survey');
  let triggered = false;
  function triggerAOSForLiterature() {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Trigger when top of section is in viewport (with some offset)
    if (rect.top < windowHeight - 80 && rect.bottom > 0) {
      if (!triggered) {
        const aosElements = section.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
          el.classList.remove('aos-animate');
          void el.offsetWidth;
          el.classList.add('aos-animate');
        });
        triggered = true;
      }
    } else {
      triggered = false;
    }
  }
  window.addEventListener('scroll', triggerAOSForLiterature);
  window.addEventListener('load', triggerAOSForLiterature);
})();

// Accessibility: Add focus effect for problem cards/subtopics
const problemCards = document.querySelectorAll('.problem-card, .problem-subtopic');
problemCards.forEach(card => {
  card.addEventListener('focus', () => {
    card.style.boxShadow = '0 0 0 3px var(--accent), 0 8px 24px rgba(73,66,228,0.13)';
  });
  card.addEventListener('blur', () => {
    card.style.boxShadow = '';
  });
});

// The JS will be updated to handle dropdowns, smooth scroll, scroll-down button, scroll-triggered animations, navbar active link, tech logo hover/rotation, and initialize animation libraries. 
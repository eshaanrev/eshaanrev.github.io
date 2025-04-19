// Particles background
window.onload = function() {
  Particles.init({
    selector: '#particles-canvas',
    color: ['#7f5af0', '#ff8906', '#fffffe'],
    connectParticles: true,
    responsive: [
      {
        breakpoint: 768,
        options: {
          maxParticles: 80,
          connectParticles: false
        }
      }
    ]
  });
};

// Glow effect following cursor
document.addEventListener('mousemove', function(e) {
  // Create or get glow element
  let glow = document.querySelector('.glow');
  if (!glow) {
    glow = document.createElement('div');
    glow.classList.add('glow');
    document.body.appendChild(glow);
  }
  
  // Position glow at cursor
  glow.style.left = (e.pageX - 100) + 'px';
  glow.style.top = (e.pageY - 100) + 'px';
});

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

themeToggle.addEventListener('click', () => {
  if (isDarkMode) {
    // Switch to light mode
    document.documentElement.style.setProperty('--background', '#fffffe');
    document.documentElement.style.setProperty('--secondary', '#f2f4f6');
    document.documentElement.style.setProperty('--text', '#0f0e17');
    document.documentElement.style.setProperty('--paragraph', '#2e2f3e');
    document.documentElement.style.setProperty('--card-bg', 'rgba(242, 244, 246, 0.7)');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    // Switch to dark mode
    document.documentElement.style.setProperty('--background', '#0f0e17');
    document.documentElement.style.setProperty('--secondary', '#121212');
    document.documentElement.style.setProperty('--text', '#fffffe');
    document.documentElement.style.setProperty('--paragraph', '#a7a9be');
    document.documentElement.style.setProperty('--card-bg', 'rgba(32, 32, 42, 0.7)');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
  
  isDarkMode = !isDarkMode;
});

// Reveal animations for sections
const observerOptions = {
  threshold: 0.1 
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  observer.observe(section);
});
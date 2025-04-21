// Glow effect 
document.addEventListener('mousemove', function(e) {
  let glow = document.querySelector('.glow');
  if (!glow) {
    glow = document.createElement('div');
    glow.classList.add('glow');
    document.body.appendChild(glow);
  }
  
  glow.style.left = (e.pageX - 100) + 'px';
  glow.style.top = (e.pageY - 100) + 'px';
});

// Smooth scroll
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

// Reveal animations 
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
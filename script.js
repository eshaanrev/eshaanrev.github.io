// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  // Observe sections for scroll animations
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navigation background on scroll
function initNavScroll() {
  const nav = document.querySelector('.main-nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 10, 10, 0.8)';
    }
  });
}

// Theme toggle functionality (placeholder for future implementation)
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', () => {
    // Future: implement light/dark theme toggle
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
  });
}

// Stagger animations for cards
function initStaggerAnimations() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.03}s`;
  });
}

// Parallax effect for floating cards
function initParallax() {
  const floatingCards = document.querySelectorAll('.floating-card');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingCards.forEach((card, index) => {
      const speed = 0.5 + (index * 0.2);
      card.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Typing animation for hero title
function initTypingAnimation() {
  const titleLines = document.querySelectorAll('.title-line');
  
  titleLines.forEach((line, index) => {
    // Animation is now handled by CSS
    line.style.animationDelay = `${index * 0.3}s`;
  });
}

// Mouse movement effect for hero visual
function initMouseEffect() {
  const heroVisual = document.querySelector('.hero-visual');
  const floatingCards = document.querySelectorAll('.floating-card');
  
  if (heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      floatingCards.forEach((card, index) => {
        const intensity = 10 + (index * 5);
        const moveX = (x - 0.5) * intensity;
        const moveY = (y - 0.5) * intensity;
        
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
    
    heroVisual.addEventListener('mouseleave', () => {
      floatingCards.forEach(card => {
        card.style.transform = 'translate(0, 0)';
      });
    });
  }
}

// Project card hover effects
function initProjectCardEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const techTags = card.querySelectorAll('.tech-tag');
      techTags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-2px) scale(1.05)';
        }, index * 30);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      const techTags = card.querySelectorAll('.tech-tag');
      techTags.forEach(tag => {
        tag.style.transform = 'translateY(0) scale(1)';
      });
    });
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSmoothScroll();
  initNavScroll();
  initThemeToggle();
  initStaggerAnimations();
  initTypingAnimation();
  initMouseEffect();
  initProjectCardEffects();
  
  // Only add parallax on larger screens to avoid performance issues
  if (window.innerWidth > 768) {
    initParallax();
  }
});

// Handle resize events
window.addEventListener('resize', () => {
  // Reinitialize parallax based on screen size
  if (window.innerWidth <= 768) {
    window.removeEventListener('scroll', initParallax);
  }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll-heavy functions
const throttledParallax = throttle(initParallax, 16); // ~60fps
window.addEventListener('scroll', throttledParallax);
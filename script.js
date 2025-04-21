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




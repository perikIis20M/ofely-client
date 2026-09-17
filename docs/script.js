document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
}, { threshold: 0.22 });

document.querySelectorAll('.product').forEach((item, index) => {
  item.style.transitionDelay = `${index * 110}ms`;
  observer.observe(item);
});

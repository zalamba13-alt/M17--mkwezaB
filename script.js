document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-right, .timeline-item, .project-card, .skill-tag, .glass-card').forEach(el => {
    observer.observe(el);
  });

  // Stagger skill tags
  document.querySelectorAll('.skill-tag').forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 0.08}s`;
  });

  // Stagger timeline
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.12}s`;
  });

  // Scroll to top
  const scrollTop = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTop.classList.add('show');
    } else {
      scrollTop.classList.remove('show');
    }
  }, { passive: true });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.log('✨ Premium resume loaded');
});
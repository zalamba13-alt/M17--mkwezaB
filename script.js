document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth-scroll only when the visitor has not asked for reduced motion.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  const animatedElements = document.querySelectorAll(
    '.reveal, .reveal-right, .timeline-item, .project-card, .skill-tag, .glass-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatedElements.forEach((element) => observer.observe(element));
  } else {
    animatedElements.forEach((element) => element.classList.add('active'));
  }

  // Stagger skill and achievement reveals.
  document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.transitionDelay = `${index * 0.08}s`;
  });

  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.12}s`;
  });

  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    const updateScrollTopVisibility = () => {
      scrollTop.classList.toggle('show', window.scrollY > 400);
    };

    window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
    updateScrollTopVisibility();

    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // Certificate lightbox
  const lightbox = document.getElementById('certLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  const openLightbox = (imgSrc, caption) => {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.cert-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      openLightbox(thumb.dataset.certImg, thumb.dataset.certTitle);
    });
  });

  document.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
});

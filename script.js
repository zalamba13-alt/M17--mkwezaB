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

  // Certificate carousel
  const carousel = document.getElementById('certCarousel');
  if (carousel) {
    const track = carousel.querySelector('.cert-track');
    const cards = Array.from(track.children);
    const dotsWrap = carousel.querySelector('.cert-dots');
    let currentIndex = 0;

    if (prefersReducedMotion) {
      track.style.transition = 'none';
    }

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'cert-dot';
      dot.setAttribute('aria-label', `Go to certificate ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    const goTo = (index) => {
      currentIndex = Math.max(0, Math.min(index, cards.length - 1));
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    };

    carousel.querySelector('.cert-prev').addEventListener('click', () => goTo(currentIndex - 1));
    carousel.querySelector('.cert-next').addEventListener('click', () => goTo(currentIndex + 1));

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(currentIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(currentIndex + 1);
      }
    });

    goTo(0);
  }

  // Active nav link on scroll
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const spySections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (spySections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });

    spySections.forEach((section) => spy.observe(section));
  }
});

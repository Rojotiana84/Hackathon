    // ===== Scroll animations =====
    const sections = document.querySelectorAll('section, .hero h1, .hero p, .hero button');
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Header background change
      if(scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');

      // Animate sections
      sections.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 100){
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        }
      });

      // Parallax effect
      const parallaxEls = document.querySelectorAll('[data-speed]');
      parallaxEls.forEach(el => {
        const speed = el.getAttribute('data-speed');
        const y = scrollY * speed;
        el.style.transform = `translateY(${y}px)`;
      });
    });
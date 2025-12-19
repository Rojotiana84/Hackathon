// js/index.js
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Intersection Observer pour animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer les éléments avec animation
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect pour les formes géométriques
    const shapes = document.querySelectorAll('.circle, .square');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed')) || 0.05;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;

            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });

    // Counter animation pour les statistiques
    const statNumbers = document.querySelectorAll('.stat-item h3');

    statNumbers.forEach(stat => {
        const originalText = stat.textContent;
        const number = parseInt(originalText);

        if (!isNaN(number)) {
            stat.textContent = '0';

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounter(stat, number);
                    observer.disconnect();
                }
            }, { threshold: 0.5 });

            observer.observe(stat);
        }
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    // Smooth scroll pour ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Effet de chargement
    const loader = document.createElement('div');
    loader.className = 'loader-container';
    loader.innerHTML = `
        <div class="loader"></div>
        <div class="loader-text">ICJ Mada</div>
    `;

    document.body.appendChild(loader);

    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);

    // Hover effect pour les cartes
    const cards = document.querySelectorAll('.feature-card, .stat-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
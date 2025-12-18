// 1. Initialisation de AOS (Animations au scroll)
AOS.init({
    duration: 1000,
    once: true
});

// 2. Animation des compteurs
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 20);
        } else {
            counter.innerText = target + "+";
        }
    });
};

// Lancer l'animation quand on arrive à la section stats
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        animateCounters();
    }
}, { threshold: 0.5 });

observer.observe(statsSection);

// 3. Petit effet de bulles interactives dans le Hero
const container = document.getElementById('particles-container');

for (let i = 0; i < 20; i++) {
    const bubble = document.createElement('div');
    bubble.style.position = 'absolute';
    bubble.style.width = Math.random() * 50 + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.background = 'rgba(255, 255, 255, 0.2)';
    bubble.style.borderRadius = '50%';
    bubble.style.top = Math.random() * 100 + '%';
    bubble.style.left = Math.random() * 100 + '%';
    
    container.appendChild(bubble);
    
    // Animation simple
    bubble.animate([
        { transform: 'translateY(0) scale(1)', opacity: 0.5 },
        { transform: `translateY(-100px) scale(1.2)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        iterations: Infinity
    });
}
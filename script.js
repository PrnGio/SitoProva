document.addEventListener('DOMContentLoaded', () => {

    // --- GESTIONE MENU HAMBURGER PER MOBILE ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- GESTIONE LINK ATTIVO NELLA NAVIGAZIONE ---
    const currentPageUrl = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href').split("/").pop();
        // L'homepage può essere '' o 'index.html'
        if ((currentPageUrl === '' || currentPageUrl === 'index.html') && linkUrl === 'index.html') {
            link.classList.add('active');
        } else if (linkUrl === currentPageUrl && linkUrl !== 'index.html') {
            link.classList.add('active');
        }
    });


    // --- ANIMAZIONE SEZIONI ON SCROLL ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- ANIMAZIONE CONTATORI NUMERICI (SOLO SE PRESENTI) ---
    const counterSection = document.querySelector('.stats-counter');
    if (counterSection) {
        let countersAnimated = false;

        const startCounters = () => {
            if (countersAnimated) return;
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                counter.innerText = '0';
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const stepTime = 20;
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            countersAnimated = true;
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counterSection);
    }
});
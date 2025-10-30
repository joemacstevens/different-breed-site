document.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) {
        return;
    }

    const words = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.innerHTML = words
        .map(word => `<span class="hero-word"><span>${word}</span></span>`)
        .join(' ');

    const wordInnerSpans = heroTitle.querySelectorAll('.hero-word span');
    if (!wordInnerSpans.length) {
        return;
    }

    gsap.set(wordInnerSpans, { yPercent: 120, opacity: 0, display: 'inline-block' });

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

    timeline
        .from('.badge', { opacity: 0, y: -10, duration: 0.5 })
        .fromTo(wordInnerSpans, { yPercent: 120, opacity: 0 }, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1
        }, '-=0.1')
        .from('.hero .subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.1')
        .from('.hero .hero-price', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero .hero-details', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero .cta-group', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4');

    const learnMoreLink = document.querySelector('.cta-group .btn-secondary[href="#details"]');
    const detailsSection = document.querySelector('#details');

    if (learnMoreLink && detailsSection) {
        learnMoreLink.addEventListener('click', function (event) {
            event.preventDefault();
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const registerDropdowns = Array.from(document.querySelectorAll('.cta-dropdown'));

    if (registerDropdowns.length) {
        const closeDropdown = (dropdown) => {
            dropdown.classList.remove('is-open');
            const toggleButton = dropdown.querySelector('.dropdown-toggle');
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        };

        const openDropdown = (dropdown) => {
            dropdown.classList.add('is-open');
            const toggleButton = dropdown.querySelector('.dropdown-toggle');
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'true');
            }
        };

        const closeAllDropdowns = () => {
            registerDropdowns.forEach(closeDropdown);
        };

        registerDropdowns.forEach((dropdown) => {
            const toggleButton = dropdown.querySelector('.dropdown-toggle');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');

            if (!toggleButton || !dropdownMenu) {
                return;
            }

            toggleButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const isOpen = dropdown.classList.contains('is-open');
                closeAllDropdowns();
                if (!isOpen) {
                    openDropdown(dropdown);
                }
            });

            dropdownMenu.addEventListener('click', (event) => {
                const optionLink = event.target.closest('.dropdown-link');
                if (optionLink) {
                    closeAllDropdowns();
                }
            });
        });

        document.addEventListener('click', (event) => {
            const clickedInside = registerDropdowns.some((dropdown) => dropdown.contains(event.target));
            if (!clickedInside) {
                closeAllDropdowns();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeAllDropdowns();
            }
        });
    }
});

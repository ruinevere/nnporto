document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const iconMoon = themeToggleButton ? themeToggleButton.querySelector('.icon-moon') : null;
    const iconSun = themeToggleButton ? themeToggleButton.querySelector('.icon-sun') : null;

    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            if (iconMoon) iconMoon.style.display = 'none';
            if (iconSun) iconSun.style.display = 'inline';
        } else {
            if (iconMoon) iconMoon.style.display = 'inline';
            if (iconSun) iconSun.style.display = 'none';
        }
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Tab Switching & Pagination for Projects ---
    const projectsPerPage = 3;
    let currentPage = 1;
    let currentProjectCards = [];
    let totalPages = 1;

    const tabButtons = document.querySelectorAll('.project-tabs .tab-button');
    const tabContents = document.querySelectorAll('.projects-grid-container .tab-content');
    const prevPageButton = document.getElementById('prevPageButton');
    const nextPageButton = document.getElementById('nextPageButton');
    const pageInfo = document.getElementById('pageInfo');
    const paginationControls = document.getElementById('paginationControls');

    function displayProjects() {
        if (!currentProjectCards.length) return;
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        let visibleCardDelay = 0;

        currentProjectCards.forEach((card, index) => {
            card.classList.remove('visible');
            card.style.transitionDelay = '0ms';

            if (index >= startIndex && index < endIndex) {
                card.style.display = 'flex';
                if (!card.classList.contains('fade-in')) {
                    card.classList.add('fade-in');
                }
                setTimeout(() => {
                    card.style.transitionDelay = `${visibleCardDelay * 100}ms`;
                    card.classList.add('visible');
                    visibleCardDelay++;
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });

        if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        if (prevPageButton) prevPageButton.disabled = currentPage === 1;
        if (nextPageButton) nextPageButton.disabled = currentPage === totalPages || totalPages === 0;
    }

    function setupPaginationForActiveTab() {
        currentPage = 1;
        const activeTabContent = document.querySelector('.tab-content.active');
        if (!activeTabContent) {
            if (paginationControls) paginationControls.style.display = 'none';
            return;
        }
        const activeGrid = activeTabContent.querySelector('.projects-grid');
        if (!activeGrid) {
            if (paginationControls) paginationControls.style.display = 'none';
            return;
        }
        
        currentProjectCards = Array.from(activeGrid.querySelectorAll('.project-card'));
        const totalProjects = currentProjectCards.length;
        totalPages = Math.ceil(totalProjects / projectsPerPage);
        
        if (totalPages <= 1) {
            if (paginationControls) paginationControls.style.display = 'none';
        } else {
            if (paginationControls) paginationControls.style.display = 'flex';
        }
        displayProjects();
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabName + '-tab-content') {
                    content.classList.add('active');
                }
            });
            setupPaginationForActiveTab();
        });
    });

    if (prevPageButton) {
        prevPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProjects();
            }
        });
    }

    if (nextPageButton) {
        nextPageButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayProjects();
            }
        });
    }

    // --- Observers for Animations ---
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const generalFadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in:not(.project-card)').forEach(el => {
        generalFadeInObserver.observe(el);
    });

    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBarFill = entry.target.querySelector('.skill-bar-fill');
                if (skillBarFill) {
                    skillBarFill.style.width = (skillBarFill.dataset.skillLevel || '0') + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item-interactive').forEach(item => {
        skillBarObserver.observe(item);
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                const navbarHeight = document.querySelector('nav')?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- Footer Year Update ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- Initial Setup ---
    if (tabButtons.length > 0) {
        setupPaginationForActiveTab();
    }
});

const heroImage = document.getElementById('hero-image');
const heroImages = [
  'image/first.png',
  'image/second.png',
  'image/third.png',
];
let currentHeroIndex = 0;

// Initial style setup
heroImage.style.transition = 'opacity 0.6s ease-in-out';
heroImage.style.opacity = 1;

setInterval(() => {
  // Fade out
  heroImage.style.opacity = 0;

  // Wait for fade-out before changing src
  setTimeout(() => {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    heroImage.src = heroImages[currentHeroIndex];

    // Fade in
    heroImage.style.opacity = 1;
  }, 600); // match transition duration
}, 4000); // interval between transitions

 const toggle = document.querySelector('.nav-toggle');
 const navLinks = document.querySelector('.nav-links');

 toggle.addEventListener('click', () => {
 navLinks.classList.toggle('open');
 });
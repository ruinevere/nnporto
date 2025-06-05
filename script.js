document.addEventListener('DOMContentLoaded', function() {
    // --- Tab Switching for Projects ---
    const tabButtons = document.querySelectorAll('.project-tabs .tab-button');
    const tabContents = document.querySelectorAll('.projects-grid-container .tab-content');

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

    // --- Pagination for Projects (Tab-aware) ---
    const projectsPerPage = 3; // Show 3 projects per page
    let currentPage = 1;
    let currentProjectCards = [];
    let totalPages = 1;

    const prevPageButton = document.getElementById('prevPageButton');
    const nextPageButton = document.getElementById('nextPageButton');
    const pageInfo = document.getElementById('pageInfo');
    const paginationControls = document.getElementById('paginationControls');

    function setupPaginationForActiveTab() {
        currentPage = 1; 
        const activeTabContent = document.querySelector('.tab-content.active');
        if (!activeTabContent) {
            if(paginationControls) paginationControls.style.display = 'none';
            return;
        }
        const activeGrid = activeTabContent.querySelector('.projects-grid');
        if (!activeGrid) {
             if(paginationControls) paginationControls.style.display = 'none';
            return;
        }
        
        currentProjectCards = Array.from(activeGrid.getElementsByClassName('project-card'));
        const totalProjects = currentProjectCards.length;
        totalPages = Math.ceil(totalProjects / projectsPerPage);
        
        if (totalPages <= 1) {
            if(paginationControls) paginationControls.style.display = 'none';
        } else {
            if(paginationControls) paginationControls.style.display = 'flex';
        }
        displayProjects(); // This will also handle initial staggering for the active tab's cards
    }

    function displayProjects() {
        if (currentProjectCards.length === 0) {
             // Optionally display a message if the grid is empty
            const activeGrid = document.querySelector('.tab-content.active .projects-grid');
            if(activeGrid && activeGrid.innerHTML.trim() === '') { // Check if grid is truly empty or just cards hidden
                 // activeGrid.innerHTML = "<p class='text-secondary' style='text-align:center;'>No projects in this category yet.</p>";
            }
            return;
        }
        
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        let visibleCardDelay = 0; // For staggering visible cards

        currentProjectCards.forEach((card, index) => {
            // Reset states for all cards in the current tab before applying pagination
            card.classList.remove('visible');
            card.style.transitionDelay = '0ms';

            if (index >= startIndex && index < endIndex) {
                card.style.display = 'flex'; 
                // Stagger animation for cards being displayed on this page
                // Ensure .fade-in class is on the card for CSS to pick up initial state
                if (!card.classList.contains('fade-in')) {
                    card.classList.add('fade-in');
                }
                setTimeout(() => { // Apply delay and visibility
                    card.style.transitionDelay = `${visibleCardDelay * 100}ms`;
                    card.classList.add('visible');
                    visibleCardDelay++;
                }, 50); // Small timeout to ensure styles apply correctly for transition

            } else {
                card.style.display = 'none';
            }
        });

        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        }
        if (prevPageButton) {
            prevPageButton.disabled = currentPage === 1;
        }
        if (nextPageButton) {
            nextPageButton.disabled = currentPage === totalPages || totalPages === 0;
        }
    }

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

    // --- Intersection Observer for general .fade-in elements (non-project cards) ---
    const generalFadeInObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const generalFadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if it's a project card, those are handled by displayProjects
                if (!entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('visible');
                }
                // Unobserve general elements after they become visible if not project cards
                // Project cards are not observed by this one anyway
                if (!entry.target.classList.contains('project-card')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, generalFadeInObserverOptions);

    // Apply to general .fade-in elements, excluding project cards
    document.querySelectorAll('.fade-in:not(.project-card)').forEach(el => {
        generalFadeInObserver.observe(el);
    });

    // --- Interactive Skill Bar Animation ---
    const skillBarObserverOptions = {
        threshold: 0.5,
    };
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBarFill = entry.target.querySelector('.skill-bar-fill');
                if (skillBarFill) {
                    const level = skillBarFill.dataset.skillLevel || '0';
                    skillBarFill.style.width = level + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, skillBarObserverOptions);

    document.querySelectorAll('.skill-item-interactive').forEach(item => {
        skillBarObserver.observe(item);
    });

    // --- Smooth Scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('nav')?.offsetHeight || 70; 
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Footer Year Update ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Initial setup for the default active tab's pagination and project card animations
    setupPaginationForActiveTab();
});
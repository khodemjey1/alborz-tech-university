document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // --- Dark/Light Mode Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('theme');

    // Apply stored theme on load
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.querySelector('i').className = 'fa-solid fa-sun';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Toggle icon
            themeToggle.querySelector('i').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });
    }

    // --- Course Page Reactive Filter and Search ---
    const courseSearch = document.getElementById('courseSearch');
    const filterContainer = document.getElementById('filterContainer');
    const coursesContainer = document.getElementById('coursesContainer');
    const noResults = document.getElementById('noResults');

    if (coursesContainer) {
        const courseCards = coursesContainer.querySelectorAll('.course-card');
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');

        let activeFilter = 'all';
        let searchQuery = '';

        // Check if there is an initial filter in URL query parameter (e.g. ?filter=it)
        const urlParams = new URLSearchParams(window.location.search);
        const urlFilter = urlParams.get('filter');
        if (urlFilter) {
            const matchedBtn = Array.from(filterBtns).find(btn => btn.dataset.filter === urlFilter);
            if (matchedBtn) {
                filterBtns.forEach(b => b.classList.remove('active'));
                matchedBtn.classList.add('active');
                activeFilter = urlFilter;
            }
        }

        // Apply filter and search dynamically
        const applyFilterAndSearch = () => {
            let visibleCount = 0;

            courseCards.forEach(card => {
                const category = card.dataset.category;
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                const badge = card.querySelector('.course-badge').textContent.toLowerCase();

                const matchesCategory = (activeFilter === 'all' || category === activeFilter);
                const matchesSearch = (
                    title.includes(searchQuery) || 
                    desc.includes(searchQuery) ||
                    badge.includes(searchQuery)
                );

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'flex';
                    // Simple entrance animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.4s ease';
                    }, 50);
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show 'no results' message if nothing matched
            if (visibleCount === 0) {
                noResults.classList.remove('hidden');
                coursesContainer.style.display = 'none';
            } else {
                noResults.classList.add('hidden');
                coursesContainer.style.display = 'grid';
            }
        };

        // Click handler for filtering buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                activeFilter = btn.dataset.filter;
                applyFilterAndSearch();
            });
        });

        // Typing handler for real-time search
        if (courseSearch) {
            courseSearch.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                applyFilterAndSearch();
            });
        }

        // First application
        applyFilterAndSearch();
    }

    // --- Consult Form Submission Simulation ---
    const quickContactForm = document.getElementById('quickContact');
    const formSuccess = document.getElementById('formSuccess');

    if (quickContactForm && formSuccess) {
        quickContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtain values
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            const field = document.getElementById('userField').value;

            console.log('Form Submit:', { name, phone, field });

            // Animate form transitions
            quickContactForm.style.opacity = '0';
            quickContactForm.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                quickContactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                formSuccess.style.opacity = '0';
                
                setTimeout(() => {
                    formSuccess.style.opacity = '1';
                    formSuccess.style.transition = 'opacity 0.5s ease';
                }, 50);
            }, 300);
        });
    }
});

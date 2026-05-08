document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu_toggle');
    const navLinks = document.getElementById('nav_links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Initialize Lucide icons if they aren't already (just in case)
    if (window.lucide) {
        window.lucide.createIcons();
    }
});

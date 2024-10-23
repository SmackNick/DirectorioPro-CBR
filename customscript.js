// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile navigation toggle
const toggleButton = document.querySelector('.nav-toggle');
const navList = document.querySelector('nav ul.nav-list');

toggleButton.addEventListener('click', function() {
    navList.classList.toggle('active');
});

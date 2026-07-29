document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Blog Reading Progress Bar
    window.onscroll = function() {
        if (document.body.classList.contains('blog-page')) {
            updateProgressBar();
        }
    };

    function updateProgressBar() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        const myBar = document.getElementById("myBar");
        if(myBar) {
            myBar.style.width = scrolled + "%";
        }
    }

    // Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.style.color = '#2e7d32'; // Success Green

                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
});

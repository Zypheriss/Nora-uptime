document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    const fadeElements = document.querySelectorAll('.feature-card, .stat-card, .team-member, .command-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(element);
    });
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    const scrollBtn = document.createElement('button');
    scrollBtn.classList.add('scroll-top-btn');
    scrollBtn.innerHTML = '↑';
    document.body.appendChild(scrollBtn);
    const scrollBtnStyle = document.createElement('style');
    scrollBtnStyle.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            font-size: 24px;
            border: none;
            cursor: pointer;
            display: none;
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 10px rgba(138, 43, 226, 0.3);
        }
        
        .scroll-top-btn.show {
            display: block;
            opacity: 1;
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(scrollBtnStyle);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
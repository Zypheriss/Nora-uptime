
document.addEventListener('DOMContentLoaded', function() {
    const turkeyTimeElement = document.getElementById('turkeyTime');
    
    function updateTurkeyTime() {
        if (turkeyTimeElement) {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Europe/Istanbul'
            };
            
            const formatter = new Intl.DateTimeFormat('tr-TR', options);
            turkeyTimeElement.textContent = formatter.format(now);
        }
    }
    
    updateTurkeyTime();
    setInterval(updateTurkeyTime, 1000);

    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const stepTime = 1;
                const step = target / (duration / stepTime);
                
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    counter.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        counter.textContent = target.toLocaleString('tr-TR');
                        clearInterval(timer);
                    }
                }, stepTime);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.1 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        }
    });
});
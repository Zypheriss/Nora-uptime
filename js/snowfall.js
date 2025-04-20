
document.addEventListener('DOMContentLoaded', function() {
    const snowfall = document.querySelector('.snowfall');
    const createSnowflakes = () => {
        const numberOfSnowflakes = window.innerWidth / 10;
        const snowflakeTypes = ['❅', '❆', '❄', '✻', '✼', '❋', '❊', '❉'];
        
        for (let i = 0; i < numberOfSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.textContent = snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)];
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = `${Math.random() * 15 + 10}px`;
            snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
            snowflake.style.animationDelay = `${Math.random() * 5}s`;
            
            snowfall.appendChild(snowflake);
        }
    };
    
 
    const style = document.createElement('style');
    style.textContent = `
        .snowflake {
            position: absolute;
            color: white;
            pointer-events: none;
            animation: snowfall linear infinite;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
        }
        
        @keyframes snowfall {
            0% {
                transform: translateY(-100px) translateX(0) rotate(0deg);
            }
            25% {
                transform: translateY(25vh) translateX(10px) rotate(90deg);
            }
            50% {
                transform: translateY(50vh) translateX(-10px) rotate(180deg);
            }
            75% {
                transform: translateY(75vh) translateX(10px) rotate(270deg);
            }
            100% {
                transform: translateY(100vh) translateX(0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    createSnowflakes();
    

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            snowfall.innerHTML = '';
            createSnowflakes();
        }, 300);
    });
});
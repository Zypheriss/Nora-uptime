
document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    

    async function fetchDiscordStatus(discordId) {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
            
            if (response.ok) {
                const data = await response.json();
                return data.data?.discord_status || 'offline';
            } else {
                console.error('Error fetching Lanyard data:', response.statusText);
                return 'offline';
            }
        } catch (error) {
            console.error('Error fetching Lanyard data:', error);
            return 'offline';
        }
    }
    

    async function updateDiscordStatuses() {
        for (const member of teamMembers) {
            const discordId = member.getAttribute('data-discord-id');
            const statusElement = member.querySelector('.status');
            
            if (discordId && statusElement) {
                const status = await fetchDiscordStatus(discordId);
                

                statusElement.classList.remove('online', 'idle', 'dnd', 'offline');
                

                statusElement.classList.add(status);
            }
        }
    }
    

    updateDiscordStatuses();
    setInterval(updateDiscordStatuses, 60000);
    

    function addTeamMemberEffects() {
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                this.style.boxShadow = '0 15px 30px rgba(138, 43, 226, 0.3)';
                

                const statusElement = this.querySelector('.status');
                if (statusElement) {
                    statusElement.style.animation = 'pulse 1.5s infinite';
                }
            });
            
            member.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                

                const statusElement = this.querySelector('.status');
                if (statusElement) {
                    statusElement.style.animation = '';
                }
            });
        });
    }
    
  
    const statusStyle = document.createElement('style');
    statusStyle.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(statusStyle);
    

    addTeamMemberEffects();
});
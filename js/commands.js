document.addEventListener('DOMContentLoaded', function() {
    const commandCards = document.querySelectorAll('.command-card');
    const commandModal = document.getElementById('commandModal');
    const modalCommandName = document.getElementById('modalCommandName');
    const modalCommandDesc = document.getElementById('modalCommandDesc');
    const modalCommandUsage = document.getElementById('modalCommandUsage');
    const modalCommandExamples = document.getElementById('modalCommandExamples');
    const closeModal = document.querySelector('.close-modal');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const commandsData = {
        'yardım': {
            category: 'user',
            description: 'Nora Uptime Bot\'un tüm komutlarını listeler ve kullanım bilgilerini gösterir.',
            usage: '/yardım',
            examples: [
                'Tüm komutları görüntülemek için: /yardım',
                'Belirli bir kategori hakkında yardım almak için: /yardım [kategori adı]'
            ]
        },
        'ping': {
            category: 'user',
            description: 'Botun gecikme süresini  gösterir.',
            usage: '/ping',
            examples: [
                'Bot gecikmesini kontrol etmek için: /ping'
            ]
        },
        'bilgi': {
            category: 'user',
            description: 'Bot hakkında detaylı bilgi verir.',
            usage: '/bilgi',
            examples: [
                'Bot bilgilerini görüntülemek için: /bilgi'
            ]
        },
        'davet': {
            category: 'user',
            description: 'Bot davet linklerini gösterir.',
            usage: '/davet',
            examples: [
                'Davet linklerini görüntülemek için: /davet'
            ]
        },
        'ekle': {
            category: 'uptime',
            description: 'Uptime edilecek yeni bir proje ekler.',
            usage: '/ekle [proje URL\'si]',
            examples: [
                'Bir projeyi eklemek için: /ekle https://ornek-zypheris.glitch.me'
            ]
        },
        'sil': {
            category: 'uptime',
            description: 'Projeyi uptime listesinden kaldırır.',
            usage: '/sil [proje URL\'si]',
            examples: [
                'Bir projeyi kaldırmak için: /sil https://ornek-zypheris.glitch.me'
            ]
        },
        'listele': {
            category: 'uptime',
            description: 'Uptime projelerinizi listeler.',
            usage: '/listele',
            examples: [
                'Tüm projelerinizi listelemek için: /listele'
            ]
        },
        'bakım': {
            category: 'uptime',
            description: 'Bakım durumunu kontrol eder.',
            usage: '/bakım',
            examples: [
                'Bakım durumunu kontrol etmek için: /bakım'
            ]
        }
    };

    function filterCommands(category) {
        commandCards.forEach(card => {
            const commandName = card.getAttribute('data-command');
            const commandCategory = commandsData[commandName].category;
            
            if (category === 'all' || commandCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCommands(button.getAttribute('data-category'));
        });
    });

    commandCards.forEach(card => {
        card.addEventListener('click', function() {
            const commandName = this.getAttribute('data-command');
            const commandData = commandsData[commandName];
            
            if (commandData) {
                modalCommandName.textContent = `/${commandName}`;
                modalCommandDesc.textContent = commandData.description;
                modalCommandUsage.textContent = commandData.usage;
                
                modalCommandExamples.innerHTML = '';
                commandData.examples.forEach(example => {
                    const exampleElement = document.createElement('div');
                    exampleElement.classList.add('command-example');
                    exampleElement.textContent = example;
                    modalCommandExamples.appendChild(exampleElement);
                });
                
                commandModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            commandModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === commandModal) {
            commandModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && commandModal.classList.contains('active')) {
            commandModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    filterCommands('all');
});
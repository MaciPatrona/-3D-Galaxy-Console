document.addEventListener('DOMContentLoaded', () => {
    // Console functionality
    const output = document.getElementById('output');
    const input = document.getElementById('command-input');
    const commands = {
        help: 'Available commands: help, clear, echo, date, whoami',
        clear: () => output.innerHTML = '',
        echo: (args) => args.join(' '),
        date: () => new Date().toLocaleString(),
        whoami: 'guest@3dconsole'
    };

    // Welcome message
    appendOutput('Welcome to 3D Galaxy Console! Type "help" for available commands.');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            input.value = '';
            
            if (cmd) {
                appendOutput(`$ ${cmd}`, 'command');
                processCommand(cmd);
            }
        }
    });

    function processCommand(cmd) {
        const [command, ...args] = cmd.toLowerCase().split(' ');
        
        if (command in commands) {
            const result = typeof commands[command] === 'function' 
                ? commands[command](args)
                : commands[command];
            
            if (result) appendOutput(result);
        } else {
            appendOutput(`Command not found: ${command}. Type "help" for available commands.`, 'error');
        }
    }

    function appendOutput(text, type = '') {
        const line = document.createElement('div');
        line.textContent = text;
        line.className = type;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    // Galaxy background effects
    const galaxyContainer = document.getElementById('galaxy-container');
    
    // Create dynamic stars
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3}px;
            height: ${Math.random() * 3}px;
            background: #fff;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: star-twinkle ${Math.random() * 3 + 1}s infinite;
            transform: translateZ(${Math.random() * 1000}px);
        `;
        return star;
    }

    // Add stars to galaxy container
    for (let i = 0; i < 200; i++) {
        galaxyContainer.appendChild(createStar());
    }

    // Add mousemove parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        galaxyContainer.style.transform = `
            rotateX(${mouseY * 20}deg)
            rotateY(${mouseX * 20}deg)
            translateZ(-500px)
        `;
    });

    // Add star twinkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes star-twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);

    // Add some visual effects to the cubes
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach(cube => {
        cube.addEventListener('mouseover', () => {
            cube.style.background = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`;
        });
    });
}); 
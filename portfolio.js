document.addEventListener('DOMContentLoaded', () => {

    // ─── CV Download ───────────────────────────────────────────────
    const hireButton = document.getElementById('hire');
    if (hireButton) {
        hireButton.addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = 'cv.pdf';
            a.download = 'cv.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    // ─── Footer Year ───────────────────────────────────────────────
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ─── Dark / Light Mode ─────────────────────────────────────────
    const themeBtn  = document.getElementById('theme-toggle');
    const darkIcon  = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const html      = document.documentElement;

    const savedTheme  = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    themeBtn.addEventListener('click', () => {
        const next = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('color-theme', next);
    });

    function applyTheme(theme) {
        html.setAttribute('data-bs-theme', theme);
        if (theme === 'dark') {
            darkIcon.classList.add('d-none');
            lightIcon.classList.remove('d-none');
        } else {
            lightIcon.classList.add('d-none');
            darkIcon.classList.remove('d-none');
        }
    }

    // ─── Orbit Animation ───────────────────────────────────────────
    const system = document.getElementById('orbit-system');
    if (!system) return;

    const scale = system.offsetWidth / 560;

    const rings = [
        {
            radius: 148 * scale,
            speed:  0.5,
            skills: [
                { label: 'Java',       icon: 'devicon-java-plain colored' },
                { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
                { label: 'TypeScript', icon: 'devicon-typescript-plain colored' },
                { label: 'Python',     icon: 'devicon-python-plain colored' },
            ]
        },
        {
            radius: 213 * scale,
            speed: -0.32,
            skills: [
                { label: 'React',        icon: 'devicon-react-original colored' },
                { label: 'Bootstrap',    icon: 'devicon-bootstrap-plain colored' },
                { label: 'HTML5',        icon: 'devicon-html5-plain colored' },
                { label: 'CSS3',         icon: 'devicon-css3-plain colored' },
                { label: 'React Native', icon: 'devicon-react-original colored' },
            ]
        },
        {
            radius: 270 * scale,
            speed:  0.2,
            skills: [
                { label: 'Node.js',    icon: 'devicon-nodejs-plain colored' },
                { label: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
                { label: 'MySQL',      icon: 'devicon-mysql-plain colored' },
                { label: 'Git',        icon: 'devicon-git-plain colored' },
                { label: 'GitHub',     icon: 'devicon-github-original' },
                { label: 'VS Code',    icon: 'devicon-vscode-plain colored' },
                { label: 'Postman',    icon: 'devicon-postman-plain colored' },
            ]
        }
    ];

    const cx = system.offsetWidth  / 2;
    const cy = system.offsetHeight / 2;

    // Draw dashed track rings
    rings.forEach(ring => {
        const track = document.createElement('div');
        track.className = 'orbit-track';
        track.style.width  = ring.radius * 2 + 'px';
        track.style.height = ring.radius * 2 + 'px';
        system.appendChild(track);
    });

    // Build icon nodes
    const pillData = [];

    rings.forEach(ring => {
        const count = ring.skills.length;
        ring.skills.forEach((skill, i) => {
            const startAngle = (i / count) * 2 * Math.PI;

            // Wrapper bubble
            const bubble = document.createElement('div');
            bubble.className = 'orbit-bubble';
            bubble.title = skill.label;  // tooltip on hover

            // Devicon <i>
            const ico = document.createElement('i');
            ico.className = skill.icon;
            bubble.appendChild(ico);

            // Label under icon
            const lbl = document.createElement('span');
            lbl.className = 'orbit-bubble-label';
            lbl.textContent = skill.label;
            bubble.appendChild(lbl);

            system.appendChild(bubble);

            pillData.push({
                el:     bubble,
                angle:  startAngle,
                radius: ring.radius,
                speed:  ring.speed
            });
        });
    });

    // Pause on hover
    let paused = false;
    system.addEventListener('mouseenter', () => paused = true);
    system.addEventListener('mouseleave', () => paused = false);

    const DEG = Math.PI / 180;

    function place(p) {
        const x = cx + p.radius * Math.cos(p.angle);
        const y = cy + p.radius * Math.sin(p.angle);
        p.el.style.left = x + 'px';
        p.el.style.top  = y + 'px';
    }

    // Set initial positions
    pillData.forEach(place);

    function animate() {
        if (!paused) {
            pillData.forEach(p => {
                p.angle += p.speed * DEG;
                place(p);
            });
        }
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
document.addEventListener('DOMContentLoaded', () => {

    /* ===== 1. MENÚ HAMBURGUESA ===== */
    const boton = document.querySelector('.menu-toggle');
    const nav = document.getElementById('nav-principal');

    if (boton && nav) {
        const cerrarMenu = () => {
            nav.classList.remove('abierto');
            boton.setAttribute('aria-expanded', 'false');
            boton.setAttribute('aria-label', 'Abrir menú');
            boton.textContent = '☰';
        };

        boton.addEventListener('click', () => {
            const abierto = nav.classList.toggle('abierto');
            boton.setAttribute('aria-expanded', String(abierto));
            boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
            boton.textContent = abierto ? '✕' : '☰';
        });

        // Se cierra al elegir una página, al pulsar Escape o al agrandar la ventana
        nav.addEventListener('click', (e) => {
            if (e.target.closest('a')) cerrarMenu();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') cerrarMenu();
        });
        window.matchMedia('(min-width: 961px)').addEventListener('change', cerrarMenu);
    }

    /* ===== 2. BOTÓN COPIAR EN BLOQUES DE CÓDIGO ===== */
    document.querySelectorAll('pre').forEach((pre) => {
        const codigo = pre.querySelector('code');
        if (!codigo || pre.classList.contains('salida')) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-copiar';
        btn.textContent = 'Copiar';
        btn.setAttribute('aria-label', 'Copiar código al portapapeles');
        btn.setAttribute('aria-live', 'polite');

        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codigo.innerText);
                btn.textContent = '¡Copiado!';
                btn.classList.add('copiado');
            } catch (error) {
                btn.textContent = 'No se pudo copiar';
            }
            setTimeout(() => {
                btn.textContent = 'Copiar';
                btn.classList.remove('copiado');
            }, 1800);
        });

        pre.appendChild(btn);
    });

    /* ===== 3. ÍNDICE LATERAL: RESALTAR LA SECCIÓN ACTUAL ===== */
    const enlacesIndice = document.querySelectorAll('.toc a');

    if (enlacesIndice.length && 'IntersectionObserver' in window) {
        const secciones = new Map();

        enlacesIndice.forEach((enlace) => {
            const seccion = document.querySelector(enlace.getAttribute('href'));
            if (seccion) secciones.set(seccion, enlace);
        });

        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    enlacesIndice.forEach((e) => e.classList.remove('actual'));
                    secciones.get(entrada.target).classList.add('actual');
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });

        secciones.forEach((enlace, seccion) => observador.observe(seccion));
    }
});
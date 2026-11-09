const botonMenu = document.querySelector('.menu-toggle');
const menu = document.getElementById('nav-principal');

function abrirMenu() {
    menu.classList.add('abierto');
    botonMenu.setAttribute('aria-expanded', 'true');
    botonMenu.setAttribute('aria-label', 'Cerrar menú');
    botonMenu.textContent = '✕';
}

function cerrarMenu() {
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú');
    botonMenu.textContent = '☰';
}

function alternarMenu() {
    if (menu.classList.contains('abierto')) {
        cerrarMenu();
    } else {
        abrirMenu();
    }
}

if (botonMenu !== null && menu !== null) {
    botonMenu.onclick = alternarMenu;

    menu.onclick = function (evento) {
        if (evento.target.tagName === 'A') {
            cerrarMenu();
        }
    };

    document.onkeydown = function (evento) {
        if (evento.key === 'Escape') {
            cerrarMenu();
        }
    };

    window.onresize = function () {
        if (window.innerWidth > 960) {
            cerrarMenu();
        }
    };
}

function crearBotonCopiar(bloque) {
    const codigo = bloque.querySelector('code');

    if (codigo === null || bloque.classList.contains('salida')) {
        return;
    }

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn-copiar';
    boton.textContent = 'Copiar';
    boton.setAttribute('aria-label', 'Copiar código al portapapeles');

    boton.onclick = function () {
        navigator.clipboard.writeText(codigo.innerText)
            .then(function () {
                boton.textContent = '¡Copiado!';
                boton.classList.add('copiado');
            })
            .catch(function () {
                boton.textContent = 'No se pudo copiar';
            });

        setTimeout(function () {
            boton.textContent = 'Copiar';
            boton.classList.remove('copiado');
        }, 1800);
    };

    bloque.appendChild(boton);
}

const bloquesDeCodigo = document.querySelectorAll('pre');
for (let i = 0; i < bloquesDeCodigo.length; i++) {
    crearBotonCopiar(bloquesDeCodigo[i]);
}

const enlacesIndice = document.querySelectorAll('.toc a');

function marcarSeccionActual() {
    let enlaceActual = null;

    for (let i = 0; i < enlacesIndice.length; i++) {
        const seccion = document.querySelector(enlacesIndice[i].getAttribute('href'));
        if (seccion !== null && seccion.getBoundingClientRect().top <= 150) {
            enlaceActual = enlacesIndice[i];
        }
    }

    for (let i = 0; i < enlacesIndice.length; i++) {
        enlacesIndice[i].classList.remove('actual');
    }

    if (enlaceActual !== null) {
        enlaceActual.classList.add('actual');
    }
}

if (enlacesIndice.length > 0) {
    window.onscroll = marcarSeccionActual;
    marcarSeccionActual();
}
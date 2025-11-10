const track = document.getElementById('track');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

let autoScroll; // variable del intervalo
let autoScrollDelay = 3000; // tiempo entre desplazamientos (ms)
let direction = 1; // 1 = hacia adelante, -1 = atrás

// ---- FUNCIONES ----
function getStep() {
  const cards = track.querySelectorAll('.card');
  if (cards.length < 2) return 260 + 28;
  const a = cards[0].getBoundingClientRect();
  const b = cards[1].getBoundingClientRect();
  return Math.round(b.left - a.left);
}

function scrollByStep(dir = 1) {
  const step = getStep();
  track.scrollBy({ left: dir * step, behavior: 'smooth' });
}

function updateArrows() {
  const maxScroll = track.scrollWidth - track.clientWidth;
  const x = track.scrollLeft;
  btnPrev.disabled = x <= 2;
  btnNext.disabled = x >= maxScroll - 2;
}

function startAutoScroll() {
  stopAutoScroll(); // evita duplicados
  autoScroll = setInterval(() => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 2;
    const atStart = track.scrollLeft <= 2;

    // cambia de dirección cuando llega al final o al inicio
    if (atEnd) direction = -1;
    else if (atStart) direction = 1;

    scrollByStep(direction);
  }, autoScrollDelay);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

// ---- EVENTOS ----
btnPrev.addEventListener('click', () => {
  scrollByStep(-1);
  stopAutoScroll(); // pausa al usar flecha
  startAutoScroll(); // y reinicia
});

btnNext.addEventListener('click', () => {
  scrollByStep(1);
  stopAutoScroll();
  startAutoScroll();
});

track.addEventListener('scroll', updateArrows);
window.addEventListener('load', () => {
  updateArrows();
  startAutoScroll(); // inicia auto scroll al cargar
});
window.addEventListener('resize', updateArrows);

// ---- Pausa cuando el mouse pasa por encima ----
track.addEventListener('mouseenter', stopAutoScroll);
track.addEventListener('mouseleave', startAutoScroll);


// Eventos
btnPrev.addEventListener('click', () => scrollByStep(-1));
btnNext.addEventListener('click', () => scrollByStep(1));
track.addEventListener('scroll', updateArrows);
window.addEventListener('load', updateArrows);
window.addEventListener('resize', updateArrows);


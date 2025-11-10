function initCarrusel(id) {
  const track = document.getElementById(`track${id}`);
  const btnPrev = document.getElementById(`btnPrev${id}`);
  const btnNext = document.getElementById(`btnNext${id}`);

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

  btnPrev.addEventListener('click', () => scrollByStep(-1));
  btnNext.addEventListener('click', () => scrollByStep(1));
  track.addEventListener('scroll', updateArrows);
  window.addEventListener('load', updateArrows);
  window.addEventListener('resize', updateArrows);
}

// Inicializa carruseles internos
['1', '2', '3', '4', '5'].forEach(initCarrusel);

// Funções utilitárias que ajudam o projeto, sem necessidade de mudança inicial.
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createSvgBlobUrl(svg) {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}

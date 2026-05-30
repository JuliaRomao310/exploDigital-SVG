// Elementos do formulário e preview
const inputWidth = document.getElementById('input-width');
const inputHeight = document.getElementById('input-height');
const selectPattern = document.getElementById('select-pattern');
const inputGridSize = document.getElementById('input-grid-size');
const inputMinOpacity = document.getElementById('input-min-opacity');
const inputMaxOpacity = document.getElementById('input-max-opacity');
const inputColor = document.getElementById('input-color');
const labelGridSize = document.getElementById('label-grid-size');
const labelMinOpacity = document.getElementById('label-min-opacity');
const labelMaxOpacity = document.getElementById('label-max-opacity');
const buttonGenerate = document.getElementById('button-generate');
const buttonDownload = document.getElementById('button-download');
const preview = document.getElementById('preview');
const previewSize = document.getElementById('preview-size');

// Atualiza os labels ao mover os sliders
function updateLabels() {
  labelGridSize.textContent = inputGridSize.value;
  labelMinOpacity.textContent = Number(inputMinOpacity.value).toFixed(2);
  labelMaxOpacity.textContent = Number(inputMaxOpacity.value).toFixed(2);
}

// Retorna um objeto com opções lidas do formulário
function getOptions() {
  const width = Math.max(100, Number(inputWidth.value));
  const height = Math.max(100, Number(inputHeight.value));
  const gridSize = Math.max(2, Number(inputGridSize.value));
  const minOpacity = clamp(Number(inputMinOpacity.value), 0, 1);
  const maxOpacity = Math.max(minOpacity, clamp(Number(inputMaxOpacity.value), 0, 1));

return {
    width,
    height,
    pattern: selectPattern.value,
    gridSize,
    minOpacity,
    maxOpacity,
    color: inputColor.value,
  };
}

// Atualiza o preview e o botão de download
function refreshPreview() {
  const options = getOptions();
  renderSVG(options, preview, previewSize, buttonDownload);
}

// Baixa o SVG gerado quando o botão é clicado
function downloadSVG() {
  const url = buttonDownload.getAttribute('data-svg-url');
  if (!url) return;

  const link = document.createElement('a');
  link.href = url;
  link.download = 'banner-svg.svg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Inicialização dos eventos da página
function init() {
  updateLabels();
  refreshPreview();

  inputGridSize.addEventListener('input', () => {
    updateLabels();
  });
  inputMinOpacity.addEventListener('input', () => {
    updateLabels();
  });
  inputMaxOpacity.addEventListener('input', () => {
    updateLabels();
  });

  buttonGenerate.addEventListener('click', (event) => {
    event.preventDefault();
    refreshPreview();
  });

  buttonDownload.addEventListener('click', (event) => {
    event.preventDefault();
    downloadSVG();
  });
}

// Começa após o carregamento do documento HTML
window.addEventListener('DOMContentLoaded', init);

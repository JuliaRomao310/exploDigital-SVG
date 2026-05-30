// Gera os elementos SVG de acordo com o padrão escolhido
function generateShape(pattern, x, y, gridSize, opacity, color) {

    switch (pattern) {

        case 'squares':

            return `
                <rect
                    x="${x}"
                    y="${y}"
                    width="${gridSize}"
                    height="${gridSize}"
                    fill="${color}"
                    fill-opacity="${opacity}"
                    stroke-width="0"
                />
            `;

        case 'circles':

            return `
                <circle
                    cx="${x + gridSize / 2}"
                    cy="${y + gridSize / 2}"
                    r="${gridSize / 2}"
                    fill="${color}"
                    fill-opacity="${opacity}"
                    stroke-width="0"
                />
            `;

        case 'triangles':

            return `
                <polygon
                    points="
                        ${x + gridSize / 2},${y}
                        ${x},${y + gridSize}
                        ${x + gridSize},${y + gridSize}
                    "
                    fill="${color}"
                    fill-opacity="${opacity}"
                    stroke-width="0"
                />
            `;

        default:
            return '';
    }
}

// Gera o SVG completo
function generateSVG(options) {

  const {
    width,
    height,
    pattern,
    gridSize,
    minOpacity,
    maxOpacity,
    color
} = options;

    let shapes = '';

    for (let y = 0; y < height; y += gridSize) {

        for (let x = 0; x < width; x += gridSize) {

            const opacity = randomBetween(
                minOpacity,
                maxOpacity
            ).toFixed(2);

           shapes += generateShape(
            pattern,
            x,
            y,
            gridSize,
            opacity,
            color
            );
        }
    }

    return `
        <?xml version="1.0" encoding="UTF-8"?>

        <svg
            width="${width}"
            height="${height}"
            viewBox="0 0 ${width} ${height}"
            xmlns="http://www.w3.org/2000/svg"
        >

            <rect
                width="100%"
                height="100%"
                fill="#ffffff"
            />

            ${shapes}

        </svg>
    `;
}

let currentSvgUrl = null;

// Atualiza o preview e o botão de download
function renderSVG(
    options,
    previewElement,
    previewSizeElement,
    downloadButton
) {

    const svg = generateSVG(options);

    previewElement.innerHTML = svg;

    previewSizeElement.textContent =
        `${options.width} x ${options.height}`;

    if (currentSvgUrl) {
        URL.revokeObjectURL(currentSvgUrl);
    }

    currentSvgUrl = createSvgBlobUrl(svg);

    downloadButton.setAttribute(
        'data-svg-url',
        currentSvgUrl
    );
}
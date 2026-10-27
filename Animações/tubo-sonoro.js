const canvasTubo = document.getElementById('canvasTubo');
const ctxTubo = canvasTubo.getContext('2d');

let tempoTubo = 0;
let nHarmonicaTubo = 1;

function mudarHarmonicaTubo() {
    const selectTubo = document.getElementById('harmonicaTubo');
    nHarmonicaTubo = parseInt(selectTubo.value);
}

function desenharTuboSonoro() {
    ctxTubo.clearRect(0, 0, canvasTubo.width, canvasTubo.height);

    const largura = canvasTubo.width;
    const altura = canvasTubo.height;
    const centroY = altura / 2;
    const comprimentoTubo = largura - 120;
    const inicioX = 60;

    // Desenhar a estrutura do tubo
    ctxTubo.strokeStyle = '#64748b';
    ctxTubo.lineWidth = 4;
    ctxTubo.beginPath();
    ctxTubo.moveTo(inicioX, centroY - 40);
    ctxTubo.lineTo(inicioX, centroY + 40);
    ctxTubo.moveTo(inicioX, centroY - 40);
    ctxTubo.lineTo(inicioX + comprimentoTubo, centroY - 40);
    ctxTubo.moveTo(inicioX, centroY + 40);
    ctxTubo.lineTo(inicioX + comprimentoTubo, centroY + 40);
    ctxTubo.stroke();

    // Linha central pontilhada
    ctxTubo.strokeStyle = '#cbd5e1';
    ctxTubo.lineWidth = 1;
    ctxTubo.setLineDash([3, 3]);
    ctxTubo.beginPath();
    ctxTubo.moveTo(inicioX, centroY);
    ctxTubo.lineTo(inicioX + comprimentoTubo, centroY);
    ctxTubo.stroke();
    ctxTubo.setLineDash([]);

    // Desenhar a onda no tubo fechado-aberto
    ctxTubo.strokeStyle = '#0004ff';
    ctxTubo.lineWidth = 3;
    ctxTubo.beginPath();

    const amplitudeMaxima = 30;

    for (let x = 0; x <= comprimentoTubo; x++) {
        let xNorm = x / comprimentoTubo;
        let y = amplitudeMaxima * Math.sin((nHarmonicaTubo * Math.PI * xNorm) / 2) * Math.cos(tempoTubo);

        let posX = inicioX + x;
        let posY = centroY - y;

        if (x === 0) {
            ctxTubo.moveTo(posX, posY);
        } else {
            ctxTubo.lineTo(posX, posY);
        }
    }
    ctxTubo.stroke();

    tempoTubo += 0.05;
    requestAnimationFrame(desenharTuboSonoro);
}

// Iniciar a animação do tubo
desenharTuboSonoro();
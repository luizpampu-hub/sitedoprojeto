const canvas = document.getElementById('canvasOnda');
const ctx = canvas.getContext('2d');

let tempo = 0;
let nHarmonica = 3; // Começa no 3º harmônico por padrão

function mudarHarmonica() {
    const select = document.getElementById('harmonica');
    nHarmonica = parseInt(select.value);
}

function desenharOnda() {
    // Limpa o quadro a cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const largura = canvas.width;
    const altura = canvas.height;
    const centroY = altura / 2;
    const comprimentoCorda = largura - 100; // Margem nas pontas
    const inicioX = 50;

    // Desenha a linha de equilíbrio (pontilhada)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(inicioX, centroY);
    ctx.lineTo(inicioX + comprimentoCorda, centroY);
    ctx.stroke();
    ctx.setLineDash([]); // Reseta o tracejado

    // Desenha os suportes fixos nas extremidades
    ctx.fillStyle = '#64748b';
    ctx.fillRect(inicioX - 10, centroY - 30, 10, 60);
    ctx.fillRect(inicioX + comprimentoCorda, centroY - 30, 10, 60);

    // Desenha a onda estacionária
    ctx.strokeStyle = '#0004ff'; 
    ctx.lineWidth = 3;
    ctx.beginPath();

    const amplitudeMaxima = 50;
    
    for (let x = 0; x <= comprimentoCorda; x++) {
        let xNorm = x / comprimentoCorda;
        let y = amplitudeMaxima * Math.sin(nHarmonica * Math.PI * xNorm) * Math.cos(tempo);

        let posX = inicioX + x;
        let posY = centroY - y;

        if (x === 0) {
            ctx.moveTo(posX, posY);
        } else {
            ctx.lineTo(posX, posY);
        }
    }
    ctx.stroke();

    tempo += 0.05;
    requestAnimationFrame(desenharOnda);
}

// Inicializa a animação
desenharOnda();
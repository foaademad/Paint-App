const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let tool = 'freehand';
let startX, startY;

document.getElementById('freehand').addEventListener('click', () => tool = 'freehand');
document.getElementById('line').addEventListener('click', () => tool = 'line');
document.getElementById('rectangle').addEventListener('click', () => tool = 'rectangle');
document.getElementById('circle').addEventListener('click', () => tool = 'circle');
document.getElementById('eraser').addEventListener('click', () => tool = 'eraser');

canvas.addEventListener('mousedown', (e) => {
    startX = e.offsetX;
    startY = e.offsetY;
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;

    ctx.strokeStyle = document.getElementById('strokeStyle').value;
    ctx.fillStyle = document.getElementById('fillStyle').value;

    switch (tool) {
        case 'freehand':
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            break;

        case 'line':
           
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;

        case 'rectangle':
           
            ctx.beginPath();
            ctx.rect(startX, startY, e.offsetX - startX, e.offsetY - startY);
            ctx.fill();
            ctx.stroke();
            break;

        case 'circle':
           
            ctx.beginPath();
            let radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
            
        case 'eraser':
            ctx.clearRect(e.offsetX, e.offsetY, 50, 50);
            break;
    }
}

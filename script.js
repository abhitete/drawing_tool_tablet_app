const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

let drawing = false;
let tool = 'pencil';
let currentColor = document.getElementById('colorPicker').value;
let currentLineWidth = document.getElementById('lineWidth').value;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', stop);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => start(e.touches[0]));
canvas.addEventListener('touchend', stop);
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e.touches[0]);
}, { passive: false });

function setTool(selectedTool) {
  tool = selectedTool;
}

function start(e) {
  drawing = true;
  draw(e);
}

function stop() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = currentLineWidth;
  ctx.lineCap = 'round';

  if (tool === 'eraser') {
    ctx.strokeStyle = '#fff'; // Erase with white
  } else {
    ctx.strokeStyle = currentColor;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// 🎨 Color Picker
document.getElementById('colorPicker').addEventListener('change', (e) => {
  currentColor = e.target.value;
});

// 📏 Line Width
document.getElementById('lineWidth').addEventListener('input', (e) => {
  currentLineWidth = e.target.value;
});

// 🗑️ Clear Canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 💾 Download Canvas
function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'my_drawing.png';
  link.href = canvas.toDataURL();
  link.click();
}

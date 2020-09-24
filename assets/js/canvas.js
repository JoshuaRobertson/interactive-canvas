const canvas = document.querySelector('#draw')
const ctx    = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Brush stroke config
ctx.strokeStyle = '#BADA55'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 40
//ctx.globalCompositeOperation = 'lighten'

// Drawing config
let isDrawing = false
let lastX = 0
let lastY = 0
let direction = true

// Color config
let hue = 0


function draw(e) {
  // Stop function from running when not mousedown
  if (!isDrawing) return

  // Initial color
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

  ctx.beginPath()
  // Start position
  ctx.moveTo(lastX, lastY)
  // Go to
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // Increment through the colors
  hue++;
  if (hue >= 360) {
    hue = 0
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction
  }

  (direction) ? ctx.lineWidth++ : ctx.lineWidth--

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
})

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false)

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
  
    let isDrawing = false;
    let lines = [];
    let currentLine = [];
  
    // Evento al hacer clic para iniciar el dibujo
    canvas.addEventListener('mousedown', function (e) {
      isDrawing = true;
      currentLine = [];
      const startPoint = getMousePosition(canvas, e);
      currentLine.push(startPoint);
    });
  
    // Evento al mover el mouse para dibujar líneas en tiempo real
    canvas.addEventListener('mousemove', function (e) {
      if (!isDrawing) return;
  
      const currentPoint = getMousePosition(canvas, e);
      currentLine[1] = currentPoint;
      drawLines();
    });
  
    // Evento al soltar el clic para finalizar el dibujo de la línea
    canvas.addEventListener('mouseup', function () {
      if (isDrawing) {
        isDrawing = false;
        lines.push([...currentLine]); // Clona el array para evitar referencias compartidas
      }
    });
  
    // Función para obtener las coordenadas del mouse en relación con el canvas
    function getMousePosition(canvas, event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  
    // Función para dibujar todas las líneas existentes y la línea en proceso
    function drawLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      lines.forEach(line => {
        drawLine(line[0], line[1]);
      });
  
      // Dibujar la línea actual en proceso
      if (currentLine.length > 1) {
        drawLine(currentLine[0], currentLine[1]);
      }
    }
  
    // Función para dibujar una línea recta entre dos puntos utilizando la fórmula y = mx + b
    function drawLine(start, end) {
      // Cálculo de la pendiente (m)
      const m = (end.y - start.y) / (end.x - start.x);
      
      // Cálculo de la ordenada al origen (b)
      const b = start.y - m * start.x;
  
      // Determinación de los valores x mínimos y máximos
      const x1 = Math.min(start.x, end.x);
      const x2 = Math.max(start.x, end.x);
  
      // Cálculo de las coordenadas y correspondientes y trazado de la línea
      const y1 = m * x1 + b;
      const y2 = m * x2 + b;
  
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  });
  
let circles = []; // Arreglo para almacenar las partículas
let slider; // Variable para la barra deslizante
let colorChangeSpeed = 1; // Velocidad de cambio de color

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Crear una barra deslizante para controlar el tamaño de los círculos
  slider = createSlider(10, 50, 20); // Valores mínimo, máximo e inicial

  // Crear partículas iniciales
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(2, 5);
    let speedX = random(-1, 1);
    let speedY = random(-1, 1);
    let hue = random(0, 360); // Color inicial en grados de color (Hue)
    let circle = { x, y, radius, speedX, speedY, hue };
    circles.push(circle);
  }
}

function draw() {
  background(160, 82, 45);

  // Dibujar las líneas verticales para simular tablas de madera
  let numTablas = 10;
  let tablaWidth = width / numTablas;

  for (let i = 0; i < numTablas; i++) {
    let x = i * tablaWidth;
    
    stroke(139, 69, 19);
    strokeWeight(4);
    line(x, 0, x, height);
  }

  // Obtener el valor del slider para el tamaño de los círculos
  let circleSize = slider.value();

  // Actualizar y dibujar las partículas (círculos)
  for (let i = 0; i < circles.length; i++) {
    let circleA = circles[i];
    circleA.x += circleA.speedX;
    circleA.y += circleA.speedY;

    // Rebotar las partículas en los bordes del canvas
    if (circleA.x < 0 || circleA.x > width) {
      circleA.speedX *= -1;
    }
    if (circleA.y < 0 || circleA.y > height) {
      circleA.speedY *= -1;
    }

    // Cambiar gradualmente el color de los círculos
    circleA.hue += colorChangeSpeed;
    if (circleA.hue > 360) {
      circleA.hue = 0;
    }

    // Verificar colisiones con otros círculos
    for (let j = 0; j < circles.length; j++) {
      if (i !== j) {
        let circleB = circles[j];
        let distance = dist(circleA.x, circleA.y, circleB.x, circleB.y);
        let minDistance = circleA.radius + circleB.radius;

        if (distance < minDistance) {
          // Cambiar el color al opuesto (invertir el valor de hue)
          circleA.hue = (circleA.hue + 180) % 360;
          circleB.hue = (circleB.hue + 180) % 360;
        }
      }
    }

    // Convertir el valor de hue en un color
    let fillColor = color(circleA.hue, 100, 100);
    
    // Aplicar el color al círculo
    fill(fillColor);
    
    // Dibujar el círculo con el tamaño controlado por el slider
    noStroke();
    ellipse(circleA.x, circleA.y, circleSize);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const settings = {
  SpeedX: 2,
  SpeedY: 2,
  Particles: 0,
  Stroke: false,
  "Stroke size": 1,
  Shapes: {
    Triangle: false,
    Rectangle: false,
    Star: false,
    Arc: true,
  },
  Size: 20,
  colorCode: {
    Color: "#7c6800",
    Background: "rgb(0,0,0.05)",
    "Stroke Color": "#1d1d1d",
    Colorful: false,
  },
  Shapes: {
    Triangle: false,
    Rectangle: false,
    Star: false,
    Arc: true,
  },
};
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gui = new dat.GUI({ name: "Physics" });
const colorFolder = gui.addFolder("Colors");
const speedFolder = gui.addFolder("Speed");
const ShapesFolder = gui.addFolder("Shapes");
const NumbersofParticles = gui.addFolder("Particles");
colorFolder.addColor(settings.colorCode, "Background").onChange(() => {
  document.querySelector("canvas").style.background =
    settings.colorCode.Background;
});

// function LittleTrail() {
//       const spliArr = settings.colorCode.Background.split("rgb");
//       colorText = spliArr.toString();
//       colorText = colorText.split(',');
//       console.log(colorText);
//       ctx.fillStyle = `rgba${colorText},0.1)`;
//       ctx.fillRect(0, 0, window.innerWidth, window.innerHeight); 
//       console.log(`rgba${colorText}`);
// }
colorFolder.addColor(settings.colorCode, "Color").onChange(() => {
  settings.colorCode.Colorful = false;
  colorFulc.updateDisplay();
});
colorFolder.add(settings, "Stroke size", 1, 5).step(0.1);
colorFolder.add(settings, "Stroke");
colorFolder.addColor(settings.colorCode, "Stroke Color");
const colorFulc = colorFolder.add(settings.colorCode, "Colorful");
speedFolder.add(settings, "SpeedX", 5, 200).step(0.1);
speedFolder.add(settings, "SpeedY", 5, 200).step(0.1);

const star = ShapesFolder.add(settings.Shapes, "Star")
  .listen()
  .onChange(function () {
    ShapesChange("Star");
  });
const triangle = ShapesFolder.add(settings.Shapes, "Triangle")
  .listen()
  .onChange(function () {
    ShapesChange("Triangle");
  });
const rect = ShapesFolder.add(settings.Shapes, "Rectangle")
  .listen()
  .onChange(function () {
    ShapesChange("Rectangle");
  });
const arc = ShapesFolder.add(settings.Shapes, "Arc")
  .listen()
  .onChange(function () {
    ShapesChange("Arc");
  });

const btn01 = document.querySelector(".btn-01");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

let colorfulControl = false;
let drawing = false;

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;

  if (drawing) {
    for (let i = 0; i < 1; i++) {
      particlesArray.push(new Particles());
    }
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mousedown", () => {
  drawing = true;
});
canvas.addEventListener("touchstart", () => {
  drawing = true;
});

canvas.addEventListener("touchend", () => {
  drawing = false;
});
canvas.addEventListener("touchmove", (event) => {
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;

  if (drawing) {
    for (let i = 0; i < 1; i++) {
      particlesArray.push(new Particles());
    }
  }
});
addEventListener("resize", () => {
  resizeInit();
});
function ShapesChange(arg) {
  for (let shape in settings.Shapes) {
    settings.Shapes[shape] = false;
  }
  settings.Shapes[arg] = true;
}

function resizeInit() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  keypress = false;
}

function smartPhone() {
  btn01.addEventListener("click", () => {
    keypress = !keypress;

    if (keypress) {
      btn01.innerText = `Bounce on`;
    } else {
      btn01.innerText = `Bounce Off`;
    }
  });
}
smartPhone();
let particlesArray = [];
let hue = 0;
let keypress = false;

class Particles {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.inset = 2;
    this.spikes = 10;
    this.windowPy = window.innerWidth;
    this.windowPx = window.innerHeight;
    this.radius = window.innerWidth < 768 ? 5 : 30;
    this.speedX = Math.random() * settings.SpeedX - settings.SpeedX / 2;
    this.speedY = Math.random() * settings.SpeedY - settings.SpeedY / 2;
    this.color = settings.colorCode.Colorful
      ? `hsl(${hue},100%,50%)`
      : settings.colorCode.Color;
    //this.color = ``;
  }
  updateParticles() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.y + this.radius + this.speedY > window.innerHeight) {
      this.speedY = Math.floor(-this.speedY * 0.8);
      this.radius -= Math.random() * 2 + 1;
    } else {
      this.speedY += 1;
    }
  }

  DrawShapes() {
    if (settings.Shapes["Triangle"]) {
      ctx.beginPath();
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.moveTo(0, 0 - this.radius);

      for (let i = 0; i < 3; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.lineTo(0, 0 - this.radius * this.inset);
        ctx.rotate(Math.PI / 3);
        ctx.lineTo(0, 0 - this.radius);
      }
      ctx.restore();
      ctx.fillStyle = this.color;
      ctx.fill();
      if (settings.Stroke) {
        ctx.lineWidth = settings["Stroke size"];
        ctx.strokeStyle = settings.colorCode["Stroke Color"];
        ctx.stroke();
      }
    } else if (settings.Shapes["Star"]) {
      ctx.beginPath();
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.moveTo(0, 0 - this.radius);

      for (let i = 0; i < 5; i++) {
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - this.radius * this.inset);
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - this.radius);
      }
      ctx.restore();
      ctx.fillStyle = this.color;
      ctx.fill();
      if (settings.Stroke) {
        ctx.lineWidth = settings["Stroke size"];
        ctx.strokeStyle = settings.colorCode["Stroke Color"];
        ctx.stroke();
      }
    } else if (settings.Shapes["Rectangle"]) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.radius, this.radius);
      ctx.fillStyle = this.color;
      ctx.fill();
      if (settings.Stroke) {
        ctx.lineWidth = settings["Stroke size"];
        ctx.strokeStyle = settings.colorCode["Stroke Color"];
        ctx.stroke();
      }
    } else if (settings.Shapes["Arc"]) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      if (settings.Stroke) {
        ctx.lineWidth = settings["Stroke size"];
        ctx.strokeStyle = settings.colorCode["Stroke Color"];
        ctx.stroke();
      }
      ctx.fill();
    }
  }
}

addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    keypress = !keypress;
  }
});

function handleAnimation() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].DrawShapes();
    if (keypress) {
      particlesArray[i].updateParticles();
    }

    if (particlesArray[i].radius <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animateIt() {
//   LittleTrail();
  handleAnimation();
  requestAnimationFrame(animateIt);
  hue++;
  if (keypress) {
    btn01.style.background = `hsl(${hue},100%,50%)`;
    btn01.style.color = "#fff";
  }
}
animateIt();

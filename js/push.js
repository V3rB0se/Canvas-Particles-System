var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const canvas = document.querySelector("canvas");
const settings = {
  Background: "rgba(70,255,88,1)", //"rgba(182,25,36,1)" || ,
  Particles_Color: `rgba(0,0,0,1)`,
  ColorFul: false,
  Mouse: 0,
  Particles: 0, 
  Speed: 0,
  Density: 0,
  Particles_size: 0,
  Liquid: false,
  Connect: false,
  Distance: 113,
  Effects: "Magnet",
  Trail: false,
  "Random Shape": false,
  Blink: false,
  Opacity: 1,
  "On Hover": false,
};

// Magnet Effect to work
let dx,
  dy,
  distance,
  forceDirectionX,
  forceDirectionY,
  maxDistance,
  force,
  directionX,
  directionY,
  dontConnect,
  push = false,
  particlesArray = [],
  requestAni,
  Push = false,
  reqAniPush,
  reqAniMag,
  hue = 0,
  drawing = false,
  backgroundColor,
  spliArr = [],
  colorText,
  isTrail = false,
  NotRandomShape = true,
  anglex2 = 0,
  Blink = false,
  onHover = false;
 fadeIn = true;

const pi = Math.PI * 2;

gui = new dat.GUI({
  name: "Particles System",
});

ParticlesFolder = gui.addFolder("Particles");
colorFolder = gui.addFolder("Colors");
Animations = gui.addFolder("Animations");
LineConnect = gui.addFolder("Line Connect");
Interaction = gui.addFolder("Interaction");

Interaction.add(settings, "Effects", ["Magnet", "Push"])
  .setValue("Magnet")
  .onChange((valueIs) => {
    onChange();
    animationTree();
  });

Interaction.add(settings, "On Hover").onChange((hoverEffect) => {
  onHover = !onHover;
});

const particlesUpdater =  ParticlesFolder.add(settings, "Particles", 10, 700)
  .setValue(160)
  .onChange(() => {
    reinit();
    root.particlesSize();
    root.particleSpeed();
    root.particlesColor();
    let particlesCount = settings.Particles;
    document.querySelector(
      "h5"
    ).innerText = `${particlesArray.length} \n Particles`;
    settings.ColorFul ? root.changeColor() : root.returnColor();
  });

const gux = ParticlesFolder.add(settings, "Particles_size", 0, 50)
  .step(0.01 )
  .setValue(38)
  .onChange(() => {
    root.particlesSize();
  });

Animations.add(settings, "Trail").onChange((trail) => {
  isTrail = trail;
});
let opacElement = ParticlesFolder.add(settings, "Opacity", 0.2, 1)
  .setValue(1)
  .onChange((opac) => {
    opac = settings.Opacity;
    console.log(settings.opac);
  });
animationTree();

function pushAnimation() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].pushParticles();
  }
  reqAniPush = requestAnimationFrame(pushAnimation);
}

function magnetAnimation() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].magnetParticles();
  }
  reqAniMag = requestAnimationFrame(magnetAnimation);
}

function animationTree() {
  if (Push === true) {
    pushAnimation();
    cancelAnimationFrame(reqAniMag);
  } else if (Push === false) {
    cancelAnimationFrame(reqAniPush);
    magnetAnimation();
  }
}

function onChange() {
  if (Push === false) {
    Push = true;
  } else {
    Push = false;
  }
}

LineConnect.add(settings, "Connect").onChange(function (Checked) {
  function request() {
    if (Checked) {
      requestAni = requestAnimationFrame(request);
      for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();

        if (NotRandomShape) {
          particlesArray[i].draw();
        } else {
          particlesArray[i].drawRandShapes();
        }
        for (var j = i; j < particlesArray.length; j++) {
          let dxs, dys, distances;
          dxs = particlesArray[i].x - particlesArray[j].x;
          dys = particlesArray[i].y - particlesArray[j].y;
          distances = Math.sqrt(dxs * dxs + dys * dys);
          if (distances < settings.Distance) {
            ctx.beginPath();
            ctx.strokeStyle = particlesArray[i].color;
            ctx.lineWidth = 2;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
            ctx.globalAlpha = settings.opac;
          }
        }
      }
    } else {
      cancelAnimationFrame(requestAni);
    }
  }

  request();
});
ParticlesFolder.add(settings, "Random Shape").onChange((value) => {
  NotRandomShape = !NotRandomShape;
});
Animations.add(settings, "Blink").onChange((value) => {
  Blink = !Blink;

  if (!Blink) {
    settings.Opacity = 1;
  }
});
LineConnect.add(settings, "Distance", 1, 500).setValue(113);
Animations.add(settings, "Liquid").onChange((value) => {
  if (value) {
    dontConnect = true;
    canvas.style.filter = "url(#goo)";
    for (i = 0; i < particlesArray.length; i++) {
      particlesArray[i].size = 20;
      settings.Particles_size = 20;
      gux.updateDisplay();
    }
  } else {
    canvas.style.filter = "none";
  }
});
const colorUpdate = colorFolder.add(settings, "ColorFul").onChange((value) => {
  value ? root.changeColor() : root.returnColor();
});
colorFolder.addColor(settings, "Background").onChange(() => {
  backgroundColor = settings.Background;
  ChangeSliderColor();
});
colorFolder.addColor(settings, "Particles_Color").onChange(() => {
  root.particlesColor();
  settings.ColorFul = false;
  colorUpdate.updateDisplay();
  ChangeCounterColor();
});

const speedVar = Animations.add(settings, "Speed", 1, 100)
  .setValue(1)
  .onChange(() => {
    root.particleSpeed();
  });
Interaction.add(settings, "Density", 1, 100)
  .setValue(100)
  .onChange(() => {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].density = settings.Density;
    }
  });
Interaction.add(settings, "Mouse", 1, 500).setValue(200);

function reinit() {
  particlesArray = [];
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  init();
}

const mouse = {
  x: undefined,
  y: undefined,
  radius: settings.Mouse,
};

function ChangeSliderColor() {
  const slider = document.querySelectorAll(".slider-fg");
  slider.forEach((sld) => {
    sld.style.background = settings.Background;
  });
}
ChangeSliderColor();
function ChangeCounterColor() {
  const counter = document.querySelector(".Particles-counter");
  counter.style.color = settings.Particles_Color;
  counter.style.borderColor = settings.Particles_Color;
}

ChangeCounterColor();
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setTimeout(() => {
  canvas.classList.add("scaled");
}, 1000);

canvas.addEventListener("touchmove", (event) => {
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;
  drawing = true;
});
canvas.addEventListener("touchstart", (event) => {
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;
  drawing = true;
});
canvas.addEventListener("touchend", () => {
  drawing = false;
});
addEventListener("resize", () => {
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  particlesArray = [];
  init();
  settings.Speed = 1;
  speedVar.updateDisplay();
});
canvas.addEventListener('click', () => {
  for(let i = 0; i < 3; i++){
    particlesArray.push(new Particles(mouse.x, mouse.y, settings.Particles_Color));
  }
  particlesUpdater.updateDisplay();
  if(settings.ColorFul){
  root.changeColor();
  }
  particleCounter();

})
canvas.addEventListener("mousemove", (event) => {
  if (onHover) {
    drawing = true;
  }
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});
canvas.addEventListener("mousedown", () => {
  drawing = true;
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

const colorsArray = [
  "#F44336",
  "#FFEBEE",
  "#FFCDD2",
  "#EF9A9A",
  "#E57373",
  "#EF5350",
  "#E53935",
  "#D32F2F",
  "#C62828",
  "#B71C1C",
  "#FF8A80",
  "#FF5252",
  "#FF1744",
  "#D50000",
  "#FCE4EC",
  "#F8BBD0",
  "#F48FB1",
  "#F06292",
  "#EC407A",
  "#E91E63",
  "#D81B60",
  "#C2185B",
  "#AD1457",
  "#880E4F",
  "#FF80AB",
  "#FF4081",
  "#F50057",
  "#C51162",
  "#F3E5F5",
  "#E1BEE7",
  "#CE93D8",
  "#BA68C8",
  "#AB47BC",
  "#9C27B0",
  "#8E24AA",
  "#7B1FA2",
  "#6A1B9A",
  "#4A148C",
  "#EA80FC",
  "#E040FB",
  "#D500F9",
  "#AA00FF",
  "#EDE7F6",
  "#D1C4E9",
  "#B39DDB",
  "#9575CD",
  "#7E57C2",
  "#673AB7",
  "#5E35B1",
  "#512DA8",
  "#4527A0",
  "#311B92",
  "#B388FF",
  "#7C4DFF",
  "#651FFF",
  "#6200EA",
  "#E8EAF6",
  "#C5CAE9",
  "#9FA8DA",
  "#7986CB",
  "#5C6BC0",
  "#3F51B5",
  "#3949AB",
  "#303F9F",
  "#283593",
  "#1A237E",
  "#8C9EFF",
  "#536DFE",
  "#3D5AFE",
  "#304FFE",
  "#E3F2FD",
  "#BBDEFB",
  "#90CAF9",
  "#64B5F6",
  "#42A5F5",
  "#2196F3",
  "#1E88E5",
  "#1976D2",
  "#1565C0",
  "#0D47A1",
  "#82B1FF",
  "#448AFF",
  "#2979FF",
  "#2962FF",
  "#E1F5FE",
  "#B3E5FC",
  "#81D4FA",
  "#4FC3F7",
  "#29B6F6",
  "#03A9F4",
  "#039BE5",
  "#0288D1",
  "#0277BD",
  "#01579B",
  "#80D8FF",
  "#40C4FF",
  "#00B0FF",
  "#0091EA",
  "#E0F7FA",
  "#B2EBF2",
  "#80DEEA",
  "#4DD0E1",
  "#26C6DA",
  "#00BCD4",
  "#00ACC1",
  "#0097A7",
  "#00838F",
  "#6064",
  "#84FFFF",
  "#18FFFF",
  "#00E5FF",
  "#00B8D4",
  "#E0F2F1",
  "#B2DFDB",
  "#80CBC4",
  "#4DB6AC",
  "#26A69A",
  "#9688",
  "#00897B",
  "#00796B",
  "#00695C",
  "#004D40",
  "#A7FFEB",
  "#64FFDA",
  "#1DE9B6",
  "#00BFA5",
  "#E8F5E9",
  "#C8E6C9",
  "#A5D6A7",
  "#81C784",
  "#66BB6A",
  "#4CAF50",
  "#43A047",
  "#388E3C",
  "#2E7D32",
  "#1B5E20",
  "#B9F6CA",
  "#69F0AE",
  "#00E676",
  "#00C853",
  "#F1F8E9",
  "#DCEDC8",
  "#C5E1A5",
  "#AED581",
  "#9CCC65",
  "#8BC34A",
  "#7CB342",
  "#689F38",
  "#558B2F",
  "#33691E",
  "#CCFF90",
  "#B2FF59",
  "#76FF03",
  "#64DD17",
  "#F9FBE7",
  "#F0F4C3",
  "#E6EE9C",
  "#DCE775",
  "#D4E157",
  "#CDDC39",
  "#C0CA33",
  "#AFB42B",
  "#9E9D24",
  "#827717",
  "#F4FF81",
  "#EEFF41",
  "#C6FF00",
  "#AEEA00",
  "#FFFDE7",
  "#FFF9C4",
  "#FFF59D",
  "#FFF176",
  "#FFEE58",
  "#FFEB3B",
  "#FDD835",
  "#FBC02D",
  "#F9A825",
  "#F57F17",
  "#FFFF8D",
  "#FFFF00",
  "#FFEA00",
  "#FFD600",
  "#FFF8E1",
  "#FFECB3",
  "#FFE082",
  "#FFD54F",
  "#FFCA28",
  "#FFC107",
  "#FFB300",
  "#FFA000",
  "#FF8F00",
  "#FF6F00",
  "#FFE57F",
  "#FFD740",
  "#FFC400",
  "#FFAB00",
  "#FFF3E0",
  "#FFE0B2",
  "#FFCC80",
  "#FFB74D",
  "#FFA726",
  "#FF9800",
  "#FB8C00",
  "#F57C00",
  "#EF6C00",
  "#E65100",
  "#FFD180",
  "#FFAB40",
  "#FF9100",
  "#FF6D00",
  "#FBE9E7",
  "#FFCCBC",
  "#FFAB91",
  "#FF8A65",
  "#FF7043",
  "#FF5722",
  "#F4511E",
  "#E64A19",
  "#D84315",
  "#BF360C",
  "#FF9E80",
  "#FF6E40",
  "#FF3D00",
  "#DD2C00",
  "#EFEBE9",
  "#D7CCC8",
  "#BCAAA4",
  "#A1887F",
  "#8D6E63",
  "#795548",
  "#6D4C41",
  "#5D4037",
  "#4E342E",
  "#3E2723",
  "#FAFAFA",
  "#F5F5F5",
  "#EEEEEE",
  "#E0E0E0",
  "#BDBDBD",
  "#9E9E9E",
  "#757575",
  "#616161",
  "#424242",
  "#212121",
  "#ECEFF1",
  "#CFD8DC",
  "#B0BEC5",
  "#90A4AE",
  "#78909C",
  "#607D8B",
  "#546E7A",
  "#455A64",
  "#37474F",
  "#263238",
  "#0",
];
let hueColor = [];

function getHueColor() {
  let hue = 0;
  for (let i = 0; i < 360; i++) {
    hue++;
    hueColor.push(`hsl(${hue}, 100%, 50%)`);
  }
}
getHueColor();

let randColor = [colorsArray];

class Particles {
  constructor(x, y, color) {
    this.x = x + Math.sin(anglex2);
    // Math.random() * window.innerWidth;
    // Math.random() * window.innerHeight;
    this.y = y + Math.cos(anglex2);
    this.baseX = this.x;
    this.baseY = this.y;
    this.size =  Math.random() * settings.Particles_size + 1;
    this.speedX = Math.random() * settings.Speed - settings.Speed / 2;
    this.speedY = Math.random() * settings.Speed - settings.Speed / 2;
    this.color = color;
    this.density = settings.Density;
    this.spikesArr = [2, 3, 4, 5, 6, 7, 8];
    this.spikesVal =
      this.spikesArr[Math.floor(Math.random() * this.spikesArr.length)];
    this.spikes = this.spikesVal;
    this.inset = 0.5;
    this.globalAlpha = settings.Opacity;
  }
  update() {
    if (!Blink) {
      opacElement.updateDisplay();
    }

    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.size > window.innerWidth || this.x - this.size < 0)
      this.speedX = -this.speedX;

    if (this.y + this.size > window.innerHeight || this.y + this.size < 0) {
      this.speedY = -this.speedY;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = settings.Opacity;
    ctx.fill();
  }


  drawRandShapes() {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(anglex2);
    ctx.moveTo(0, 0 - this.size);

    for (let i = 0; i < this.spikes; i++) {
      ctx.rotate(Math.PI / this.spikes);
      ctx.lineTo(0, 0 - this.size * this.inset);
      ctx.rotate(Math.PI / this.spikes);
      ctx.lineTo(0, 0 - this.size);
    }
    ctx.restore();
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = settings.Opacity;
  }

  changeColor() {
    let lastArrayofColor =
      randColor[Math.floor(Math.random() * randColor.length)];
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].color =
        lastArrayofColor[Math.floor(Math.random() * lastArrayofColor.length)];
    }
  }

  returnColor() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].color = settings.Particles_Color;
    }
  }

  particlesSize() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].size = Math.random() * settings.Particles_size + 1;
    }
  }
  particlesColor() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].color = settings.Particles_Color;
    }
  }
  particleSpeed() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].speedX =
        Math.random() * settings.Speed - settings.Speed / 2;
      particlesArray[i].speedY =
        Math.random() * settings.Speed - settings.Speed / 2;
    }
  }
  pushParticles() {
    dx = mouse.x - this.x;
    dy = mouse.y - this.y;
    distance = Math.sqrt(dx * dx + dy * dy);
    forceDirectionX = dx / distance;
    forceDirectionY = dy / distance;
    maxDistance = mouse.radius;
    force = (maxDistance - distance) / maxDistance;
    directionX = forceDirectionX * force * settings.Density;
    directionY = forceDirectionY * force * settings.Density;
    if (drawing === true && distance < settings.Mouse) {
      this.x -= directionX;
      this.y -= directionY;

      if (this.y + this.size > window.innerHeight || this.y + this.size < 0) {
        this.y += directionY;
      }
      if (this.x + this.size > window.innerWidth || this.x - this.size < 0) {
        this.x += directionX;
      }
    }
  }

  magnetParticles() {
    dx = mouse.x - this.x;
    dy = mouse.y - this.y;
    distance = Math.sqrt(dx * dx + dy * dy);
    forceDirectionX = dx / distance;
    forceDirectionY = dy / distance;
    maxDistance = mouse.radius;
    force = (maxDistance - distance) / maxDistance;
    directionX = forceDirectionX * force * settings.Density;
    directionY = forceDirectionY * force * settings.Density;
    if (drawing === true && distance < settings.Mouse) {
      this.x += directionX / 2;
      this.y += directionY / 2;
      if (this.y + this.size > window.innerHeight || this.y + this.size < 0) {
        this.y += directionY;
      } else if (
        this.x + this.size > window.innerWidth ||
        this.x - this.size < 0
      ) {
        this.x += directionX;
      }
    }
  }
}

function BlinkEffect() {
  if (Blink) {
    if (fadeIn) {
      settings.Opacity += 0.01;
      if (settings.Opacity > 0.9) {
        fadeIn = false;
        settings.Opacity = 0.9;
      }
    } else {
      settings.Opacity -= 0.01;
      if (settings.Opacity < 0.2) {
        fadeIn = true;
        settings.Opacity = 0.2;
      }
    }
  }
}
// Starting Animation

function handle() {
  for (var i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();

    if (NotRandomShape) {
      particlesArray[i].draw();
    } else {
      particlesArray[i].drawRandShapes();
    }
  }
}

function trailEffect() {
  if (isTrail) {
    spliArr = settings.Background.split(",");
    spliArr.pop();
    colorText = spliArr.toString();
    ctx.fillStyle = `${colorText},0.1)`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  } else {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
function animate() {
  trailEffect();
  BlinkEffect();
  stats.begin();
  handle();
  SomeRandFunction();
}

function SomeRandFunction() {
  document.body.style.background = settings.Background;
  anglex2 += 0.1;
  requestAnimationFrame(animate);
  if (push === true) {
    for (let i = 0; i < particlesArray.length; i++) {
      root.pushParticles();
    }
  }

  stats.end();
}
let root;
function init() {
  for (var i = 0; i < settings.Particles; i++) {
    root = new Particles(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight,
      settings.Particles_Color
    );
    root.density = settings.Density;
    particlesArray.push(root);
  }
}
init();
function particleCounter(){
  const ParticlesCounter = document.querySelector("h5");
  ParticlesCounter.style.textAlign = "center";
  ParticlesCounter.innerText = `${particlesArray.length} \n Particles`;
  particlesUpdater.updateDisplay();
}
particleCounter();
animate();

// <-- svg->
document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <svg>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      `
);

window.onload = () => {
  const elementx = document.querySelectorAll("input");
  elementx.forEach((elem) => {
    elem.setAttribute("readonly", true);
    elem.style.pointerEvents = "none";
  });
  const datGuiElementsName = document.querySelectorAll(".property-name");
  datGuiElementsName.forEach((elem) => {
    elem.style.userSelect = "none";
  });
};

// window.onload = function (){

// // const dChild = document.querySelector('.dg.main.a').firstChild;
// // dChild.remove();
// // }

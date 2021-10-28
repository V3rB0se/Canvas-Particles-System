const tl = gsap.timeline();
tl.from(".l-text", {
  y: 50,
  opacity: 0,
  duration: 2,
});

tl.to(".l-text", {
  y: -50,
  opacity: 0,
  delay: 2,
  duration: 2,
});
tl.to(".loading", {
  scaleY: 0,
  transformOrigin: "bottom",
  ease: Expo.easeInOut,
  duration: 1,
});
tl.to(
  ".load-back",
  {
    scaleY: 0,
    transformOrigin: "top",
    ease: Expo.easeInOut,
    onComplete: hide,
  },
  "-=.2"
);
tl.from(".gsap-list", {
  y: 20,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});
tl.from(".opac", {
  opacity: 0,
  scale: 1.2,
  duration: 1.2,
});

//     const modalPop = () => {
//         const links = document.querySelectorAll('.menu-item');
//         const modals = document.querySelectorAll('.modal__simple');
//         links.forEach((link,i) => {

//             link.addEventListener('click', () => {
//                         for(let z = 0; z < modals.length; z++){
//                             if(modals[z].classList.contains('active')){
//                             modals[z].classList.remove('active');
//                     }

//                 }
//                 modals[i].classList.add('active');
//             })
//         })
//     }
//    const modalClose = () => {

//         const closes = document.querySelectorAll('.close-modal');
//         const modals = document.querySelectorAll('.modal__simple');
//         closes.forEach((close, i) => {
//             close.addEventListener('click', () => {

//                 modals[i].classList.remove('active');
//             })
//         })

//    }
//    modalPop();
//    modalClose();




// Canvas Grid
let hue = 0;
let particlesArray = [];
let hueArray = [];
let drawing = false;
let pressed = false;
let angle = 0;
let burst = false;
let isMouse  = false;
let shapeArray = [3, 2, 4, 5, 10];
let randShape = 3;
let removeLines = false;
let randColor = hueArray[Math.floor(Math.random() * hueArray.length)];
const mouse = {
  x: undefined,
  y: undefined,
  radius: 500,
};

addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
addEventListener("mousedown", () => {
  drawing = true;
});
addEventListener("mouseup", () => {
  drawing = false;
});
addEventListener("touchstart", (e) => {
  drawing = true;
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  
});
addEventListener('touchend', () => {
  drawing = false;
})
addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    pressed = !pressed;
  }
  if(e.key == 'b'){
    burst = !burst;
  }
  if(e.key == 'r'){
    removeLines = !removeLines;
  }
});
addEventListener('touchmove', e => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
})
addEventListener('resize', () => {
  init();
})
addEventListener('click', () => {
  randShape = shapeArray[Math.floor(Math.random() * shapeArray.length)];
  
})
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function getColr() {
  for (let i = 0; i < 360; i++) {
    hue++;
    hueArray.push(`hsl(${hue}, 100%, 50%)`);
  }
}
getColr();

class ParticleGrid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseX = this.x;
    this.baseY = this.y;
    this.cellSize = 15;
    this.color = hueArray[Math.floor(Math.random() * hueArray.length)];
    this.speedX = Math.sin(angle) * 2;
    this.speedY = Math.cos(angle) * 2;
    this.density = 50;
    this.baseColor = this.color;
    this.outset = 30;
    this.inset = 1.5;
    this.spikes = randShape;
    this.outsetRestore = 30;
  }
  draw() {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle );
    ctx.moveTo(0, 0 - this.outset);

    for (let i = 0; i < this.spikes; i++) {
      ctx.rotate(Math.PI / this.spikes);
      ctx.lineTo(0, 0 - this.outset * this.inset);
      ctx.rotate(Math.PI / this.spikes);
      ctx.lineTo(0, 0 - this.outset);
    }
    ctx.restore();
    // ctx.arc(this.x, this.y, this.cellSize, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.closePath();
  }
  update() {
    this.spikes = randShape;
    // this.x += this.speedX;
    // this.y += this.speedY;

    // if(this.x + this.outset > canvas.width || this.x - this.outset < 0)
    // this.speedX = -this.speedX;

    // if(this.y + this.outset > canvas.height || this.y - this.outset < 0)
    // this.speedY = -this.speedY;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (drawing === true && distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
      if (this.y + this.size > window.innerHeight || this.y + this.size < 0) {
        this.y += directionY;
    }
    if (this.x + this.size > window.innerWidth || this.x - this.size < 0) {
        this.x += directionX;
    }
      this.color = this.color;
      
    }
    
      if( pressed ){
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 5;
      }

      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 5;
      }
      }
      this.color = this.baseColor;
  }
}

let ParticleGridObj;

function init() {
  particlesArray = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (let y = 0; y < canvas.height; y += window.innerWidth > 768 ? 100 : 70) {
    for (let x = 0; x < canvas.width; x += window.innerWidth > 768 ? 100 : 70) {
      particlesArray.push(new ParticleGrid(x, y));
    }
  }
}
init();

function handleUpdate() {
  let distance;
  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.draw();
    particle.update();


    if( burst ){ 
      let dx = particle.x - (canvas.width / 2);
      let dy = particle.y - (canvas.height / 2);
      particle.x -= dx / 10 ;
      particle.y -= dy / 10 ;
     }

     if(particle.x == (canvas.width / 2)){
       particle.x += particle.speedX;
     }

     
     if(particle.y == (canvas.height / 2)){
      particle.y += particle.speedY;;
    }
    particlesArray.forEach((particle_dup) => {
      let dx = particle.x - particle_dup.x;
      let dy = particle.y - particle_dup.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      let pColors = [particle_dup, particle];
      if(removeLines && distance < 200 && !burst ){
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle_dup.x, particle_dup.y);
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke(); 
        ctx.closePath();
        particle.outset = 0;
      }
      else if (!removeLines){
        particle.outset = particle.outsetRestore;
      }

    })


  });
}

function animate(timeStamp) {
  angle += 0.1;
  handleUpdate();
  requestAnimationFrame(animate);
}


function hide() {
  const loading = document.querySelector(".loading");
  const back = document.querySelector(".load-back");
  loading.style.display = "none";
  back.style.display = "none";
  animate();
}

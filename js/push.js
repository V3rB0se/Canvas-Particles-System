var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const canvas = document.querySelector('canvas');
const settings = {
    Background: '#111',
    Particles_Color: 'rgba(255,255,255,1)',
    ColorFul: false,
    Mouse: 0,
    Particles: 0,
    Speed: 0, 
    Mouse_Interactivity: 0,
    Particles_size: 0,
    Liquid: false,
    Connect: false,
    Distance: 0,
    Effects: 'Magnet' 
}
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
    drawing = false;
const pi = Math.PI * 2;

gui = new dat.GUI({
    name: 'Particles System'
});

gui.add(settings, 'Effects', ['Magnet', 'Push']).setValue('Magnet').onChange(function (valueIs) {
    onChange();
    animationTree();
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
        cancelAnimationFrame(reqAniMag)
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


gui.add(settings, 'Connect').onChange(function (Checked) {
    function request() {
        if (Checked) {
            requestAni = requestAnimationFrame(request);
            for (var i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                for (var j = i; j < particlesArray.length; j++) {
                    let dxs, dys, distances;
                    dxs = particlesArray[i].x - particlesArray[j].x;
                    dys = particlesArray[i].y - particlesArray[j].y;
                    distances = Math.sqrt(dxs * dxs + dys * dys);

                    if (distances < settings.Distance) {
                        ctx.beginPath()
                        ctx.strokeStyle = particlesArray[i].color;
                        ctx.lineWidth = 2;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }

                }
            }
        } else {
            cancelAnimationFrame(requestAni);
        }
    }

    request();
});
gui.add(settings, 'Distance', 1, 500).setValue(50);
gui.add(settings, 'Liquid').onChange(value => {

    if (value) {
        dontConnect = true;
        canvas.style.filter = 'url(#goo)'
        for (i = 0; i < particlesArray.length; i++) {
            particlesArray[i].size = 20;
            settings.Particles_size = 20;
            gux.updateDisplay();
        }
    } else {
        canvas.style.filter = 'none';
    }
});
const colorUpdate = gui.add(settings, 'ColorFul').onChange(value => {
    value ? root.changeColor() : root.returnColor();
});
gui.addColor(settings, 'Background');
gui.addColor(settings, 'Particles_Color').onChange(() => {
    root.particlesColor();
    settings.ColorFul = false;
    colorUpdate.updateDisplay();
});
gui.add(settings, 'Particles', 10, 700).setValue(100).onChange(() => {
    particlesArray = [];
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    init();
    root.particlesSize();
    root.particleSpeed();
    root.particlesColor();
    let particlesCount = settings.Particles;
    document.querySelector('h5').innerText = `${particlesArray.length} \n Particles`
    settings.ColorFul ? root.changeColor() : root.returnColor();
});
const speedVar = gui.add(settings, 'Speed', 3, 100).setValue(3).onChange(() => {
    root.particleSpeed();
});
gui.add(settings, 'Mouse_Interactivity', 1, 100).setValue(40).onChange(() => {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].density = settings.Mouse_Interactivity;
    }
});
gui.add(settings, 'Mouse', 1, 500).setValue(500);
const gux = gui.add(settings, 'Particles_size', 0, 100).step(0.1).setValue(3).onChange(() => {
    root.particlesSize();
});

function reinit() {
    particlesArray = [];
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    init();
}
const mouse = {
    x: undefined,
    y: undefined,
    radius: settings.Mouse,
}




const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setTimeout(() => {
    canvas.classList.add('scaled');
}, 1000);


canvas.addEventListener('touchmove', (event) => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
    drawing = true;

});
canvas.addEventListener('touchstart', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    drawing = true;
})
canvas.addEventListener('touchend', () => {
    drawing = false;
})
addEventListener('resize', () => {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    particlesArray = [];
    init();
    settings.Speed = 3
    speedVar.updateDisplay();
})
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;

})
canvas.addEventListener('mousedown', (ev) => {
    if (window.matchMedia("(pointer: coarse)").matches) {
        ev.preventDefault()
        console.log(drawing);
    } else {

        drawing = true;
    }
})

canvas.addEventListener('mouseup', (evx) => {
    if (window.matchMedia("(pointer: coarse)").matches) {
        evx.preventDefault()
    } else {
        drawing = false;
    }
})


const colorsArray = ['#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744', '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057', '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9', '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF', '#6200EA', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE', '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF', '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#6064', '#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688', '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676', '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03', '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00', '#FFD600', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400', '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100', '#FF6D00', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238', '#0', ];



class Particles {
    constructor() {
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * window.innerHeight);
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * settings.Particles_size + 1;
        this.speedX = Math.random() * 0.6503870422473065;
        this.speedY = Math.random() * 0.6503870422473065;
        this.color = settings.Particles_Color;
        this.density = settings.Mouse_Interactivity;
    }
    update() {




        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.size > window.innerWidth || this.x - this.size < 0)
            this.speedX = -this.speedX;


        if (this.y + this.size > window.innerHeight || this.y + this.size < 0) {
            this.speedY = -this.speedY;
        }



        // if (this.x !== this.baseX ) {
        //     let dx = this.x - this.baseX;
        //     this.x -= dx / 5;
        // }
        // if (this.y !== this.baseY ) {
        //     let dy = this.y - this.baseY;
        //     this.y -= dy / 5;
        // }




    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = 0.5;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

    }
    changeColor() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        }
    }

    returnColor() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].color = settings.Particles_Color;
        }
    }

    particlesSize() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].size = settings.Particles_size;
        }
    }
    particlesColor() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].color = settings.Particles_Color;
        }
    }
    particleSpeed() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].speedX = Math.random() * (settings.Speed / 2);
            particlesArray[i].speedY = Math.random() * (settings.Speed / 2);
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
        directionX = forceDirectionX * force * settings.Mouse_Interactivity;
        directionY = forceDirectionY * force * settings.Mouse_Interactivity;
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
        directionX = forceDirectionX * force * settings.Mouse_Interactivity;
        directionY = forceDirectionY * force * settings.Mouse_Interactivity;
        if (drawing === true && distance < settings.Mouse) {
            this.x += directionX / 2;
            this.y += directionY / 2;
            if (this.y + this.size > window.innerHeight || this.y + this.size < 0) {
                this.y += directionY;
            } else if (this.x + this.size > window.innerWidth || this.x - this.size < 0) {
                this.x += directionX;
            }


        }
    }


}

function handle() {

    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

const animate = () => {
    stats.begin();
    document.body.style.background = settings.Background;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    handle();

    requestAnimationFrame(animate);
    if (hue == 360) {
        for (var i = 0; i < 360; i++) {
            hue--;
        }
    } else {
        hue += 0.2;
    }
    if (push === true) {
        for (let i = 0; i < particlesArray.length; i++) {
            root.pushParticles();
        }
    }
    stats.end();
}
let root;
const init = () => {
    for (var i = 0; i < settings.Particles; i++) {
        root = new Particles();
        root.density = settings.Mouse_Interactivity;
        particlesArray.push(root);
    }
}
init();
const ParticlesCounter = document.querySelector('h5');
ParticlesCounter.style.textAlign = 'center';
ParticlesCounter.innerText = `${particlesArray.length} \n Particles`;
animate();




// <-- svg->
document.body.insertAdjacentHTML('afterbegin', `
    <svg>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      `);
setTimeout(()=> {
  const elementx = document.querySelectorAll('input');
  elementx.forEach((elem)=>{
  elem.setAttribute('readonly', true);
})
},2000);



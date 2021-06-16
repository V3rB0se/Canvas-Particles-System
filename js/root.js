var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

let gui,
    colorFolder,
    speedFolder,
    colorCode,
    backgroundColor,
    controls,
    NumbersofParticles,
    ClearRectFunction,
    radiusofMouse,
    saveButton,
    image

const datGui = () => {
    gui = new dat.GUI({
        name: 'My GUI'
    });
    colorCode = {
        Color: '#7c6800',
        Stroke: '#1d1d1d',
        Background: '#fffa9a'
    };
    controls = {
        SpeedY: 0,
        SpeedX: 0,
    };
    radiusofMouse = {
        Radius: 0
    }

    saveButton = {
        Screenshot: (e) => {
            image = canvas.toDataURL('image/png');
            window.location.href = image;
        }
    }
    ClearRectFunction = {
        Clear: () => {
            if (!drawing) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)            
        }
    }
    };
    numberofRoots = {
        Particles: 1
    };
    //Number of Particles 
    
    colorFolder = gui.addFolder('Colors');
    speedFolder = gui.addFolder('Speed');
    NumbersofParticles = gui.addFolder('Number of Particles');
    gui.add(radiusofMouse, 'Radius', 20, 200).step(1).setValue(70);
    gui.add(saveButton, 'Screenshot');
    gui.add(ClearRectFunction, 'Clear');
    NumbersofParticles.add(numberofRoots, 'Particles', 1, 100).step(1).setValue(1);
    speedFolder.add(controls, 'SpeedX', .5, 1).step(0.1).setValue(0.5);
    speedFolder.add(controls, 'SpeedY', .5, 1).step(0.1).setValue(0.5);
    colorFolder.addColor(colorCode, 'Color');
    colorFolder.addColor(colorCode, 'Stroke');
    colorFolder.addColor(colorCode, 'Background').onChange(function(){
        canvas.style.background = colorCode.Background;
    });
}

datGui();








const backToHome = document.querySelector('.back-to-home');
backToHome.onclick = () => {
    window.location = 'index'
}


//Dom
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Canvas vwwidth vhheight 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = 0;
let drawing = false;
let edge = radiusofMouse.Radius;
const mouse = {
    x: undefined,
    y: undefined
}
canvas.addEventListener('mousemove', (event) => {
stats.begin();
    mouse.x = event.x;
    mouse.y = event.y;
    branchOut();
stats.end();
});
canvas.addEventListener('touchmove', (event) => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
    branchOut();
})
canvas.addEventListener('touchstart', function() {
    drawing = true;
});
canvas.addEventListener('touchend', () => {
    drawing = false;
})

class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw() {
        this.speedX += (Math.random() - controls.SpeedX) / 2;
        this.speedY += (Math.random() - controls.SpeedY) / 2;
        this.x += this.speedX;
        this.y += this.speedY;
        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const radius = (-distance / edge + 1) * edge / 10;
        if (radius > 0) {
		
            requestAnimationFrame(this.draw.bind(this));
            edge = radiusofMouse.Radius;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = colorCode.Color;
            ctx.fill();
            ctx.strokeStyle = colorCode.Stroke;
            ctx.stroke();
		

        }
    }
}
let root;
function branchOut() {
    if (drawing) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < numberofRoots.Particles; i++) {
           root = new Root(mouse.x, mouse.y, 'red', centerX, centerY);
            root.draw();

        }
        hue += 1;
    }

}
canvas.addEventListener('mousedown', () => {
    drawing = true;

})

canvas.addEventListener('mouseup', () => {
    drawing = false;
})
addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

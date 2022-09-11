var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let angle = 0;
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

function datGui(){
    gui = new dat.GUI({
        name: 'My GUI'
    });
    ShadowControl = {
        Shadow:false
    }
    colorCode = {
        Color: '#7c6800',
        Stroke: '#1d1d1d',
        Background: '#fffa9a'
    };
    controls = {
        SpeedY: 0,
        SpeedX: 0,
    };
    Shapes = {
        Triangle: false,
        Rectangle:false,
        Star: false,
        Arc:true 
    }
    radiusofMouse = {
        Radius: 0
    }

    saveButton = {
        Screenshot: (e) => {
            let link = document.createElement('a');
            link.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.download = 'Root.png';
            link.click();
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
    ShapesFolder = gui.addFolder('Shapes');
    NumbersofParticles = gui.addFolder('Roots');
    NumbersofParticles.add(radiusofMouse, 'Radius', 20, 200).step(1).setValue(70);
    gui.add(saveButton, 'Screenshot');
    gui.add(ClearRectFunction, 'Clear');
    NumbersofParticles.add(ShadowControl, 'Shadow').onChange((shadow) => {
        if(shadow){
            ctx.globalCompositeOperation = 'destination-over'
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#333';
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
        }
        else{
            ctx.globalCompositeOperation = 'destination-over'
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
    });
    NumbersofParticles.add(numberofRoots, 'Particles', 1, 100).step(1).setValue(1);
    speedFolder.add(controls, 'SpeedX', .5, 1).step(0.1).setValue(0.5);
    speedFolder.add(controls, 'SpeedY', .5, 1).step(0.1).setValue(0.5);
    colorFolder.addColor(colorCode, 'Color');
    colorFolder.addColor(colorCode, 'Stroke');
    const star = ShapesFolder.add(Shapes, 'Star').listen().onChange(function(){ShapesChange("Star")});
    const triangle = ShapesFolder.add(Shapes, 'Triangle').listen().onChange(function(){ShapesChange("Triangle")});
    const rect = ShapesFolder.add(Shapes, 'Rectangle').listen().onChange(function(){ShapesChange("Rectangle")});
    const arc = ShapesFolder.add(Shapes, 'Arc').listen().onChange(function(){ShapesChange("Arc")});

    colorFolder.addColor(colorCode, 'Background').onChange(function(){
        canvas.style.background = colorCode.Background;
    });
}

datGui();


function ShapesChange( arg ){
    for (let shape in Shapes){
      Shapes[shape] = false;
    }
    Shapes[arg] = true;
  }




const backToHome = document.querySelector('.back-to-home');
backToHome.onclick = () => {
    window.location = 'index'
}


//Dom

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
        this.x = x + Math.sin(angle);
        this.y = y + Math.cos(angle);
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
        this.inset = 2;
        this.spikes = 10;
    }
    draw() {
        this.speedX += Math.random() * controls.SpeedX - (controls.SpeedX / 2);
        this.speedY += Math.random() * controls.SpeedX - (controls.SpeedX / 2);
        this.x += this.speedX;
        this.y += this.speedY;
        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY) ;
        const radius = (-distance / edge + 1) * edge / 10 ;
        if (radius > 0) {
		    angle += 0.1;
            requestAnimationFrame(this.draw.bind(this));
            edge = radiusofMouse.Radius;

            if(Shapes.Triangle){
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.moveTo(0, 0 - radius);
        
            for (let i = 0; i < 3; i++) {
              ctx.rotate(Math.PI / 3);
              ctx.lineTo(0, 0 - radius * this.inset);
              ctx.rotate(Math.PI / 3);
              ctx.lineTo(0, 0 - radius);
            }
            ctx.restore();
            ctx.fillStyle = colorCode.Color;
            ctx.fill();
            ctx.strokeStyle = colorCode.Stroke;
            ctx.stroke();
        }
        else if (Shapes.Star){
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.moveTo(0, 0 - radius);
        
            for (let i = 0; i < 5; i++) {
              ctx.rotate(Math.PI / 5);
              ctx.lineTo(0, 0 - radius * this.inset);
              ctx.rotate(Math.PI / 5);
              ctx.lineTo(0, 0 - radius);
            }
            ctx.restore();
            ctx.fillStyle = colorCode.Color;
            ctx.fill();
            ctx.strokeStyle = colorCode.Stroke;
            ctx.stroke();
        }
        else if (Shapes.Rectangle){
            ctx.beginPath();
            ctx.rect(this.x,this.y,radius, radius);
            ctx.fillStyle = colorCode.Color;
            ctx.fill();
            ctx.strokeStyle = colorCode.Stroke;
            ctx.stroke();
        }
        else if (Shapes.Arc){
            ctx.beginPath();
            ctx.arc(this.x,this.y,radius,0, Math.PI * 2, false);
            ctx.fillStyle = colorCode.Color;
            ctx.fill();
            ctx.strokeStyle = colorCode.Stroke;
            ctx.stroke();
        }
        
    }
        
    }
}
let root;
function branchOut() {
    if (drawing) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < numberofRoots.Particles; i++) {
           root = new Root(mouse.x, mouse.y, 'red', centerX , centerY);
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

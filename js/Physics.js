
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const btn01 = document.querySelector('.btn-01');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
        x:undefined,
        y:undefined
    }

    let drawing = false;

    addEventListener('mousemove', event => {
        mouse.x = event.x;
        mouse.y = event.y;
        
        if(drawing){
            for(let i = 0; i < 1; i++){
                particlesArray.push(new Particles());
            }
        }
    });

    addEventListener('mouseup', () => {
        drawing = false;
    })

    addEventListener('mousedown', () => {
        drawing = true;
    })
    addEventListener('touchstart', () => {
        drawing = true;
    })

    addEventListener('touchend', () => {
        drawing = false;
    })
    addEventListener('touchmove', event => {
         mouse.x = event.touches[0].clientX;
         mouse.y = event.touches[0].clientY;
        
        if(drawing){
            for(let i = 0; i < 1; i++){
                particlesArray.push(new Particles());
            }
        }
    });
    addEventListener('resize', () => {
        resizeInit();
    })



    function resizeInit() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesArray = [];
        keypress = false; 
    }

    function smartPhone () {
        

        btn01.addEventListener('click', () => {
           keypress = !keypress

           if (keypress){
               btn01.innerText = `Bounce on`
           }
           else {
               
            btn01.innerText = `Bounce Off`
           }
        })
        
    }
    smartPhone();
    let particlesArray = [];
    let hue = 0;
    let keypress = false;

    class Particles {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.windowPy =  window.innerWidth;
            this.windowPx =  window.innerHeight;
            this.radius = window.innerWidth < 768 ?  5  : 20 ;
            this.speedX = 0;
            this.speedY = Math.random() * 2 + 2;
            this.color = `hsl(${hue},100%,50%)`;
        }
        updateParticles() {
            this.speedY+=1;
            this.y += this.speedY;


            if(this.y + this.radius > window.innerHeight || this.y + this.radius < 0){
                this.speedY = -this.speedY + 2;
                this.speedY+=0.8;
                this.radius -= 4;
            }
        }
        drawParticles() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
            ctx.fill();
        }
      
}

    addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            keypress = true;
        }
        if(event.keyCode === 97){
            keypress = false; 
        }
    })

    function handleAnimation () {
        for(let i = 0; i < particlesArray.length; i++){
          particlesArray[i].drawParticles();
            if(keypress){
                particlesArray[i].updateParticles();
                
            }

            if(particlesArray[i].radius  <= 0.3){
                particlesArray.splice(i, 1);
                i--;
            }
        }
        
    }



    function animateIt() {
       ctx.fillStyle = 'rgba(0,0,0,0.2)';
       ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
        handleAnimation();
        requestAnimationFrame(animateIt);
        hue++;
        if(keypress){
            btn01.style.background = `hsl(${hue},100%,50%)`;
        }
    }
    animateIt()

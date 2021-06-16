const tl = gsap.timeline();
tl.from('.l-text', {
    y:50,
    opacity:0,
    duration:2,
});

tl.to('.l-text', {
    y:-50,
    opacity:0,
    delay:2,
    duration:2
});
tl.to('.loading', {
    scaleY: 0,
    transformOrigin: "bottom",
    ease: Expo.easeInOut,
    duration:1,
});
tl.to('.load-back', {
    scaleY: 0,
    transformOrigin: "top",
    ease: Expo.easeInOut,
    onComplete:hide 
}, "-=.2");
tl.from('.gsap-list', {
    y: 20,
    opacity: 0,
    stagger: .2,
    duration:1
})
tl.from('.opac', {
    opacity: 0,
    scale: 1.2,
    duration:1.2,
})

//     const modalPop = () => {
//         const links = document.querySelectorAll('.link');
//         const modals = document.querySelectorAll('.modal__simple');
//         links.forEach((link,i) => {
       
//             link.addEventListener('click', () => {
//                         for(let z = 0; z < modals.length; z++){
//                             if(modals[z].classList.contains('active') === true){
//                                 console.log('pp');
//                         modals[z].classList.remove('active');
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
let textColor = 0;
let particlesArray = [];
let root = document.documentElement;

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hue = 0;
   
 
    

    addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })
   


   
    

    let xx = window.innerWidth / 2,yy = window.innerHeight / 2;
    const radius = 55;
    let speedXx = 30;
    let speedYy = 30;


    function animation(){
        
        ctx.beginPath();
        ctx.rect(xx,yy,radius,radius);
        ctx.fillStyle = `hsl(${hue},100%,50%)`;
        ctx.fill();
        ctx.closePath();
        // handle();
        requestAnimationFrame(canvasAnimate);
        hue++;


        if(xx + radius > innerWidth || xx + radius < 0){
            speedXx = -speedXx 
        }

        if(yy + radius > innerHeight || yy + radius < 0){
            speedYy = -speedYy 
        }

        xx+=speedXx;
        yy+=speedYy;
        
}



    const canvasAnimate = () => {
        animation()
    }
    function hide(){
        const loading = document.querySelector('.loading');
        const back = document.querySelector('.load-back');
        loading.style.display = 'none'; 
        back.style.display = 'none'; 
        canvasAnimate();
    }

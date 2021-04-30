const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isjumping = false;
let position = 0;

function handlerKeyUp(evento){
    if(evento.code === "Space"){
        if(!isjumping){
            jump();
        }
    }
}

function jump(){

    isjumping = true;

    let upInterval = setInterval(()=>{
        if(position >= 180){
            clearInterval(upInterval)

            //Descendo
            let downInterval = setInterval(()=>{
               
                if(position <=0){
                    clearInterval(downInterval);
                    isjumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            });
    
        }else{
            //Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
        
    }, 20);

}

function createCactus(){
    const cactus = document.createElement('div');
    let cactussPosition = 1000;
    let randomtime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactussPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        if(cactussPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactussPosition > 0 && cactussPosition < 60 && position < 60){
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';

        }else{
            cactussPosition -= 10;
            cactus.style.left = cactussPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randomtime);
}

createCactus();
document.addEventListener('keyup', handlerKeyUp)
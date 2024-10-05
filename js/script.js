const targetArea = document.getElementById('jokuaren_eremua');
const scoreBoard = document.getElementById('puntuak');
const bulletkop = document.getElementById('balaMarkagailu');
const ppmboard = document.getElementById('prezisioa');

let puntuazioa = 0;
let gameInterval;
let speedFactor = 0.6;
let bulletTime = 1;
let totalPoints = 0;
let biderkatzailea=1;
let aurrekoSpeed;
let bulletTimeComprado = false;
let balaKopuru= parseInt(bulletkop.getAttribute('kopbala'));
let kargagailua = parseInt(balaKopuru);
let errekargaSpeed = 5000;
let lortutakoPuntuak = 0;
let emanda= 0;
let disparatuta = 0;

startGame();

function startGame() {
    scoreBoard.textContent = puntuazioa;
    targetArea.innerHTML = ''; 

    gameInterval = setInterval(() => {
            let random=Math.floor(Math.random() * 3)+1;
            for (let i=0; i<random;i++){
                createTarget();
            }
    }, 1000 / speedFactor);
}

function createTarget() {
    const diana = document.createElement('div');
    diana.classList.add('diana');

    const x = Math.random() * (targetArea.offsetWidth - 50);
    const y = Math.random() * (targetArea.offsetHeight - 50);

    diana.style.left = x + 'px';
    diana.style.top = y + 'px';

    targetArea.appendChild(diana);

    setTimeout(() => {
        if (diana.parentElement) diana.remove();
    }, 1000 / speedFactor);

    diana.addEventListener('click', (event) => {
        if(balaKopuru!=0){
           puntuazioa+=lortutakoPuntuak+(1*biderkatzailea);
            scoreBoard.textContent = puntuazioa;
            emanda++;
            PrezisioaAktualizatu();
            diana.remove(); 
        }
    });
}

function bulletTimeEvent(){
    if (!bulletTimeComprado) {
        console.log('No tienes Bullet Time comprado.');
        return;
    }

    console.log('Bullet Time activado');
    aurrekoSpeed = speedFactor;
    speedFactor = 0.5;
    clearInterval(gameInterval);

    gameInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < random; i++) {
            createTarget();
        }
    }, 1000 / speedFactor);

    setTimeout(() => {
        console.log('Bullet Time desactivado');
        speedFactor = aurrekoSpeed;
        clearInterval(gameInterval);
        startGame();
    }, 10000);
}

addEventListener('keydown', function(event){
    console.log(event.key);
    if(event.key == 'F' || event.key == 'f'){
        console.log('Se pulso la letra F');
        bulletTimeEvent();
    }else{
        console.log('No se pulso la letra F');
    }
    if(event.key == 'R' || event.key == 'r'){
        errekargatu();
    }
    });

addEventListener('click', function(){
    if(balaKopuru==0){
        errekargatu();
    }else{
        balaKopuru--;
        disparatuta++;
        bulletkop.setAttribute('kopbala', balaKopuru);
        bulletkop.textContent = "Balak: " + balaKopuru;
        PrezisioaAktualizatu();
        if(balaKopuru==0){
            errekargatu();
        }    
    }
});

function errekargatu(){
    setTimeout(() => {
        balaKopuru = kargagailua;
        bulletkop.setAttribute('kopbala', balaKopuru);
        bulletkop.textContent = "Balak: " + balaKopuru;
    }, errekargaSpeed);
}

function PrezisioaKalkulatu() {
    if (disparatuta === 0) return 0;
    return (emanda / disparatuta) * 100;
}

function PrezisioaAktualizatu() {
    const prezisioa = PrezisioaKalkulatu().toFixed(2);
    ppmboard.textContent = `Prezisioa: ${prezisioa}%`;
}

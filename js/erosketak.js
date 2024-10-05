const ErostekoObjetuak = document.querySelectorAll('.hobekuntza-zerrenda');
const puntuazioak = document.getElementById('puntuak');

ErostekoObjetuak.forEach(objektua => {
    objektua.addEventListener('click', () => {
        const prezioa = parseInt(objektua.getAttribute('data-precio'));
        const n= parseInt(objektua.getAttribute('erosketa_max'));
        puntuazioa = parseInt(puntuazioak.textContent);

        if(parseInt(objektua.getAttribute('erosketa_kopuru'))<parseInt(objektua.getAttribute('erosketa_max'))){
            if (puntuazioa >= prezioa) {
                puntuazioa -= prezioa; 
                puntuazioak.textContent = puntuazioa;
                objektua.setAttribute('data-precio',prezioa*1.15^n);
                objektua.textContent = objektua.getAttribute('izena') + " - " + objektua.getAttribute('data-precio') + " Puntu";
                objektua.setAttribute('erosketa_kopuru',parseInt(objektua.getAttribute('erosketa_kopuru'))+1);

                hobekuntzakIzan(objektua.getAttribute('izena'));

                if(parseInt(objektua.getAttribute('erosketa_kopuru'))==parseInt(objektua.getAttribute('erosketa_max'))){
                    disableObjektua(objektua);
                    objektua.textContent = objektua.getAttribute('izena') + " - Maxeatuta";
                }
            } else {
                alert('Ez duzu puntuazio nahikorik!');
            }
        }
        
    });
});

function disableObjektua(objektua){
    objektua.setAttribute('style', 'background-color: gold; pointer-events: none; color: black;');
}

function hobekuntzakIzan(hobekuntzaIzena){
    switch (hobekuntzaIzena) {
        case 'Biderkatzailea':
            biderkatzailea++;
            break;
        case 'Bullet time':
            bulletTimeComprado = true
            break;
        case 'Kargagailua handitu':
            console.log('Kargagailua handitu aplicado');
            break;
        case 'Karga azkarra':
            console.log('Karga azkarra aplicado');
            break;
        default:
            console.log('Mejora desconocida');
    }
}


const mapaZerrendak = document.querySelectorAll('.mapa-zerrenda');
const jokoarenEremua = document.getElementById('jokoa');

mapaZerrendak.forEach(zerrenda => {
    zerrenda.addEventListener('click', () => {
        const mapaRuta = zerrenda.getAttribute('data-mapa');
        jokoarenEremua.style.backgroundImage = `url(${mapaRuta})`;
        jokoarenEremua.style.backgroundSize = 'cover'; 
        jokoarenEremua.style.backgroundPosition = 'center'; 
    });
});



let targetInterval;
let currentMap = 1; // Mapa aktuala gordetzeko


mapaZerrendak.forEach((zerrenda, index) => {
    zerrenda.addEventListener('click', () => {
        const mapaRuta = zerrenda.getAttribute('data-mapa');
        currentMap = index + 1; // Mapa zenbakia gordetzeko
        jokoarenEremua.style.backgroundImage = `url(${mapaRuta})`;
        jokoarenEremua.style.backgroundSize = 'cover'; 
        jokoarenEremua.style.backgroundPosition = 'center'; 

        // Mapa bakoitzaren abiadura egokitzeko deia
        changeTargetSpeed(currentMap);
    });
});

// Helburuen abiadura aldatzeko funtzioa
function changeTargetSpeed(map) {
    clearInterval(targetInterval); // Aurreko tartea garbitu

    let speed; // Mapa arabera abiadura ezarriko da
    switch(map) {
        case 1:
            speed = 2000; // 1. mapa, helburuak motelago (2 segundo)
            break;
        case 2:
            speed = 1500; // 2. mapa, azkarrago (1.5 segundo)
            break;
        case 3:
            speed = 1000; // 3. mapa, oraindik azkarrago (1 segundo)
            break;
        case 4:
            speed = 500;  // 4. mapa, zailtasun maila maximoa (0.5 segundo)
            break;
        default:
            speed = 2000; // Ezarpen lehenetsia
    }

    // Helburuak sortzeko tarte berria konfiguratu
    targetInterval = setInterval(createTarget, speed);
}

// Helburuak sortzeko funtzioa (bolak)
function createTarget() {
    const diana = document.createElement('div');
    diana.classList.add('diana');
    
    // Joko eremuaren barruan posizio aleatorioa
    const posX = Math.floor(Math.random() * (jokoarenEremua.offsetWidth - 50));
    const posY = Math.floor(Math.random() * (jokoarenEremua.offsetHeight - 50));
    
    diana.style.left = `${posX}px`;
    diana.style.top = `${posY}px`;

    // Klik egitean diana ezabatzeko ekitaldia
    diana.addEventListener('click', () => {
        diana.remove();
        puntuazioa += 1; // Puntuak handitu klik egitean
        puntuazioak.textContent = puntuazioa;
    });

    // Diana joko eremuan gehitu
    document.getElementById('jokuaren_eremua').appendChild(diana);

    // 3 segundo igaro ondoren, helburua ezabatu klik egin ez bada
    setTimeout(() => {
        diana.remove();
    }, 3000);
}

// Hasieran helburuen tartea mapa lehenetsiarekin
changeTargetSpeed(currentMap);

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
    clearInterval(gameInterval); // Aurreko tartea garbitu

    switch(map) {
        case 1:
            speedFactor = 0.6;
            break;
        case 2:
            speedFactor = 0.8;
            break;
        case 3:
            speedFactor = 1;
            break;
        case 4:
            speedFactor = 1.2;
            break;
        default:
            speedFactor = 1.5;
    }

    startGame();
}

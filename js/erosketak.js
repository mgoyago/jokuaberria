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
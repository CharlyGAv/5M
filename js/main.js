document.addEventListener('DOMContentLoaded', () => {
    const stem = document.getElementById('stem');
    const leaf1 = document.getElementById('leaf1');
    const leaf2 = document.getElementById('leaf2');
    const bud = document.getElementById('bud');
    const petals = document.getElementById('petals');
    const narrative = document.getElementById('growth-narrative');

    const phrases = [
        "Primero, echa raíces...",
        "Se fortalece...",
        "Toma forma...",
        "Con paciencia...",
        "¡Florece!"
    ];

    function animate(element, delay, text) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (element) {
                    element.style.transition = 'opacity 2s ease-in-out';
                    element.style.opacity = '1';
                    // Animación para los pétalos más lenta
                    if (element.id === 'petals') {
                        element.style.transition = 'all 1.5s ease-in-out';
                        element.style.transform = 'scale(1.1)';
                        setTimeout(() => { 
                            element.style.transform = 'scale(1)'; 
                        }, 500);
                    }
                }
                if (text && narrative) {
                    narrative.textContent = text;
                    narrative.style.animation = 'fadeInText 1.5s forwards';
                }
                resolve();
            }, delay);
        });
    }

    async function startAnimation() {
        // Pausa inicial más larga
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Animación del tallo más lenta
        await animate(stem, 0, phrases[0]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Animación de las hojas más lenta
        await animate(leaf1, 0, phrases[1]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await animate(leaf2, 0, phrases[2]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Animación del capullo más lenta
        await new Promise(resolve => {
            if (bud) {
                bud.style.opacity = '1';
                let size = 0;
                const growInterval = setInterval(() => {
                    size += 0.3; // Hacer que crezca más lento
                    bud.setAttribute('rx', size);
                    bud.setAttribute('ry', size * 1.5);
                    if (size >= 8) {
                        clearInterval(growInterval);
                        resolve();
                    }
                }, 80); // Aumentar el intervalo para que crezca más despacio
            } else {
                resolve();
            }
        });
        
        // Mostrar texto del capullo con más tiempo
        if (narrative) {
            narrative.textContent = phrases[3];
            narrative.style.animation = 'fadeInText 1.5s forwards';
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        // Animación de los pétalos más lenta
        await animate(petals, 0, phrases[4]);
        
        // Mantener el mensaje final por más tiempo
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Iniciar animación
    startAnimation();
});

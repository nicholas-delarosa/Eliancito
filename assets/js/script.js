document.addEventListener("DOMContentLoaded", function () {
    const backgroundAudio = document.getElementById("background-audio");
    const mediaElements = document.querySelectorAll(".media");
    let lastAudioTime = 0;
    
    // Intenta reproducir el audio en cuanto el usuario haga clic en cualquier parte de la página
    function enableAudioPlayback() {
        backgroundAudio.play().then(() => {
            console.log("Audio de fondo activado");
        }).catch(error => {
            console.log("El navegador bloqueó el autoplay:", error);
        });

        // Eliminamos el listener después de la primera interacción para no ejecutarlo varias veces
        document.removeEventListener("click", enableAudioPlayback);
    }

    // Agregamos el evento para que el usuario lo active con un clic en cualquier parte de la página
    document.addEventListener("click", enableAudioPlayback);

    mediaElements.forEach(media => {
        media.addEventListener("play", function () {
            if (!backgroundAudio.paused) {
                lastAudioTime = backgroundAudio.currentTime;
                backgroundAudio.pause();
            }
        });

        media.addEventListener("ended", function () {
            if (media.tagName === "VIDEO") {
                backgroundAudio.currentTime = lastAudioTime;
                backgroundAudio.play();
            }
        });
    });
});


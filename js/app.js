let botonJugar = document.querySelector(".button");
    let audioJugar = document.querySelector("audio");

    botonJugar.addEventListener("click", () => {
      audioJugar.setAttribute("src", "sound/shot.mp3");
      audioJugar.play();
      console.log(`Reproduciendo: ${audioJugar.src}`);
    });

let botonSalir = document.querySelector(".button1");
let audioSalir = document.querySelector("audio");

    botonSalir.addEventListener("click", () => {
      audioSalir.setAttribute("src", "sound/sinBalas.mp3");
      audioSalir.play();
      console.log(`Reproduciendo: ${audioSalir.src}`);
    });    

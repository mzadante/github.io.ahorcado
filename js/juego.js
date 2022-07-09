/**Variables Globales */
var tablero = document.getElementById("horca-1").getContext("2d");
var palabraSecreta;
var letras = [];
var letra;
var palabraCorrecta = "";
var errores = 7;
var contador = 0;
var palabra = 0;
var acerto = false;
var listadoPalabras = [
  "HTML",
  "JAVASCRIPT",
  "ALURA",
  "INTERNET",
  "COMPILAR",
  "HARDWARE",
  "SOFTWARE",
  "RED",
  "JAVA",
  "CONSOLA"
];

/*Funcion para elegir palabra para adivinar*/
function elegirPalabraSecreta() {
  var palabraElejida = listadoPalabras[Math.floor(Math.random() * listadoPalabras.length)];
  palabraSecreta = palabraElejida;
  console.log(palabraSecreta);
  palabra = palabraElejida.length;
  return palabraSecreta;
}
/*Funcion que dibuja las lineas segun la palabra a adivinar */
function dibujarLineas() {
  tablero.lineWidth = 3;
  tablero.linecap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#000000";
  tablero.beginPath();
  var ancho = 600 / palabraSecreta.length;
  for (let i = 0; i < palabraSecreta.length; i++) {
    tablero.moveTo(50 + ancho * i, 100);
    tablero.lineTo(90 + ancho * i, 100);
  }
  tablero.stroke();
  tablero.closePath();
}

/*Dibuja la letra correcta*/
function dibujarLetraCorrecta(index) {
  tablero.font = "bold 52px Inter";
  tablero.lineWidth = 3;
  tablero.linecap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#000000";

  ancho = 600 / palabraSecreta.length;
  tablero.fillText(palabraSecreta[index], 50 + ancho * index, 95);
}
/*Dibuja la letra incorrecta */
function dibujarLetraIncorrecta(letra, erroresLeft) {
  tablero.font = "bold 40px Inter";
  tablero.lineWidth = 3;
  tablero.linecap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#000000";

  tablero.fillText(letra, 40 + 40 * (10 - erroresLeft), 150, 40);
  console.log(erroresLeft + ' letra incorrecta');//erroresLeft muestra la letra incorrecta
}
/*Verifica letra clikada*/
function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
  } else {
    letras.push(key);
    return true;
  }
}
/*Agrega la letra correcta*/
function agregarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase();
  return palabraCorrecta;
}
/*Agrega la letra incorrecta*/
function agregarLetraIncorrecta(letra) {
  if (palabraSecreta.indexOf(letra) <= 0) {
    errores -= 1;
  }
  console.log(errores);/*muestra los errores de mayor a menor*/
  evaluarErrores();
}
/**Verifica si la letra clicada se debe o no incluir la letra y compararla con la palabraSecreta*/

document.onkeydown = (e) => {
  letra = e.key.toUpperCase();
  if (!verificarLetraClicada(e.key)) {
    if (palabraSecreta.includes(letra)) {
      console.log(letra);//muestra la letra clikada
      agregarLetraCorrecta(palabraSecreta.indexOf(letra));
      //dibuja la letra llamando a la funcion dibujar letra correcta
      for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
          dibujarLetraCorrecta(i);
        }
        contador += 1;

      }//si no agrega la letra incorrecta y la dibuja llamando a la funcion 
      //dibujar letra incorrecta
    } else {
      if (!verificarLetraClicada(e.key)) return;
      agregarLetraIncorrecta(letra);
      dibujarLetraIncorrecta(letra, errores);
    }
  }
}
/*accesando al boton Jugar*/
var btnJugar = document.getElementById('empezar');
btnJugar.addEventListener('click', iniciarJuego);

/*accesando al boton obtener palabra*/
var btnObtener = document.getElementById('jugar');
btnObtener.addEventListener('click', recargarPag);

/**Funcion recargar pagina*/
function recargarPag(event) {
  window.location.reload();
}
/**FUNCION QUE CAMBIA LA IMAGEN CUANDO PIERDES Y DESACTIVA EL CANVAS */
function perdistes() {
  image = document.getElementById('imagenes');
  image.src = 'img/ahorcado.png';
  var pCanvas = document.getElementById('p-canvas');
  pCanvas.innerHTML = '';
}

/*ejecutando las Funciones*/
/*Funcion iniciar juego*/
function iniciarJuego(event) {
  contador = 0;
  elegirPalabraSecreta();
  dibujarLineas();
  cambiaImagenStart();
  desabilitarBtn();
  evaluarAciertos(palabraSecreta);
}

/*Cambia la imagen de bienvenida a la horca inicial*/
function cambiaImagenStart() {
  var image = document.getElementById('imagenes');
  image.src = 'img/img0.png';
}
/*Desabilita el boton Jugar al iniciar la partida*/
function desabilitarBtn() {
  btnJugar.disabled = true;
}
/**Se supone que es una funcion que evalua el ganar el juego NO FUNCIONA */
/*function evaluarAciertos() {
  var cont=0;
  //console.log(contador);
     for (let i = 0; i < palabraSecreta.length; i++) {
      if(palabraSecreta[i]==letra)
      cont +=1;
    }

    if(cont == palabraSecreta.length){
      alert('ganaste')
      return Ganaste();
    }
    else{
      alert('perdiste')
      cont=0;
      return perdistes();
    }
  }
  */
/**funcion que cambia la imagen de que ganastes */
function Ganaste() {
  var youWin = document.getElementById('imagenes');
  youWin.src = 'img/ganaste.png';
  var pCanvas = document.getElementById('p-canvas');
  pCanvas.innerHTML = '';
}
/**Funcion que evalua los errores*/
function evaluarErrores() {
  switch (errores) {
    case 1:
      image = document.getElementById('imagenes');
      image.src = 'img/img7.png';
      window.alert('USTED PERDIO');
      perdistes();
      break;
    case 2:
      image = document.getElementById('imagenes');
      image.src = 'img/img6.png';
      break;
    case 3:
      image = document.getElementById('imagenes');
      image.src = 'img/img5.png';
      break;
    case 4:
      image = document.getElementById('imagenes');
      image.src = 'img/img4.png';
      break;
    case 5:
      image = document.getElementById('imagenes');
      image.src = 'img/img3.png';
      break;
    case 6:
      image = document.getElementById('imagenes');
      image.src = 'img/img2.png';
      break;
    case 7:
      image = document.getElementById('imagenes');
      image.src = 'img/img1.png';
      break;
  }
  evaluarAciertos(palabraSecreta);

}



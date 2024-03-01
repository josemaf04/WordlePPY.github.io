let intentos = 6;
let palabra = ""
const input = document.getElementById("guess-input");
const letras = document.getElementsByClassName("letra");
const borrar = document.getElementById("btn-borrar");
const button = document.getElementById("btn-enter");
let intento = [];
window.addEventListener("load", obtenerPalabra);
button.addEventListener("click", intentar);
borrar.addEventListener("click", doborrar);
function obtenerPalabra() {
  fetch('https://random-word-api.herokuapp.com/word?lang=es')
      .then(response => response.json())
      .then(data => {
           palabra = data[0].toUpperCase();
          if(palabra.length === 5 && !/[áéíóú]/.test(palabra)) {
            document.getElementById("loader").style.display= "none"  
            return
          } else {
              obtenerPalabra();
          }
      })
      .catch(error => console.error('Error:', error));
}

function doborrar() {
  let idletra="int"+intento.length
  document.getElementById(idletra).innerHTML=""
  intento.pop();
}

for (let i = 0; i < letras.length; i++) {
  letras[i].addEventListener("click", getletra);
}

function getletra(l) {
  if (intento.length < 5) {
    intento.push(l.target.value);
    let idletra="int"+intento.length
    let contletra = document.getElementById(idletra)
    contletra.innerHTML=l.target.value
    
  }
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function terminar(mensaje) {
  for (let i = 0; i < letras.length; i++) {
    letras[i].disabled=true;
  }
  borrar.disabled=true;
  button.disabled=true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}

function intentar() {
  const INTENTO = intento;
  if (intentos > 0 && intento.length === 5) {
    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    for (let i in palabra) {
      const SPAN = document.createElement("span");
      SPAN.className = "letter";
      if (INTENTO[i] === palabra[i]) {
        //VERDE
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#79b851";
      } else if (palabra.includes(INTENTO[i])) {
        //AMARILLO
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#f3c237";
      } else {
        //GRIS
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#a4aec4";
      }
      ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    if (INTENTO.join("") === palabra) {
      terminar("<h1>¡GANASTE!😀</h1>");
      return;
    }
    intentos--;
    if (intentos == 0) {
      terminar("<h1>¡PERDISTE!😖 <br/>la respuesta es: "+ palabra + "</h1>");
    }
    intento = [];
    for(i=1; i<=5; i++) {
      document.getElementById('int'+i).innerHTML = ""
    }
  }
}

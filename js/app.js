// Author:  Carlos Tessier
// Estudiante: Alfonso Álvarez
// Version: 1.0
// Date:    2024/10/01

// Variable para la ventana emergente
var myWindow;

// Variable para el temporizador
var timer;
// Número de segundos transcurridos
var count = 0;

document.addEventListener("DOMContentLoaded", function () {
  // Variables botones
  const btnInfo = document.getElementById("btnInfo");
  const btnUrl = document.getElementById("btnUrl");
  const btnClose = document.getElementById("btnClose");

  const url = document.getElementById("inputUrl");
  const btnBack = document.getElementById("btnBack");
  const btnForward = document.getElementById("btnForward");
  const btnRedirection = document.getElementById("btnRedirection");
  const redirection = document.getElementById("redirection");
  const btnStartTimer = document.getElementById("btnStartTimer");
  const btnStopTimer = document.getElementById("btnStopTimer");

  // Añadir eventos click a los botones

  // Muestra la información del navegador
  btnInfo.addEventListener("click", function () {
    infoNavegador();
  });

  // Función para abrir la ventana emergente
  let popupWindow; // Variable para almacenar la referencia de la ventana emergente
  btnUrl.addEventListener('click', function () {
    let inputUrl = url.value; // Obtiene el valor del campo de entrada
    if (!inputUrl){
      inputUrl = "https://www.educa.jcyl.es";
    }
    if (inputUrl) {
      popupWindow = window.open(inputUrl, '_blank', 'width=600,height=400');
    } else {
      alert("Por favor ingrese una URL válida.");
    }
  });

  // Cierra la ventana emergente
  btnClose.addEventListener("click", function () {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
    }
  });

  // Retroceder en el historial del navegador
  btnBack.addEventListener("click", function () {
    if (window.history) {
      window.history.back();
    }
  });

  // Avanzar en el historial del navegador
  btnForward.addEventListener("click", function () {
    if (window.history) {
      window.history.forward();
    }
  });

  // Temporizador (en milisegundos)
  btnStartTimer.addEventListener("click", function () {
    timer = setInterval(function () {
      count++;
      document.getElementById("counter").textContent = count;
    }, 1000);
  });

  btnStopTimer.addEventListener("click", function () {
    clearInterval(timer);
  });

  // Redirección con temporizador (en _blank lo abre en una pestaña nueva)
  btnRedirection.addEventListener("click", function () {
    redirection.textContent = "Redirigiendo a www.educa.jcyl.es en 5 segundos...";
    setTimeout(function () {
      window.open("https://www.educa.jcyl.es", "_blank");
    }, 5000);
  });

  actualizarPantalla();
});

// Función para actualizar el tamaño de la pantalla
function actualizarPantalla() {
  document.getElementById("width").textContent = window.innerWidth;
  document.getElementById("height").textContent = window.innerHeight;
}

// Evento de cambio de pantalla
// Si cambia el tamaño de la pantalla, llamamos de nuevo a la función actualizarPantalla
window.onresize = actualizarPantalla;

// Ver el estado de conexión
function verOnline(){
  const status = document.getElementById("status");
  if(navigator.onLine){
    status.textContent = "Conectado a Internet";
    status.style.color = "green"; // Color verde para conectado
  } else{
    status.textContent = "Desconectado de internet";
    status.style.color = "red"; // Color rojo para desconectado
  }
}

// Ver el estado de la conexión al cargar la página
verOnline();

// Escuchar eventos de conexión
window.addEventListener("online", verOnline);
window.addEventListener("offline", verOnline);

// Mostrar la información del navegador en una ventana emergente
function infoNavegador() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language || navigator.userLanguage;

  // Variables para el nombre y versión del navegador
  let browserName = "Desconocido";
  let browserVersion = "Desconocido";

  // Ver el navegador
    // Si es Chrome
    if ((verOffset = userAgent.indexOf("Chrome")) !== -1) {
      browserName = "Chrome";
      browserVersion = userAgent.substring(verOffset + 7);
    }

    // Si es Edge
    if ((verOffset = userAgent.indexOf("Edg")) !== -1) {
      browserName = "Edge";
      browserVersion = userAgent.substring(verOffset + 4);
    }

  // Ver el Sistema Operativo
  let os = "Desconocido";
  if (platform.indexOf("Win") !== -1) os = "Windows";
  else if (platform.indexOf("Mac") !== -1) os = "macOS";
  else if (platform.indexOf("Linux") !== -1) os = "Linux";
  else if (platform.indexOf("iPhone") !== -1 || platform.indexOf("iPad") !== -1) os = "iOS";
  else if (platform.indexOf("Android") !== -1) os = "Android";

  // Mostrar la información
  const infoDiv = document.getElementById('info');
  infoDiv.innerHTML = `
    <p><strong>Nombre del navegador: </strong> ${browserName}</p>
    <p><strong>Versión del navegador: </strong> ${browserVersion}</p>
    <p><strong>Sistema Operativo: </strong> ${os}</p>
    <p><strong>Idioma del navegador: </strong> ${language}</p>
  `;
}

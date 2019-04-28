
window.onload = init;
function init() {
    var divCalendario = document.getElementById('calendario');

    divCalendario.style.cursor = 'pointer';
    divCalendario.onclick = function() {
        openCalendario();
    };
}
function openCalendario(){
    window.location.href = "../categorias/calendario_menstrual/calendario.html";
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

window.onload = maxDate;
//Função para definir o max do input date como a data atual
function maxDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("ultima_menstruacao").setAttribute('max', today);
    document.getElementById("ultima_menstruacao").valueAsDate = new Date();
}
function exibirCalendario() {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;

    if(validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)){
        showCalendar(ultima_menstruacao, duracao_menstruacao, duracao_ciclo, currentMonth, currentYear);
        document.getElementById("resultado").style.visibility = "visible";
        window.location.href = "#resultado";
    }
}
function validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo) {
    if(!ultima_menstruacao){
        alert("Ops! A data da última menstruação não foi preenchida.");
        return false;
    }
    else if(!duracao_menstruacao){
        alert("Ops! A duração da menstruação não foi informada.");
        return false;
    }
    else if(!duracao_ciclo){
        alert("Ops! A duração do seu ciclo não foi informado.");
        return false;
    }
    return true;
}

// Função para definir o calendário
function next() {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;

    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    if(validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)){
        showCalendar(ultima_menstruacao, duracao_menstruacao, duracao_ciclo, currentMonth, currentYear);
    }
}
function previous() {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;

    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;

    if(validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)){
        showCalendar(ultima_menstruacao, duracao_menstruacao, duracao_ciclo, currentMonth, currentYear);
    }
}
function jump() {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;
    let selectYear = parseInt(document.getElementById("year").value);
    let selectMonth = parseInt(document.getElementById("month").value);

    if(validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)){
        showCalendar(ultima_menstruacao, duracao_menstruacao, duracao_ciclo, selectMonth, selectYear);
    }
}
function showCalendar(ul_menstruacao, menstruacao, ciclo, month, year) {
    //Ano selecionado
    let selectYear = document.getElementById("year");
    //Mês selecionado
    let selectMonth = document.getElementById("month");
    //Mês e ano selecionado
    let monthAndYear = document.getElementById("monthAndYear");
    //Primeiro dia do mês selecionado
    let firstDay = (new Date(year, month)).getDay();
    //Dias existentes no mês
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    //Recupera o corpo da tabela (Datas do calendário)
    let tbl = document.getElementById("calendar-body");

    //Limpa datas já carregadas
    tbl.innerHTML = "";

    //Preenche os campos com as informações do mês e ano selecionado
    monthAndYear.innerHTML = months[month] + "/ " + year;
    selectYear.value = year;
    selectMonth.value = month;

    //Cria todas as células
    let date = 1;
    for (let i = 0; i < 6; i++) {
        //Cria as linhas da tabela (semana)
        let row = document.createElement("tr");

        //Crias as céulas das linhas e a preenche com a data.
        for (let j = 0; j < 7; j++) {
            //Preenche com células vazias correspondente ao mês anterior ou próximo
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            //Se a variavel date for maior que os dias dos meses, fim de execução
            //pois o mês já foi todo preenchido
            else if (date > daysInMonth) {
                break;
            }
            //Caso não seja, cria uma nova célula e defini o texto nela
            else {
                //Pega a diferença em dias da última menstruação
                let dateCompair = new Date(year+"-"+(month+1)+"-"+date);
                let date_menstruacao = new Date(ul_menstruacao);
                let diffTime = Math.abs(date_menstruacao.getTime() - dateCompair.getTime());
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                calc = diffDays % ciclo;
                limitCicloAnt = ciclo - menstruacao;
                limitPos = parseInt(menstruacao) + 2;
                initOv = parseInt(menstruacao) + 5;
                limitOv = initOv + 5;
                initOvAnt = parseInt(ciclo) - menstruacao - 5;
                limitOvAnt = initOvAnt - 5;

                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);

                //Marca a data de hoje
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.style.border = "3px solid green";
                }
                //Marca a pré mestruação para 2 dias antes da data de menstruação do mesmo mês informado
                if(diffDays <= 2 && month == date_menstruacao.getMonth() && date_menstruacao.getTime() > dateCompair.getTime())
                    cell.classList.add("pre_menstruacao");
                //Marca data pós menstruação para os ciclos anteriores a data de menstruação
                else if((calc == ciclo - menstruacao || calc == ciclo - menstruacao - 1) && date_menstruacao.getTime() > dateCompair.getTime())
                    cell.classList.add("pos_menstruacao");
                //Marca data pós menstruação para os ciclos anteriores a data de menstruação
                else if((calc > menstruacao && calc <= limitPos) && date_menstruacao.getTime() < dateCompair.getTime())
                    cell.classList.add("pos_menstruacao");
                //Marca os dias pré menstruação para os ciclos anteriores a data de menstruação
                else if((calc == 1 || calc == 2) && date_menstruacao.getTime() > dateCompair.getTime() && diffDays > 2) 
                    cell.classList.add("pre_menstruacao");
                //Marca os dias pré menstruação para os ciclos posteriores a data de menstruação
                else if((calc == 0 || calc == ciclo -1) && date_menstruacao.getTime() < dateCompair.getTime() && diffDays > 2) 
                    cell.classList.add("pre_menstruacao");
                //Marca os dias de menstruação para cada ciclo posterior a data de menstruação
                else if(calc <= menstruacao && calc != 0 && date_menstruacao.getTime() < dateCompair.getTime())
                    cell.classList.add("dia_menstruacao");
                //Marca os dias de menstruação para cada ciclo anterior a data de mesntruação
                else if((calc == 0 || calc > limitCicloAnt) && date_menstruacao.getTime() > dateCompair.getTime())
                    cell.classList.add("dia_menstruacao");
                //Marca os dias de ovulação para cada ciclo posterior a data de mesntruação
                else if(calc > initOv && calc <= limitOv && date_menstruacao.getTime() < dateCompair.getTime())
                    cell.classList.add("ovulacao");
                //Marca os dias de ovulação para cada ciclo anterior a data de mesntruação
                else if(calc <= initOvAnt && calc > limitOvAnt && date_menstruacao.getTime() > dateCompair.getTime())
                    cell.classList.add("ovulacao");

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }
        //Adiciona a linha (semana) no calendário
        tbl.appendChild(row);

        
    }

}
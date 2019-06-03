let today = new Date();
let nearMenstruation = false;
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

let months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

window.onload = maxDate;
//Função para definir o max do input date como a data atual
function maxDate() {
    //Mantem as dicas visiveis caso volte de página
    if(localStorage.getItem('voltar') === 'true'){    
        exibirCalendario(true);
        localStorage.setItem('voltar', 'false');
    }
    else {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("ultima_menstruacao").setAttribute('max', today);
        document.getElementById("ultima_menstruacao").valueAsDate = new Date();
    }
}
function exibirCalendario(back = false) {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;

    if (validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)) {
        if(back) {
            ultima_menstruacao = localStorage.getItem("ultima_menstruacao");
            duracao_menstruacao = localStorage.getItem("duracao_menstruacao");
            duracao_ciclo =localStorage.getItem("duracao_ciclo");            
        }
        showCalendar(ultima_menstruacao, duracao_menstruacao, duracao_ciclo, currentMonth, currentYear);

        //Armazena no storage
        localStorage.setItem("ultima_menstruacao", ultima_menstruacao);
        localStorage.setItem("duracao_menstruacao", duracao_menstruacao);
        localStorage.setItem("duracao_ciclo", duracao_ciclo);

        gerarDicas(duracao_menstruacao, duracao_ciclo);
        document.getElementById("resultado").style.visibility = "visible";
        document.getElementById("resultado").style.display = "block";
        window.location.href = "#resultado-calendario";
    }
}
function validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo) {
    let dateCompair = new Date(ultima_menstruacao);

    if (eval(duracao_ciclo) < eval(duracao_menstruacao) + 4) {
        alert("Ops! A duração do ciclo está muito pequena.");
        return false;
    }
    if (duracao_menstruacao <= 0) {
        alert("Ops! A duração da menstruação não pode ser negativo ou igual a 0.");
        return false;
    }
    if (duracao_ciclo <= 0) {
        alert("Ops! O ciclo não pode ser negativo ou igual a 0.");
        return false;
    }
    if (duracao_ciclo > 45) {
        alert("Ops! A duração da menstruação está muito grande, o máximo é 20.");
        return false;
    }
    if (duracao_menstruacao > 20) {
        alert("Ops! O tamanho d0 ciclo está muito grande, o máximo é 45.");
        return false;
    }
    if (!ultima_menstruacao) {
        alert("Ops! A data da última menstruação não foi preenchida.");
        return false;
    }
    if (!ultima_menstruacao) {
        alert("Ops! A data da última menstruação não foi preenchida.");
        return false;
    }
    if (dateCompair.getTime() > today.getTime()) {
        alert("Ops! A data informada não pode ser superior a data de hoje.");
        return false;
    }
    if (!duracao_ciclo) {
        alert("Ops! A duração do seu ciclo não foi informado.");
        return false;
    }
    return true;
}
//Função para buscar dicas e preencher página inicial
function gerarDicas(duracao_menstruacao, duracao_ciclo) {
    // Div de dicas
    let dicas = document.getElementById("dicas");
    let post1 = document.getElementById("dica1");
    let post2 = document.getElementById("dica2");
    let post3 = document.getElementById("dica3");
    dicas.querySelector("#dicas-title").innerHTML = "Teste";

    //Dica para menstruação regular
    if (duracao_menstruacao >= 2 && duracao_menstruacao <= 7 && duracao_ciclo >= 21 && duracao_ciclo <= 35) {
        dicas.querySelector("#dicas-title").innerHTML = "Parece que sua menstruação é regular!";
        dicas.querySelector("#dicas-text").innerHTML = "Agora que seu calendário menstrual foi gerado, segue algumas dicas interessantes para você!";

        //Seta post de menstruação regular (Dicas para cólica)
        post1.onclick = "window.location.href = './dicas/aliviar-colica.html'";
        post1.querySelector("#dica1-img").src = "./imagens/soprando.jpg";
        post1.querySelector("#dica1-title").innerHTML = "10 dicas para fugir da cólica";
        post1.querySelector("#dica1-text").innerHTML = "Sabemos que algumas mulheres sofrem com a dorzinha incomodante da cólica. Reunimos 10 dicas para ajudar a fugir dela de forma fácil e prática.";
        post1.querySelector("#dica1-link").href = "./dicas/aliviar-colica.html";
        post1.querySelector("#dica1-link").innerHTML = "Leia mais";
        post1.querySelector("#dica1-fonte").innerHTML = "Postado por Gauchaz";
    }
    //Dica para menstruação irregular
    else {
        dicas.querySelector("#dicas-title").innerHTML = "Parece que sua menstruação está irregular!";
        dicas.querySelector("#dicas-text").innerHTML = "Uma menstruação regular tem duração entre dois a sete dias, e um intervalo a cada 21 a 35 dias. Leia um pouco mais a respeito disso, além de outras dicas abaixo!";

        //Seta post de menstruação irregular (Dicas para menstruação irregular)
        post1.onclick = "window.location.href = './dicas/menstruacao-irregular.html'";
        post1.querySelector("#dica1-img").src = "./imagens/clock-flower.jpg";
        post1.querySelector("#dica1-title").innerHTML = "Menstruação irregular... O que é?";
        post1.querySelector("#dica1-text").innerHTML = "A menstruação irregular é aquela que foge do período normal. Antes de começarmos a falar sobre menstruação irregular, temos que esclarecer alguns pontos.";
        post1.querySelector("#dica1-link").href = "./dicas/menstruacao-irregular.html";
        post1.querySelector("#dica1-link").innerHTML = "Leia mais";
        post1.querySelector("#dica1-fonte").innerHTML = "Postado por Minha Vida";
    }

    //Dicas para a mulher quando a menstruação está próxima
    if (this.nearMenstruation) {
        //########################### POST DE HIGIENE
        post2.onclick = "window.location.href = './dicas/higiene-intima.html'";
        post2.querySelector("#dica2-img").src = "./imagens/pato.jpg";
        post2.querySelector("#dica2-title").innerHTML = "Higiene íntima durante a menstruação";
        post2.querySelector("#dica2-text").innerHTML = "Cuidar da higiene íntima é imprescindível para ambos os sexos. Os aparelhos reprodutivos merecem ter uma devida atenção.";
        post2.querySelector("#dica2-link").href = "./dicas/higiene-intima.html";
        post2.querySelector("#dica2-link").innerHTML = "Leia mais";
        post2.querySelector("#dica2-fonte").innerHTML = "Postado por Buscofem"; 

        //########################### POST DE QUAL ABS USAR
        post3.onclick = "window.location.href = './dicas/tipos-de-abs-mais-comuns.html'";
        post3.querySelector("#dica3-img").src = "./imagens/menstruacao.jpg";
        post3.querySelector("#dica3-title").innerHTML = "Os 5 tipos de absorvente mais comuns e como eles funcionam";
        post3.querySelector("#dica3-text").innerHTML = "De quanto em quanto tempo preciso trocar? Meninas virgens podem usar absorvente interno? Tire essas e outras dúvidas relacionadas ao tema.";
        post3.querySelector("#dica3-link").href = "./dicas/tipos-de-abs-mais-comuns.html";
        post3.querySelector("#dica3-link").innerHTML = "Leia mais";
        post3.querySelector("#dica3-fonte").innerHTML = "Postado por capricho";   
    }
    //Dica de menstruação em geral
    else {
        //########################### POST DE OVULAÇÂO
        post2.onclick = "window.location.href = './dicas/sintomas-periodo-fertil.html'";
        post2.querySelector("#dica2-img").src = "./imagens/egg.jpg";
        post2.querySelector("#dica2-title").innerHTML = "Quando é o período fértil e quais sintomas?";
        post2.querySelector("#dica2-text").innerHTML = "É possível saber quando é o período fértil através dos dias da menstruação e dos sintomas que a mulher apresenta nesta fase do mês.";
        post2.querySelector("#dica2-link").href = "./dicas/sintomas-periodo-fertil.html";
        post2.querySelector("#dica2-link").innerHTML = "Leia mais";
        post2.querySelector("#dica2-fonte").innerHTML = "Postado por Tua Saúde"; 

        //########################### POST COMO SABER SE VOU MENSTRUAR
        post3.onclick = "window.location.href = './dicas/como-saber-se-vou-menstruar.html'";
        post3.querySelector("#dica3-img").src = "./imagens/thinking.jpg";
        post3.querySelector("#dica3-title").innerHTML = "Como saber se vou menstruar?";
        post3.querySelector("#dica3-text").innerHTML = "A menstruação é uma resposta do útero que contrai a fim de eliminar o endométrio, já que o óvulo não foi fecundado.";
        post3.querySelector("#dica3-link").href = "./dicas/como-saber-se-vou-menstruar.html";
        post3.querySelector("#dica3-link").innerHTML = "Leia mais";
        post3.querySelector("#dica3-fonte").innerHTML = "Postado por Buscomfem"; 
    }

    //Reseta a variável
    this.nearMenstruation = false;
}
function clearPost(post, key) {
    //limpa os dados de um post
    post.onclick = null;
    post.querySelector(key + "-img").src = null;
    post.querySelector(key + "-title").innerHTML = null;
    post.querySelector(key + "-text").innerHTML = null;
    post.querySelector(key + "-link").href = null;
    post.querySelector(key + "-link").innerHTML = null;
    post.querySelector(key + "-fonte").innerHTML = null;

}
// Função para definir o calendário
function next() {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;

    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    if (validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)) {
        showCalendar(ultima_menstruacao, duracao_menstruacao, duracao_ciclo, currentMonth, currentYear);
    }
}
function previous() {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;

    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;

    if (validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)) {
        showCalendar(ultima_menstruacao, duracao_menstruacao, duracao_ciclo, currentMonth, currentYear);
    }
}
function jump() {
    let ultima_menstruacao = document.getElementById("ultima_menstruacao").value;
    let duracao_menstruacao = document.getElementById("duracao_menstruacao").value;
    let duracao_ciclo = document.getElementById("duracao_ciclo").value;
    let selectYear = parseInt(document.getElementById("year").value);
    let selectMonth = parseInt(document.getElementById("month").value);

    if (validarEntradas(ultima_menstruacao, duracao_menstruacao, duracao_ciclo)) {
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
                let dateCompair = new Date(year + "-" + (month + 1) + "-" + date);
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


                //Marca os dias de menstruação para cada ciclo posterior a data de menstruação
                if (calc <= menstruacao && calc != 0 && date_menstruacao.getTime() < dateCompair.getTime())
                    cell.classList.add("dia_menstruacao");
                //Marca os dias de menstruação para cada ciclo anterior a data de menstruação
                else if ((calc == 0 || calc > limitCicloAnt) && date_menstruacao.getTime() > dateCompair.getTime())
                    cell.classList.add("dia_menstruacao");
                //Marca os dias de ovulação para cada ciclo posterior a data de menstruação
                else if (calc > initOv && calc <= limitOv && date_menstruacao.getTime() < dateCompair.getTime())
                    cell.classList.add("ovulacao");
                //Marca os dias de ovulação para cada ciclo anterior a data de menstruação
                else if (calc <= initOvAnt && calc > limitOvAnt && date_menstruacao.getTime() > dateCompair.getTime())
                    cell.classList.add("ovulacao");
                //Marca a data de hoje
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    if (cell.classList.contains("dia_menstruacao"))
                        this.nearMenstruation = true;
                    cell.style.border = "3px solid green";
                }
                //Compara se a menstruação é no dia atual ou até dois dias antes
                else if (cell.classList.contains("dia_menstruacao") && (eval(date) - 2 % daysInMonth) === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    this.nearMenstruation = true;
                }
                //Compara se a menstruação é no dia atual ou até dois dias antes
                else if (cell.classList.contains("dia_menstruacao") && (eval(date) - 1 % daysInMonth) === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    this.nearMenstruation = true;
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }
        //Adiciona a linha (semana) no calendário
        tbl.appendChild(row);


    }

}
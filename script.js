function criaCards(data){

    for(var i=0; i< data.length; i++){
        let cardResultado = document.createElement('div');
        let conteudoCardTitulo = document.createElement('p');
        let conteudoCardDiretor = document.createElement('p');
        let conteudoCardAno = document.createElement('p');
        let conteudoCardPais = document.createElement('p');
        let conteudoCardDuracao = document.createElement('p');

        cardResultado.classList.add('divCardResultado');

        conteudoCardTitulo.innerHTML = "TÍTULO: " + data[i].Título;
        conteudoCardDiretor.innerHTML = "DIRETOR: " + data[i].Diretor;
        conteudoCardAno.innerHTML = "ANO: " + data[i].Ano;
        conteudoCardPais.innerHTML = "PAÍS: " + data[i].País;
        conteudoCardDuracao.innerHTML = "DURAÇÃO: " + data[i].Duração;


        cardResultado.appendChild(conteudoCardTitulo);
        cardResultado.appendChild(conteudoCardDiretor);
        cardResultado.appendChild(conteudoCardAno);
        cardResultado.appendChild(conteudoCardPais);
        cardResultado.appendChild(conteudoCardDuracao);

        document.getElementById('resultadoPesquisa').appendChild(cardResultado);
    }
}



async function sendRequest(action, userID, coluna, pesquisa) {

    var action = document.getElementById('tipoPesquisa').value;
    var userID = document.getElementById('usuario').value;
    var coluna = document.getElementById('coluna').value;
    var pesquisa = document.getElementById('pesquisa').value;


    mostraLoading();
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };
    await fetch("https://script.google.com/macros/s/AKfycbyU54d_SpTq97y7RiYbX5vwMzhIh3aV1E9UzrRNT0Ovt3p9aDv65Wifxuz2-SuEPnWJ/exec?action="+action+"&userID="+userID+"&coluna="+coluna+"&pesquisa="+pesquisa, myInit)
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        retiraLoading();
        criaCards(data);
        return data;
    })
    .catch((error) => {
        console.error("Error:", error);
        retiraLoading();
        return "A pesquisa não encontrou resultados";
    });
    
}

function mostraLoading(){
    var divLoading = document.createElement('div');
    var dot1 = document.createElement('p');
    var dot2 = document.createElement('p');
    var dot3 = document.createElement('p');

    dot1.classList.add('loading_dot_pop');
    dot1.innerHTML = ".";
    dot2.classList.add('loading_dot_pop');
    dot2.innerHTML = ".";
    dot3.classList.add('loading_dot_pop');
    dot3.innerHTML = ".";

    divLoading.classList.add('loadingDiv');
    divLoading.id = "divLoading";
    setTimeout(() => { divLoading.appendChild(dot1); }, 0100); 
    setTimeout(() => { divLoading.appendChild(dot2); }, 0200); 
    setTimeout(() => { divLoading.appendChild(dot3); }, 0300); 

    document.getElementById('resultadoPesquisa').appendChild(divLoading);
}

function retiraLoading(){
    let divLoading = document.getElementById('divLoading');
    let divResultado = document.getElementById('resultadoPesquisa');
    divResultado.removeChild(divLoading);
}

let id = 1;

let idDefinLocal = 0;

//let mainDiv = {};

let listaDivs = [];

let count = 0;

function main() {
    let mainDiv = objetoDiv(null);

    document.getElementById("divMae").innerHTML += divComp(mainDiv);
}

function objetoDiv(idDiv) {

    let divMaeLocal = {
        titulo: '',
        posicao: '',
        divFilhas: []
    };
    
    if(idDiv){
        divMaeLocal = listaDivs.find(l => l.id === idDiv);
    }

    let divFilha = {
        id: getBindId(),
        titulo: divMaeLocal.titulo,
        divFilhas: []
    };
    
    if(idDiv) {
        divFilha.posicao = divMaeLocal.posicao + "." + (divMaeLocal.divFilhas.length + 1);
    } else {
        divFilha.posicao = '1';
    }

    listaDivs.push(divFilha);
    divMaeLocal.divFilhas.push(divFilha);

    return divFilha;
}


function divComp(div) {
    
    let idVinculoHTML = getBindId();
    
    function setarValorTitulo() {       
        let input = document.getElementById(idVinculoHTML + '');
        div.titulo = input.value;
    }
    
    addBind(idVinculoHTML, setarValorTitulo);
    
    let idAttTituloFilhas = getBindId();
    
    function attTituloFilhas() {

        bind(`titulo${div.id}`);

        div.divFilhas.forEach(df =>{
            df.titulo = div.titulo;
            bind(`titulo${df.id}`);
            df.attTituloFilhas();
        })
    }

    addBind(idAttTituloFilhas, attTituloFilhas);
    div.attTituloFilhas = attTituloFilhas;

    function rendenizarHTML() {
        document.getElementById(`titulo${div.id}`).innerText = div.titulo;
    }

    addBind(`titulo${div.id}`, rendenizarHTML);

    return `
        <div id="${div.id}" class="main">
            <div class="dflex">
                <div class="dflex">
                    <div class="conexao"></div>
                    <input id="${idVinculoHTML}" onkeyup="bind(${idVinculoHTML}); bind(${idAttTituloFilhas})" value=""> 
                </div>
                <label id="titulo${div.id}"> ${div.titulo} </label> 
                <label> ${div.posicao} </label> 
                <button onclick="gerarDiv(${div.id})">+</button>
            </div>
            <div id='filhas${div.id}' class='filhas'></div>
        </div>
    `
}

function gerarDiv(id) {
    let div = objetoDiv(id);
    document.getElementById('filhas' + id).innerHTML += divComp(div);
}

let binds = [];
let bindId = 0;

function getBindId() {
   
    bindId++;
    return bindId;
}

function addBind(id, func) {

    if (!id || !func) {
        return;
    }

    let bindsOfId = binds.find(b => b.id === id);

    if (!bindsOfId) {
        bindsOfId = { id: id, functions: [] };
        binds.push(bindsOfId);
    }

    bindsOfId.functions.push(func);
}

function bind(id) {
    if (!id) {
        return;
    }

    let bind = binds.find(b => b.id === id);
    if (bind) {
        bind.functions.forEach(func => func());
    }
}
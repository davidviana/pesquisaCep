'use strict'

const card = document.getElementById('save').addEventListener('click', (criar) => {
    var criar = document.createElement("div")
    criar.classList.add("card")
    document.body.appendChild(criar)

})


const limparForm = () => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const preencherForm = async (endereco) => {
    let cep = document.getElementById('cep').value = endereco.cep

    var separacaoCep = await cep;
    var resultado = await separacaoCep.substr(0,2)+"-"+separacaoCep.substr(2,2);

    let ender = document.getElementById('endereco').value = endereco.logradouro;
    let bairro = document.getElementById('bairro').value = endereco.bairro;
    let cidade = document.getElementById('cidade').value = endereco.localidade;
    let estado = document.getElementById('estado').value = endereco.uf;

    let list = [cep, ender, bairro, cidade, estado];
    localStorage.setItem("endereço completo", list);
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep)

const pesquisarCep = async () => {
    limparForm()
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = "CEP não encontrado";
        } else {
            preencherForm(endereco);
        }
    } else {
        document.getElementById('endereco').value = "CEP incorreto";
    }
}

document.getElementById('cep')
    .addEventListener('keypress', pesquisarCep);


document.getElementById('button').addEventListener('click', () => {
    const enderecoCompletao = localStorage.getItem("endereço completo").split(',');
    
    const paiCards = document.getElementById('cards')
    paiCards.innerHTML +=  `
    <div id="card">
    <button  onClick = "apagaTudo(this)" style ="margin-left: 100%;" id = "delete-button" type="button">&times;</button>
        <div>CEP: ${enderecoCompletao[0]}</div>
        <div>Endereço: ${enderecoCompletao[1]}</div>
        <div>Bairro: ${enderecoCompletao[2]} </div>
        <div>Cidade: ${enderecoCompletao[3]}</div>
        <div>Estado: ${enderecoCompletao[4]}</div>
    </div>`
})

const apagaTudo = (button) => {
    button.parentNode.remove()
}

//TIPS//
//USE STRICT: usa para ver detalhadamente o erro//
// template string ``//
// var = ${}
//fetch => consegue manipular partes da API and return on promisse//
// .then => trabalha com promisses// 
// async and await => trabalha com promisses//
// NESSE CASO EM ESPECIFICO A API FORNECE O "ERRO", POR ESTE MOTIVO NÃO É PRECISO USAR O TRY/CATCH//
// /[0-9]/ => expressão regular, por isso ^:inicio e $:fim //
// test => é um method de regular expression que tem como base um sistema "boolean" que verifica se o param é true or false//

// como caregar os campos que eu criei que já foram subidas no localStorage//

//InnerHTML serve para percorrer o elemento e acessar o HTML//
//Utiliza-se split para trasformar string (é o padrão do localStorage), numa lista//
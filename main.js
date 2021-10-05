'use strict'

const card = document.getElementById('save').addEventListener('click', (criar)=> {
    var criar = document.createElement("div")
    criar.classList.add("card")
    document.body.appendChild(criar)
    
})

let cepList = [];

const traco = document.getElementById("cep")

function storage() {
    var catched = localStorage.getItem("cepList")
    if(catched != null && catched != "") {
        cepList = catched.split(",")
    }
}

storage()

const limparForm = () => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const preencherForm = (endereco) => {
    let ender = document.getElementById('endereco').value = endereco.logradouro;
    let bairro = document.getElementById('bairro'). value = endereco.bairro;
    let cidade = document.getElementById('cidade'). value = endereco.localidade;
    let estado = document.getElementById('estado'). value = endereco.uf;

    console.log(ender)
    console.log(bairro)
    console.log(cidade)
    console.log(estado)
}



const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep)

const pesquisarCep = async () => {
    limparForm()
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if(cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        cepList.push(endereco.cep);
        localStorage.setItem("cepList", cepList);

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
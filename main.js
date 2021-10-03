'use strict'


const limparForm = (endereco) => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro'). value = "";
    document.getElementById('cidade'). value = "";
    document.getElementById('estado'). value = "";
}

const preencherForm = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro'). value = endereco.bairro;
    document.getElementById('cidade'). value = endereco.localidade;
    document.getElementById('estado'). value = endereco.uf;
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
        if (endereco.hasOwnProperty('erro')) {
            const mensagem = "CEP não encontrado";
            document.getElementById('endereco').value = mensagem;
        } else {
        preencherForm(endereco);
        } 
    } else {
        document.getElementById('endereco').value = "CEP incorreto";
    }
}

document.getElementById('cep')
        .addEventListener('focusout', pesquisarCep);

//TIPS//
//USE STRICT: usa para ver detalhadamente o erro//
// template string ``//
// var = ${}
//fetch => consegue manipular partes da API and return on promisse//
//then => trabalha com promisses// 
// async and await => trabalha com promisses//
// NESSE CASO EM ESPECIFICO A API FORNECE O "ERRO", POR ESTE MOTIVO NÃO É PRECISO USAR O TRY/CATCH//
// /[0-9]/ => expressão regular, por isso ^:inicio e $:fim //
// test => é um method de regular expression que tem como base um sistema "boolean" que verifica se o param é true or false//



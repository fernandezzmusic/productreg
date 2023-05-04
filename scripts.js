class Produto
{
                //variaveis
    constructor(codigo, descricao, quantidade, valor)
    {
        //propriedade = variavel
        this.codigo = codigo;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;

    }
}

function montarTabela(lista)
{
    let auxHtml = '';
    for (let i = 0; i < lista.length ; i++)
    {
        auxHtml +=  '<tr>'+
                    '<td>' + lista[i].codigo + '</td>'+
                    '<td>' + lista[i].descricao + '</td>'+
                    '<td>' + lista[i].quantidade + '</td>'+
                    '<td>' + lista[i].valor.toFixed(2).replace('-',',') + '</td>'+
                    '<tr>';
    }
    return auxHtml;
}

function validar(valor)
{
    if(!isNaN(valor) && valor != '')
    {
        return true;
    }
    else
    {
        return false;
    }
}

listaProdutos = [];

//atribuicao dos valores e produtos



window.onload = function()
{
    document.getElementById('tabela').innerHTML = montarTabela(listaProdutos);
    document.getElementById('btnCafastrar').onclick = function()
    {
    let codigo = document.getElementById('codigo').value;
    let descricao = document.getElementById('desc').value;
    let quantidade = document.getElementById('quant').value;
    let valor = document.getElementById('valor').value;
    
    if(validar(codigo) && descricao != '' && validar(quantidade) && validar(valor))
    {
       codigo = parseInt(codigo);
       quantidade = parseFloat(quantidade);
       valor = parseFloat(valor);
       let novoProduto = new Produto(codigo, descricao, quantidade, valor);
       listaProdutos.push(novoProduto);
       document.getElementById('tabela').innerHTML = montarTabela(listaProdutos);
    }
    else
    {
        alert('Digite valores válidos');
    }
    }
}
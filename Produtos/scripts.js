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
                    '<td>' + 
                    '<a href = "#" class="btn btn-warning" rel="'+i+'">' +
                        '<img src="img/edit.svg" width = "25px" height = "25px" rel="'+i+'"/>' +
                    '</a>' +
                    '</td>' +
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
    $('#tabela').html(montarTabela(listaProdutos));
    $('#btnCafastrar').click( () =>
    {
    let codigo = $('#codigo').val();
    let descricao = $('#desc').val();
    let quantidade = $('#quant').val();
    let valor = $('#valor').val();

    $('input').val('');
    
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

    })
    document.getElementById('btnLimpar').onclick = function()
    {
       listaProdutos.pop();
       document.getElementById('tabela').innerHTML = montarTabela(listaProdutos);
    }
    
    $('#tabela').on('click', '.btn-warning', (evento) =>
    {
        auxPosicao = evento.target.getAttribute('rel');
        $('#codigo').val(listaProdutos[auxPosicao].codigo);
        $('#desc').val(listaProdutos[auxPosicao].descricao);
        $('#quant').val(listaProdutos[auxPosicao].quantidade);
        $('#valor').val(listaProdutos[auxPosicao].valor);
    })

}
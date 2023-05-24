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
        auxHtml +=  '<tr class="align-middle">'+
                    //'<td>' + lista[i].codigo + '</td>'+//
                    '<td>' + lista[i].descricao + '</td>'+
                    '<td>' + lista[i].quantidade + '</td>'+
                    '<td>' + lista[i].valor.toFixed(2).replace('-',',') + '</td>'+
                    '<td>' + 
                    '<a href = "#" class="btn-primary" rel="'+i+'">' +
                        '<img src="img/edit.svg" width = "20px" rel="'+i+'"/>' +
                    '</a>' +
                    '</td>' +
                    '<td>' + 
                    '<a href = "#" class="btn-danger" rel="'+i+'">' +
                        '<img src="img/delete.png" width = "50px" rel="'+i+'"/>' +
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

auxPosicao = '';
listaProdutos = [];

//atribuicao dos valores e produtos



window.onload = function()
{
    $('#tabela').html(montarTabela(listaProdutos));
    $('#btnCafastrar').click( () =>
    {
    var vst = document.getElementById("desc");
    let codigo = $('#codigo').val();
    let descricao = vst.options[vst.selectedIndex].text;
    let quantidade = $('#quant').val();
    let valor = $('#valor').val() * quantidade;

    $('input').val('');
    $('select').val('');
    
    if(/*validar(codigo) && */ descricao != '' && validar(quantidade) && validar(valor))
    {
       //codigo = parseInt(codigo);
       quantidade = parseFloat(quantidade);
       valor = parseFloat(valor);
       let novoProduto = new Produto(codigo, descricao, quantidade, valor);

       if (auxPosicao == '')
        {
        listaProdutos.push(novoProduto);
        }
        
        else
        {
        listaProdutos[auxPosicao] = novoProduto;
        auxPosicao = '';
        }

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
    
    $('#tabela').on('click', '.btn-primary', (evento) =>
    {
        auxPosicao = evento.target.getAttribute('rel');
        //$('#codigo').val(listaProdutos[auxPosicao].codigo);
        $('#desc').val(listaProdutos[auxPosicao].descricao);
        $('#quant').val(listaProdutos[auxPosicao].quantidade);
        $('#valor').val(listaProdutos[auxPosicao].valor);
    })

    $('#tabela').on('click', '.btn-danger', (evento) =>
    {
        if(confirm('Tem certeza?'))
        {
            listaProdutos.splice(evento.target.getAttribute('rel'), 1);
            $('#tabela').html(montarTabela(listaProdutos));
        }
    });

    $('#btnJson').click(() =>
    {
        let produtosJson = JSON.stringify(listaProdutos);
        alert(produtosJson);
    });

    $('#btnAjax').click(() =>
    {
        $.ajax({
            url: "http://date.jsontest.com/",
            method: 'GET',
            dataType: 'json' 
          }).done(function(dados) {
            $('#data').html(dados);
          });
    });
}
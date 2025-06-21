const produtosSelecionados = []; // Array para armazenar os produtos já adicionados
function adicionarItens() {
    const produtos = document.querySelectorAll('.produto');
    const painel = document.getElementById('itensPedido');
    painel.innerHTML = ''; // Limpa o painel antes de atualizar os itens

    
    let totalCompra = 0;

    produtos.forEach(produto => {
        const checkbox = produto.querySelector('input[type="checkbox"]');
        const quantidade = produto.querySelector('input[type="number"]');
        const nome = produto.querySelector('label').textContent;

        if (checkbox.checked && quantidade.value > 0) {
            const preco = parseFloat(checkbox.getAttribute('data-preco'));
            const qtd   = parseInt(quantidade.value) || 0;
            const valor = preco * qtd;
            const tipo  = checkbox.getAttribute('data-tipo'); // Captura o tipo do produto

            // Verificar se o produto já existe na lista
            const itemExistente = produtosSelecionados.find(item => item.nome === nome);

            if (itemExistente) {
                // Atualiza a quantidade e o valor se o item já existir
                itemExistente.qtd   = qtd; // Atualiza a quantidade
                itemExistente.valor = valor; // Atualiza o valor total do item
            } else {
                // Adiciona o produto ao array se ainda não estiver na lista
                produtosSelecionados.push({ tipo, nome, qtd, valor});
                
            }

            //totalCompra += (qtd+valor);
        }
    });

    // Atualiza o painel com os itens do pedido
    produtosSelecionados.forEach(item => {
        painel.innerHTML += `<li> ${item.nome}- Qtd: ${item.qtd} - Valor: ${item.valor.toFixed(2)}</li>`;
        totalCompra += item.valor;
    });

    // Atualiza o valor total da compra
    document.getElementById('totalCompra').textContent = totalCompra.toFixed(2);
    console.log(`Total Compra Atualizado: R$${totalCompra.toFixed(2)}`);

}


function atualizarPainel() {
        const painel = document.getElementById('itensPedido');
        //painel.innerHTML = '';
        produtosSelecionados.forEach(item => {
            painel.innerHTML += `<li>${item.nome} - Qtd: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
        });
}

    
const produtosPorCategoria = {
            elma:[
                { nome:'Ruffles 68g',    preco:9.00,tipo:'elma'},
                { nome:'Lays 70g',     preco:14.00,tipo:'elma'},
                { nome:'Doritos Vermelho 75g',     preco:10.00,tipo:'elma'},
                { nome:'Pingo Douro 1200g',     preco:15.00,tipo:'elma'},
                { nome:'Amendoin Japanês 45g',     preco:3.50,tipo:'elma'},
                { nome:'Cheetos MIX 68g',     preco:14.00,tipo:'elma'},
                { nome:'Lays 70g',     preco:14.00,tipo:'elma'},
                { nome:'Fandangos 160g',     preco:14.00,tipo:'elma'},
                { nome:'Cebolitos 91g',     preco:14.00,tipo:'elma'},
                { nome:'Cebolitos 36g',  preco: 7.00,tipo:'elma'}
            ],
            bodega:[
                { nome:'Espanhola',     preco:0.00,tipo:'bodega'},
                { nome:'Mousse Maracuja',     preco:0.00,tipo:'bodega'},
                { nome:'Mousse Morango',     preco:0.00,tipo:'bodega'},
                { nome:'Caipirinha Maracuja',     preco:0.00,tipo:'bodega'},
                { nome:'Caipirinha Limao',     preco:0.00,tipo:'bodega'},
                { nome:'Caipirinha Morango',     preco:0.00,tipo:'bodega'},
                { nome:'Pina Colada',  preco: 0.00,tipo:'bodega'}
            ],
            hei:[
                { nome:'Heiniken 600ml',     preco:14.00,tipo:'hei'},
                { nome:'Heineken lt 350ml',  preco: 7.00,tipo:'hei'},
                { nome:'Passaporte',         preco: 10.00,tipo:'hei'},
                { nome:'Matu Nobre',         preco: 10.00,tipo:'hei'},
                { nome:'Vodka Smirnof',      preco:  8.00,tipo:'hei'},
                { nome:'Vodka',              preco:  8.00,tipo:'hei'},
                { nome:'Campari',            preco:  8.00,tipo:'hei'}
            ],
            conti: [
                { nome:'Conti 300ml',        preco: 4.00,tipo:'conti'},
                { nome:'Sodinha 200ml',      preco: 3.00,tipo:'conti'},
                { nome:'Tubaina 600ml',      preco: 5.00,tipo:'conti'},
                { nome:'Passaporte',         preco: 10.00,tipo:'conti'},
                { nome:'Matu Nobre',         preco: 10.00,tipo:'conti'},
                { nome:'Vodka Smirnof',      preco:  8.00,tipo:'conti'},
                { nome:'Vodka',              preco:  8.00,tipo:'conti'},
                { nome:'Campari',            preco:  8.00,tipo:'conti'}
                
            ],
            skol: [
                { nome:'Skol 600ml',         preco:10.00,tipo:'skol'},
                { nome:'Skol 300ml',         preco: 5.00,tipo:'skol'},
                { nome:'Skol lt 350ml',    preco: 5.00,tipo:'skol'}],
            bhrama: [
                    { nome:'Brahma 600ml',       preco:12.00,tipo:'bhrama'},
                    { nome:'Brahma 300ml',       preco: 5.00,tipo:'bhrama'},
                    { nome:'Brahma lt 350ml',  preco: 5.00,tipo:'bhrama'}],
            amistel: [
                { nome:'Heiniken 600ml',     preco:14.00,tipo:'amistel'},
                { nome:'Amistel 600ml',      preco:10.00,tipo:'amistel'},
                { nome:'Smistel lt 350ml', preco: 5.00,tipo:'amistel'}],
            coca:[
                { nome:'Coca-cola 350ml ',   preco: 5.00,tipo:'coca'},
                { nome:'Fanta laranja 350ml',preco: 5.00,tipo:'coca'},
                { nome:'Fanta uva 350ml ',   preco: 5.00,tipo:'coca'},
                { nome:'Guarana 350ml ',     preco: 5.00,tipo:'coca'},
                { nome:'Coca-Cola 1L desc',  preco: 8.00,tipo:'coca'},
                { nome:'Coca-Cola 1L ret ',  preco: 8.00,tipo:'coca'},
                { nome:'Coca-cola 290ml',    preco: 5.00,tipo:'coca'},
                { nome:'Dell Vale uva',      preco: 5.00,tipo:'coca'}, 
                { nome:'Dell Vale laranja',  preco: 5.00,tipo:'coca'},
                { nome:'Redbull',            preco: 10.00,tipo:'coca'},
                { nome:'Monster',            preco: 10.00,tipo:'coca'},
                { nome:'Agua s/gas 500ml',   preco:  4.00,tipo:'coca'},
                { nome:'Agua c/gas 500ml',   preco:  4.00,tipo:'coca'},
                { nome:'Campari',            preco:  8.00,tipo:'coca'}
            ]
            
};
function exibirProdutos() {
            const categoria = document.getElementById('categoria').value;
            const listaProdutos = document.getElementById('listaProdutos');
            listaProdutos.innerHTML = '';

            if (categoria && produtosPorCategoria[categoria]) {
                const produtos = produtosPorCategoria[categoria];
                produtos.forEach((produto, index) => {
                    const produtoHTML = `
                        <div class="produto" style="width:100%">
                        <table style="width:100%">
                            <tr style="width:100%">
                                <td style="width:auto"><input type="checkbox" id="produto${index}" data-tipo="${produto.tipo}" data-produto="${produto.nome}" data-preco="${produto.preco}" onchange="atualizarTotal()"></td>
                                <td><label class='item' for="produto${index}">${produto.nome}</label></td>
                                <td style="width:15%; text-align: right"><label class='quant' >Qtd:<input type="number" style="width: 30%" id="quantidade${index}" value=" " min="0" onchange="atualizarTota()"></label</td>
                                <td style="width:15%"><button class="botao" onclick="adicionarItens()"><img src="adiciona.png" alt="Adicionar" width="20" height="20"></button></td>
                            </tr>
                        </table>
                    </div>`;
                listaProdutos.innerHTML += produtoHTML;
                    
                });
            }
            atualizarTotal();
}

function atualizarTotal() {
        let total = 0;
        const produtos = document.querySelectorAll('.produto');
    
        produtos.forEach(produto => {
            const checkbox = produto.querySelector('input[type="checkbox"]');
            const quantidade = produto.querySelector('input[type="number"]');
            if (checkbox.checked && quantidade.value > 0) {
                const preco = parseFloat(checkbox.getAttribute('data-preco'));
                const valor = preco * quantidade.value;
                total += valor;
            }
        });
    // aqui
        document.getElementById('valorTotal').textContent = total.toFixed(2);
}

function limparCampos() {
        const painel = document.getElementById('itensPedido');
        painel.innerHTML = '';
        document.getElementById('categoria').value = '';
        document.getElementById('listaProdutos').innerHTML = '';
        document.getElementById('totalCompra').textContent = '0.00';
        produtosSelecionados.length = 0; // Reseta o array de produtos selecionados
}
// Exibe o campo da mesa se "Mesa" for selecionado
function habilitarNumeroMesa() {
    const tipoPedido = document.getElementById('tipoPedido').value;
    const campoMesa = document.getElementById('campoMesa');
    campoMesa.style.display = tipoPedido === 'mesa' ? 'block' : 'none';
}

function getDataAtual() {
    var hoje = new Date();
    var dia = String(hoje.getDate()).padStart(2, '0');
    var mes = String(hoje.getMonth() + 1).padStart(2, '0');
    var ano = hoje.getFullYear();

    var horas = String(hoje.getHours()).padStart(2, '0');
    var minutos = String(hoje.getMinutes()).padStart(2, '0');
    

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    
}

function imprimirPedidoCompra() {
    const painel      = document.getElementById('itensPedido');
    const totalCompra = document.getElementById('totalCompra').textContent;
    var data = getDataAtual(); 
    //var cabcoca = true;
    //var cabamis = true;
    //var cabbhra = true;
    //var cabhei  = true;
    //var cabconti= true;
    //var cabskol = true;


    let detalhesPedido = `
        <div style="max-width: 78mm; text-align: center; font-size: 12px; font-family: Arial, sans-serif; border-style:solid dashed;">
        <table style="width: auto; font-size: 22px;">
            <tr>
                <td style="text-align: right; width: 30%;"><img src="Logo.png" style="width: 100%; height: auto;"></td>
                <td colspan="3" style="font-size: 6px; text-align: justify; padding: 15px""><strong>Skina 735 Bar - Rua Goioerê, 735 esquina com a Norte do Paraná Bairro Jd. Curitiba - Goioerê-Pr CEP 87.360-000 CNPJ: 14.451.465/0001-73 Contato: (44) 99865-5735</strong></td>
            </tr>
            <tr>
            <td colspan='4' style="background-color: black; color: white;text-align: center; font-size: 16px;"><strong>COMPRAS</strong></td>
            </tr>
            <tr >
                <td colspan="4" style="width: auto;font-size: 18px; text-align: center; width: 100%;">${data}</td>
            </tr>
             
            
        </table>  
        <table style="width: 100%; ">
            <tr font-size: 22px; style="background-color: black; color: white;width: auto">
                <td colspan="2" style="text-align: left;">Produto</td>
                <td style="text-align: right;">Unit</td>
                
            </tr>
            <tbody>`;

    if (produtosSelecionados.length > 0) {
        produtosSelecionados.forEach(item => {
            const produto       = item.nome;
            const quantidade    = item.qtd;
            const valorUnitario = item.valor / item.qtd; // Calcula o valor unitário
            const valorTotal    = item.valor.toFixed(2); // Valor total do item
            const tipo_produto  = item.tipo;
         
            
            //if (cabamis=== true && tipo_produto === 'amistel') {
                detalhesPedido += `
        <table style="width: 100%; ">
            <tr>
                <td colspan="4" style="width: auto;font-size: 14px;">--------------------- corte aqui ------------------</td>

            </tr>
            
            <tbody>
            
    `;
                detalhesPedido += `
                <table style="width: auto; font-size: 22px;">
                
            <tr>
                <td colspan='4' style="background-color: black; color: white;text-align: center; font-size: 16px;width:100%"><strong>>----AMISTEL----<</strong></td>
                
            </tr>
            <tr >
                <td colspan="4" style="width: auto;font-size: 18px; text-align: center; width: 100%;">${data}</td>
            </tr>
             <tr>
                <td colspan="4" style="text-align: center;"><strong>${tipo_produto}</strong> </td>
            </tr>
            
        </table>  
        <table style="width: 100%; ">
            <tr font-size: 22px; style="background-color: black; color: white;width: auto">
                <td colspan="2" style="text-align: left;">Produto</td>
                <td style="text-align: right;">Unit</td>
                
            </tr>
            <tbody>
            
    `;
                //cabamis=false;
            //}
            
            detalhesPedido += `                
                <tr font-size: 22px;>
                    <td colspan="2">${produto}</td>
                    <td style="text-align: right;">${quantidade}</td>
                    
                </tr>
                <tr style="width: auto;">
                    <td colspan="4">..................................................</td>
                </tr>
            `;
        });
        } else {
            detalhesPedido += `
            <tr>
                <td colspan="4" style="text-align: center;">Nenhum item selecionado.</td>
            </tr>
            `;
        }

    detalhesPedido += `
                
                </tbody>
            </table>
        </div>
    `;
//
    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(`
        <html>
            <head>
                <title>Imprimir Pedido</title>
                <link rel="shortcut icon" href="Logo.png" type="image/x-icon">
                <style>
                    body { margin: 0; padding: 0; }
                    table, th, td { border: 0px solid #000; padding: 1px; }
                </style>
            </head>
            <body>
                ${detalhesPedido}
            </body>
        </html>
    `);
    
    novaJanela.print();
    novaJanela.close();
    
}

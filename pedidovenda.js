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
            cerveja: [
                { nome:'Heiniken 600ml',     preco:14.00,tipo:'bebida'},
                { nome:'Skol 600ml',         preco:10.00,tipo:'bebida'},
                { nome:'Amistel 600ml',      preco:10.00,tipo:'bebida'},
                { nome:'Original 600ml',     preco:14.00,tipo:'bebida'},
                { nome:'Brahma 600ml',       preco:12.00,tipo:'bebida'},
                { nome:'Skol 300ml',         preco: 5.00,tipo:'bebida'},
                { nome:'Brahma 300ml',       preco: 5.00,tipo:'bebida'},
                { nome:'Original 300ml',     preco: 5.00,tipo:'bebida'},
                { nome:'Conti 300ml',        preco: 4.00,tipo:'bebida'},
                { nome:'Skol lt 350ml',    preco: 5.00,tipo:'bebida'},
                { nome:'Brahma lt 350ml',  preco: 5.00,tipo:'bebida'},
                { nome:'Smistel lt 350ml', preco: 5.00,tipo:'bebida'},
                { nome:'Heineken lt 350ml',preco: 7.00,tipo:'bebida'}
            ],
            refri:[
                { nome:'Coca-cola 350ml ',   preco: 5.00,tipo:'bebida'},
                { nome:'Fanta laranja 350ml',preco: 5.00,tipo:'bebida'},
                { nome:'Fanta uva 350ml ',   preco: 5.00,tipo:'bebida'},
                { nome:'Guarana 350ml ',     preco: 5.00,tipo:'bebida'},
                { nome:'Coca-Cola 1L desc',  preco: 8.00,tipo:'bebida'},
                { nome:'Coca-Cola 1L ret ',  preco: 8.00,tipo:'bebida'},
                { nome:'Coca-cola 290ml',    preco: 5.00,tipo:'bebida'},
                { nome:'Sodinha 200ml',      preco: 3.00,tipo:'bebida'},
                { nome:'Tubaina 600ml',      preco: 5.00,tipo:'bebida'}
            ],
            suco:[
                { nome:'Dell Vale uva',      preco: 5.00,tipo:'bebida'}, 
                { nome:'Dell Vale laranja',  preco: 5.00,tipo:'bebida'}
            ],
            dose:[
                { nome:'Passaporte',         preco: 10.00,tipo:'bebida'},
                { nome:'Matu Nobre',         preco: 10.00,tipo:'bebida'},
                { nome:'Vodka Smirnof',      preco:  8.00,tipo:'bebida'},
                { nome:'Vodka',              preco:  8.00,tipo:'bebida'},
                { nome:'Campari',            preco:  8.00,tipo:'bebida'}
            ],
            outras:[
                { nome:'Redbull',            preco: 10.00,tipo:'bebida'},
                { nome:'Monster',            preco: 10.00,tipo:'bebida'},
                { nome:'Agua s/gas 500ml',   preco:  4.00,tipo:'bebida'},
                { nome:'Agua c/gas 500ml',   preco:  4.00,tipo:'bebida'},
                { nome:'Campari',            preco:  8.00,tipo:'bebida'}
            ],
            porcoes: [
                { nome: 'Batata frita',           preco: 22.00, tipo:'porcao' },
                { nome: 'Frango frito 1kg',          preco: 35.00, tipo:'porcao' },
                { nome: 'Frango frito 1/2kg',          preco: 25.00, tipo:'porcao' },
                { nome: 'Filé Peixe frito 1kg ',            preco: 35.00, tipo:'porcao' },
                { nome: 'Filé Peixe frito 1/2kg',            preco: 25.00, tipo:'porcao' }
            ],
            diversos: [
                { nome: 'Trident', preco: 6 , tipo:'diversos'},
                { nome: 'Halls',   preco: 4 , tipo:'diversos'},
                { nome: 'Bombom',  preco: 8 , tipo:'diversos'}
            ]
};
function exibirProdutos() {
            const categoria = document.getElementById('categoria').value;
            const listaProdutos = document.getElementById('listaProdutos');
            listaProdutos.innerHTML = '';

            if (categoria && produtosPorCategoria[categoria]) {
                const produtos = produtosPorCategoria[categoria];
                const produtoHTML = `
                <div class="produto" style="width:100%">
                    <table style="width:100%">
                            <tr style="width:100%">
                                <td style="width:auto"></td>
                                <td>Descrição</td>
                                <td style="width:15%; text-align: center">Qtd</td>
                                <td style="width:15%"></td>
                            </tr>`;
                produtos.forEach((produto, index) => {
                    produtoHTML += `
                            <tr style="width:100%">
                                <td style="width:auto"><input type="checkbox" id="produto${index}" data-tipo="${produto.tipo}" data-produto="${produto.nome}" data-preco="${produto.preco}" onchange="atualizarTotal()"></td>
                                <td><label class='item' for="produto${index}">${produto.nome} (R$${produto.preco.toFixed(2)})</label></td>
                                <td style="width:15%; text-align: right"><label class='quant' ><input type="number" style="width: 30%" id="quantidade${index}" value=" " min="0" onchange="atualizarTota()"></label</td>
                                <td style="width:15%"><button class="botao" onclick="adicionarItens()"><img src="adiciona.png" alt="Adicionar" width="20" height="20"></button></td>
                            </tr>`;
                }
                
    listaProdutos.innerHTML += produtoHTML;
                produtoHTML += `</table>           
                                </div>`;  
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



function imprimirPedido2() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const tipoPedido = document.getElementById('tipoPedido').value;
    const numeroMesa = document.getElementById('numeroMesa').value;
    const painel = document.getElementById('itensPedido');
    const totalCompra = document.getElementById('totalCompra').textContent;
    var data = getDataAtual(); 
    var cabBar = true;
    var cabPor = true;
    var cabDiv = true;

    if (!nomeCliente || (tipoPedido === 'mesa' && !numeroMesa)) {
        alert('Por favor, preencha todas as informações necessárias antes de imprimir o pedido.');
        return;
    }
//<td colspan="3" style="font-size: 22px; text-align: left; padding: 15px""><strong>PEDIDO  CAIXA</strong></td>
    let detalhesPedido = `
        <div style="max-width: 78mm; text-align: center; font-size: 12px; font-family: Arial, sans-serif; border-style:solid dashed;">
        <table style="width: auto; font-size: 22px;">
            <tr>
                <td style="text-align: right; width: 30%;"><img src="Logo.png" style="width: 100%; height: auto;"></td>
                <td colspan="3" style="font-size: 6px; text-align: justify; padding: 15px""><strong>Skina 735 Bar - Rua Goioerê, 735 esquina com a Norte do Paraná Bairro Jd. Curitiba - Goioerê-Pr CEP 87.360-000 CNPJ: 14.451.465/0001-73 Contato: (44) 99865-5735</strong></td>
            </tr>
            <tr>
            <td colspan='4' style="background-color: black; color: white;text-align: center; font-size: 16px;"><strong>PEDIDO</strong></td>
            </tr>
            <tr >
                <td colspan="4" style="width: auto; text-align: left; width: 100%;font-size: 15px;">Data/hora: ${data}</td>
            </tr>
             <tr>
                <td colspan="4" style="text-align: left;font-size: 18px;">Cliente: <strong>${nomeCliente}</strong> </td>
            </tr>
            <tr>
                <td colspan="4" style="width: 20%; text-align: center;font-size: 18px;"><strong>${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</strong></td>
            </tr>
        </table>  
        <table style="width: 100%; ">
            <tr font-size: 22px; style="background-color: black; color: white;width: auto">
                <td colspan="2" style="text-align: left;">Produto</td>
                <td style="text-align: right;">Unit</td>
                <td style="text-align: right;">Total</td>
            </tr>
            <tbody>
            
    `;



    //
    if (produtosSelecionados.length > 0) {
        produtosSelecionados.forEach(item => {
            const produto = item.nome;
            const quantidade = item.qtd;
            const valorUnitario = item.valor / item.qtd; // Calcula o valor unitário
            const valorTotal = item.valor.toFixed(2); // Valor total do item
            const tipo_produto = item.tipo;
            
            detalhesPedido += `
                
                <tr font-size: 22px;>
                    <td colspan="2">${produto}</td>
                    <td style="text-align: center;">${quantidade}</td>
                    <td style="text-align: right;">${valorTotal}</td>
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
            
            <p style="background-color: black; color: white;text-align: right; font-size: 22px;"><strong>Valor Total:  ${totalCompra}</strong></p>
        
    `;

    if (produtosSelecionados.length > 0) {
        produtosSelecionados.forEach(item => {
            const produto = item.nome;
            const quantidade = item.qtd;
            const valorUnitario = item.valor / item.qtd; // Calcula o valor unitário
            const valorTotal = item.valor.toFixed(2); // Valor total do item
            const tipo_produto = item.tipo;
            if (cabBar=== true && tipo_produto === 'bebida') {
                detalhesPedido += `
        <table style="width: 100%; ">
            <tr>
                <td colspan="4" style="width: auto;font-size: 14px;">--------------------- corte aqui ------------------</td>

            </tr>
            
            <tbody>
            
    `;
                detalhesPedido += `
                <table style="width: auto; font-size: 15px;">
                <tr>
                <td colspan='4' style="background-color: black; color: white;text-align: center; font-size: 16px;width:100%"><strong>>--------VIA BAR--------<</strong></td>
            </tr>
            <tr >
                <td colspan="4" style="width: auto; text-align: left; width: 100%;">Data/hora: ${data}</td>
            </tr>
             <tr>
                <td colspan="4" style="text-align: left;font-size: 18px;">Cliente: <strong>${nomeCliente}</strong> </td>
            </tr>
            <tr>
                <td colspan="4" style="width: 20%; text-align: center;font-size: 18px;"><strong> ${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</strong></td>
            </tr>
        </table>  
        <table style="width: 100%; ">
            <tr font-size: 22px; style="background-color: black; color: white;width: auto">
                <td colspan="2" style="text-align: left;">Produto</td>
                <td style="text-align: right;">Unit</td>
                <td style="text-align: right;">Total</td>
            </tr>
            <tbody>
            
    `;
                cabBar=false;
            }
            if (cabPor=== true && tipo_produto === 'porcao') {
                detalhesPedido += `
        <table style="width: 100%; ">
            <tr>
                <td colspan="4" style="width: auto;font-size: 14px;">--------------------- corte aqui ------------------</td>

            </tr>
            
            <tbody>
            
    `;
                detalhesPedido += `
        <table style="width: auto; font-size: 15px;">
        
            <tr>
                <td colspan='4' style="background-color: black; color: white;text-align: center; font-size: 16px;width:100%"><strong>>------VIA COZINHA-----<</strong></td>
            </tr>
            <tr >
                <td colspan="4" style="width: auto; text-align: left; width: 100%;">Data/hora: ${data}</td>
            </tr>
             <tr>
                <td colspan="4" style="text-align: left;font-size: 18px;">Cliente: <strong>${nomeCliente}</strong> </td>
            </tr>
            <tr>
                <td colspan="4" style="width: 20%; text-align: center;font-size: 18px;"><strong>${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</strong></td>
            </tr>
        </table>  
        <table style="width: 100%; ">
            <tr font-size: 14px; style="background-color: black; color: white;width: auto">
                <td colspan="2" style="text-align: left;"><strong>Produto</strong></td>
                <td style="text-align: right;"><strong>Unit</strong></td>
                <td style="text-align: right;"><strong>Total</strong></td>
            </tr>
            <tbody>
            
    `;
                cabPor=false;
            }
            if (cabDiv=== true && tipo_produto === 'diversos') {
                detalhesPedido += `
        <table style="width: 100%; ">
            <tr>
                <td colspan="4" style="width: auto;font-size: 14px;">--------------------- corte aqui ------------------</td>

            </tr>
            
            <tbody>
            
    `;
                detalhesPedido += `
        <table style="width: auto; font-size: 15px;">
            <tr>
                <td colspan='4' style="background-color: black; color: white;text-align: center; width:100%"><strong>>-------DIVERSOS-------<</strong></td>
            </tr>
            <tr >
                <td colspan="4" style="width: auto; text-align: left; width: 100%;">Data/hora: ${data}</td>
            </tr>
             <tr>
                <td colspan="4" style="text-align: left;font-size: 18px;">Cliente: <strong>${nomeCliente}</strong> </td>
            </tr>
            <tr>
                <td colspan="4" style="width: 20%; text-align: center;font-size: 18px;"><strong>${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</strong></td>
            </tr>
        </table>  
        <table style="width: 100%; ">
            <tr font-size: 14px; style="background-color: black; color: white;width: auto">
                <td colspan="2" style="text-align: left;"><strong>Produto</strong></td>
                <td style="text-align: right;"><strong>Unit</strong></td>
                <td style="text-align: right;"><strong>Total</strong></td>
            </tr>
            <tbody>
            
    `;
                cabDiv=false;
            }
            detalhesPedido += `
                
                <tr font-size: 22px;>
                    <td colspan="2">${produto}</td>
                    <td style="text-align: center;">${quantidade}</td>
                    <td style="text-align: right;">${valorTotal}</td>
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
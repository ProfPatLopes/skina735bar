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
            const qtd = parseInt(quantidade.value) || 0;
            const valor = preco * qtd;

            // Verificar se o produto já existe na lista
            const itemExistente = produtosSelecionados.find(item => item.nome === nome);

            if (itemExistente) {
                // Atualiza a quantidade e o valor se o item já existir
                itemExistente.qtd = qtd; // Atualiza a quantidade
                itemExistente.valor = valor; // Atualiza o valor total do item
            } else {
                // Adiciona o produto ao array se ainda não estiver na lista
                produtosSelecionados.push({ nome, qtd, valor });
            }

            //totalCompra += (qtd+valor);
        }
    });

    // Atualiza o painel com os itens do pedido
    produtosSelecionados.forEach(item => {
        painel.innerHTML += `<li>${item.nome} - Qtd: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
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
            bebidas: [
                { nome: 'Coca-Cola', preco: 5 },
                { nome: 'Suco de Laranja', preco: 8 },
                { nome: 'Água Mineral', preco: 3 }
            ],
            porcoes: [
                { nome: 'Batata Frita', preco: 12 },
                { nome: 'Frango à Passarinho', preco: 15 },
                { nome: 'Aneis de Cebola', preco: 10 }
            ],
            diversos: [
                { nome: 'Pipoca', preco: 6 },
                { nome: 'Amendoim', preco: 4 },
                { nome: 'Chocolate', preco: 8 }
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
    <div class="produto">
        <input type="checkbox" id="produto${index}" data-produto="${produto.nome}" data-preco="${produto.preco}" onchange="atualizarTotal()">
        <label for="produto${index}">${produto.nome} (R$${produto.preco.toFixed(2)})</label>
        Qtd: <input type="number" id="quantidade${index}" value="0" min="0" onchange="atualizarTotal()">
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

// Configurar a data do pedido
document.getElementById('dataPedido').textContent = new Date().toLocaleString();
function imprimirPedido2() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const tipoPedido = document.getElementById('tipoPedido').value;
    const numeroMesa = document.getElementById('numeroMesa').value;
    const painel = document.getElementById('itensPedido');
    const totalCompra = document.getElementById('totalCompra').textContent;

    if (!nomeCliente || (tipoPedido === 'mesa' && !numeroMesa)) {
        alert('Por favor, preencha todas as informações necessárias antes de imprimir o pedido.');
        return;
    }

    let detalhesPedido = `
        <div style="max-width: 58mm; font-size: 12px; font-family: Arial, sans-serif;">
        <table style="width: 100%; font-size: 22px;">
    
        <tr>
            <!-- Definir proporção de largura para cada elemento -->
            <th text-align: right; style="width: 50%;">
                <img src="Logo.png" style="width: 100%; height: auto;" />
            </th>
            <th colspan="3" text-align: center;"><strong>PEDIDO</strong> </th>
            
        </tr>
        <tr>
            <th colspan="3" text-align: right;"><strong>Cliente: ${nomeCliente}</strong> </th>
            <th style="width: 20%; text-align: right;">Atendimento: ${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</th>
            
        </tr>

    
</table>  
            <table style="width: 100%; ">
               
                    <tr font-size: 22px;>
                        <td style="text-align: left;">Produto</td>
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
            
            detalhesPedido += `
                <tr>
                    <td colspan="4">--------------------------------------</td>
                </tr>
                <tr font-size: 22px;>
                    <td colspan="2">${produto}</td>
                    <td style="text-align: center;">${quantidade}</td>
                    <td style="text-align: right;">${valorTotal}</td>
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
            <hr>
            <p style="text-align: right; font-size: 24px;"><strong>Total:</strong> R$${totalCompra}</p>
        </div>
    `;

    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(`
        <html>
            <head>
                <title>Imprimir Pedido</title>
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

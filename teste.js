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

            totalCompra += valor;
        }
    });

    // Atualiza o painel com os itens do pedido
    produtosSelecionados.forEach(item => {
        painel.innerHTML += `<li>${item.nome} - Qtd: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
    });

    // Atualiza o valor total da compra
    document.getElementById('totalCompra').textContent = totalCompra.toFixed(2);
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
                            <input type="checkbox" id="produto${index}" data-preco="${produto.preco}" onchange="atualizarTotal()">
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
    
        //document.getElementById('valorTotal').textContent = total.toFixed(2);
}

function adicionarItens() {
    const produtos = document.querySelectorAll('.produto');
    let totalCompra = 0;

    produtos.forEach(produto => {
        const checkbox = produto.querySelector('input[type="checkbox"]');
        const quantidade = produto.querySelector('input[type="number"]');
        const nome = produto.querySelector('label').textContent;

        if (checkbox.checked && quantidade.value > 0) {
            const preco = parseFloat(checkbox.getAttribute('data-preco'));
            const qtd = parseInt(quantidade.value) || 0;
            const valor = preco * qtd;

            // Verifica se o item já está no array
            const itemExistente = produtosSelecionados.find(item => item.nome === nome);

            if (itemExistente) {
                // Atualiza a quantidade e o valor
                itemExistente.qtd = qtd;
                itemExistente.valor = valor;
            } else {
                // Adiciona o item caso não exista
                produtosSelecionados.push({ nome, qtd, valor });
            }
        } else {
            // Remove o item se o checkbox for desmarcado
            const index = produtosSelecionados.findIndex(item => item.nome === nome);
            if (index !== -1) {
                produtosSelecionados.splice(index, 1);
            }
        }
    });

    // Atualiza o painel e o total
    const painel = document.getElementById('itensPedido');
    painel.innerHTML = ''; // Limpa o painel para evitar duplicações
    produtosSelecionados.forEach(item => {
        painel.innerHTML += `<li>${item.nome} - Qtd: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
        totalCompra += item.valor;
    });

    // Atualiza o valor total da compra
    document.getElementById('totalCompra').textContent = totalCompra.toFixed(2);
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

function imprimirPedido() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const tipoPedido = document.getElementById('tipoPedido').value;
    const numeroMesa = document.getElementById('numeroMesa').value;
    const painel = document.getElementById('itensPedido');
    const totalCompra = document.getElementById('totalCompra').textContent;

    // Validação para garantir que os campos necessários estão preenchidos
    if (!nomeCliente || (tipoPedido === 'mesa' && !numeroMesa)) {
        alert('Por favor, preencha todas as informações necessárias antes de imprimir o pedido.');
        return;
    }

    // Cabeçalho do pedido
    let detalhesPedido = `
        <img src="Logo.png" class="logo_comanda" />
        <h2 style="text-align: center;">Pedido</h2>
        <p><strong>Cliente:</strong> ${nomeCliente}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Tipo de Pedido:</strong> ${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</p>
        <hr>
        <h3>Itens do Pedido</h3>
        <table style="width: 100%; border-collapse: collapse;" border="1">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Vlr Unit (R$)</th>
                    <th>Vlr Total (R$)</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Adiciona os itens do painel
    const itens = Array.from(painel.querySelectorAll('li'));
    if (itens.length > 0) {
        itens.forEach(item => {
            const produto = item.getAttribute('data-produto'); // Nome do produto
            const quantidade = item.getAttribute('data-qtd'); // Quantidade
            const valorUnitario = item.getAttribute('data-valor'); // Valor unitário

            const valorTotal = (quantidade * valorUnitario).toFixed(2); // Valor total
            detalhesPedido += `
                <tr>
                    <td>${produto}</td>
                    <td>${quantidade}</td>
                    <td>${Number(valorUnitario).toFixed(2)}</td>
                    <td>${valorTotal}</td>
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

    // Finaliza o pedido
    detalhesPedido += `
            </tbody>
        </table>
        <hr>
        <p style="text-align: right; font-size: 1.2em;"><strong>Total:</strong> R$${totalCompra}</p>
    `;

    // Abre uma nova janela para impressão
    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(`
        <html>
            <head>
                <title>Imprimir Pedido</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    table th, table td {
                        padding: 5px;
                        text-align: center;
                    }
                    .logo {
                        display: block;
                        margin: 0 auto 20px auto;
                        width: 100px;
                    }
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

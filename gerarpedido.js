async function conectarImpressora() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['printer']
        });

        const server = await device.gatt.connect();
        return server;
    } catch (error) {
        console.error('Erro ao conectar à impressora:', error);
    }
}

async function imprimirESC_POS(data) {
    try {
        const server = await conectarImpressora();
        const service = await server.getPrimaryService('printer');
        const characteristic = await service.getCharacteristic('characteristic_uuid'); 
        await characteristic.writeValue(new TextEncoder().encode(data));
    } catch (error) {
        console.error('Erro ao imprimir:', error);
    }
}

function imprimirPedido() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const totalCompra = document.getElementById('totalCompra').textContent;
    const comandosEscPos = `Cliente: ${nomeCliente}\nTotal: R$${totalCompra}`;
    imprimirESC_POS(comandosEscPos);
}
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

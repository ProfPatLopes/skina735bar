
            const produtosSelecionados = []; // Array para armazenar os produtos já adicionados
    function exibirProdutos() {
        const categoria = document.getElementById('categoria').value;
        const listaProdutos = document.getElementById('listaProdutos');
        listaProdutos.innerHTML = '';
        if (categoria && produtosPorCategoria[categoria]) {
            const produtos = produtosPorCategoria[categoria];
            produtos.forEach((produto, index) => {
                const produtoHTML = `
                    <div class="produto">
                        <input type="checkbox" id="produto${categoria}${index}" data-preco="${produto.preco}" onchange="atualizarTotal()">
                        <label for="produto${categoria}${index}">${produto.nome} (R$${produto.preco.toFixed(2)})</label>
                        Quantidade: <input type="number" id="quantidade${categoria}${index}" value="0" min="0" onchange="atualizarTotal()">
                        
                    </div>
                `;
                listaProdutos.innerHTML += produtoHTML;
            });
        }
    }

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
        painel.innerHTML += `<li>${item.nome} - Quantidade: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
    });

    // Atualiza o valor total da compra
    document.getElementById('totalCompra').textContent = totalCompra.toFixed(2);
}


    function atualizarPainel() {
        const painel = document.getElementById('itensPedido');
        //painel.innerHTML = '';
        produtosSelecionados.forEach(item => {
            painel.innerHTML += `<li>${item.nome} - Quantidade: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
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
                            Quantidade: <input type="number" id="quantidade${index}" value="0" min="0" onchange="atualizarTotal()">
                            <span class="valor-produto" id="valorProduto${index}">R$0.00</span>
                        </div>
                    `;
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
        painel.innerHTML += `<li>${item.nome} - Quantidade: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
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
        //document.getElementById('valorTotal').textContent = '0.00';
        document.getElementById('totalCompra').textContent = '0.00';
        produtosSelecionados.length = 0; // Reseta o array de produtos selecionados
    }
    
    const produtosSelecionados = []; // Array para armazenar os produtos já adicionados
    const listaProdutos = document.getElementById('listaProdutos');
    //listaProdutos.innerHTML = '';
    function exibirProdutos() {
        const categoria = document.getElementById('categoria').value;
        

        if (categoria && produtosPorCategoria[categoria]) {
            const produtos = produtosPorCategoria[categoria];
            produtos.forEach((produto, index) => {
                const produtoHTML = `
                    <div class="produto">
                        <input type="checkbox" id="produto${categoria}${index}" data-preco="${produto.preco}" onchange="atualizarTotal()">
                        <label for="produto${categoria}${index}">${produto.nome} (R$${produto.preco.toFixed(2)})</label>
                        Quantidade: <input type="number" id="quantidade${categoria}${index}" value="0" min="0" onchange="atualizarTotal()">
                        <span class="valor-produto" id="valorProduto${categoria}${index}">R$0.00</span>
                    </div>
                `;
                listaProdutos.innerHTML += produtoHTML;
            });
        }
    }

    function adicionarItens() {
        const produtos = document.querySelectorAll('.produto');
        const painel = document.getElementById('itensPedido');
        let totalCompra = parseFloat(document.getElementById('totalCompra').textContent) || 0;

        produtos.forEach(produto => {
            const checkbox = produto.querySelector('input[type="checkbox"]');
            const quantidade = produto.querySelector('input[type="number"]');
            const nome = produto.querySelector('label').textContent;

            if (checkbox.checked && quantidade.value > 0) {
                const preco = parseFloat(checkbox.getAttribute('data-preco'));
                const qtd = parseInt(quantidade.value) || 0;
                const valor = preco * qtd;

                // Verificar se o produto já foi adicionado
                const itemExistente = produtosSelecionados.find(item => item.nome === nome);

                if (!itemExistente) {
                    produtosSelecionados.push({ nome, qtd, valor });
                    painel.innerHTML += `<li>${nome} - Quantidade: ${qtd} - Valor: R$${valor.toFixed(2)}</li>`;
                } else {
                    itemExistente.qtd += qtd;
                    itemExistente.valor += valor;
                    atualizarPainel();
                }

                totalCompra += valor;
            }
        });

        document.getElementById('totalCompra').textContent = totalCompra.toFixed(2);
    }

    function atualizarPainel() {
        const painel = document.getElementById('itensPedido');
        //painel.innerHTML = '';
        produtosSelecionados.forEach(item => {
            painel.innerHTML += `<li>${item.nome} - Quantidade: ${item.qtd} - Valor: R$${item.valor.toFixed(2)}</li>`;
        });
    }

    function limparCampos() {
        document.getElementById('categoria').value = '';
        document.getElementById('listaProdutos').innerHTML = '';
        document.getElementById('itensPedido').innerHTML = '';
        document.getElementById('valorTotal').textContent = '0.00';
        document.getElementById('totalCompra').textContent = '0.00';
        produtosSelecionados.length = 0; // Limpa os produtos selecionados
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
                const valorProduto = produto.querySelector('.valor-produto');

                if (checkbox.checked) {
                    const preco = parseFloat(checkbox.getAttribute('data-preco'));
                    const qtd = parseInt(quantidade.value) || 0;
                    const valor = preco * qtd;
                    valorProduto.textContent = `R$${valor.toFixed(2)}`;
                    total += valor;
                } else {
                    valorProduto.textContent = 'R$0.00';
                }
            });

            document.getElementById('valorTotal').textContent = total.toFixed(2);
        }

        function adicionarItens() {
            const produtos = document.querySelectorAll('.produto');
            const painel = document.getElementById('itensPedido');
            

            produtos.forEach(produto => {
                const checkbox = produto.querySelector('input[type="checkbox"]');
                const quantidade = produto.querySelector('input[type="number"]');
                const nome = produto.querySelector('label').textContent;
                if (checkbox.checked && quantidade.value > 0) {
                    const preco = parseFloat(checkbox.getAttribute('data-preco'));
                    const qtd = parseInt(quantidade.value) || 0;
                    const valor = preco * qtd;
                    totalCompra += valor;

                    painel.innerHTML += `<li>${nome} - Quantidade: ${qtd} - Valor: R$${valor.toFixed(2)}</li>`;
                }
            });

            document.getElementById('totalCompra').textContent = totalCompra.toFixed(2);
        }

        function limparCampos() {
            let totalCompra = 0;
            painel.innerHTML = '';
            document.getElementById('categoria').value = '';
            document.getElementById('listaProdutos').innerHTML = '';
            document.getElementById('itensPedido').innerHTML = '';
            document.getElementById('valorTotal').textContent = '0.00';
            document.getElementById('totalCompra').textContent = '0.00';
        }
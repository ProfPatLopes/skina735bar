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
                { nome: 'Suco Laranja', preco: 8 },
                { nome: 'Água Mineral', preco: 3 }
            ],
            porcoes: [
                { nome: 'Batata', preco: 12 },
                { nome: 'Frango ', preco: 15 },
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

function getDataAtual() {
    var hoje = new Date();
    var dia = String(hoje.getDate()).padStart(2, '0');
    var mes = String(hoje.getMonth() + 1).padStart(2, '0');
    var ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Configurar a data do pedido
//document.getElementById('dataHora').textContent = new Date().toLocaleString();


function imprimirPedido2() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const tipoPedido = document.getElementById('tipoPedido').value;
    const numeroMesa = document.getElementById('numeroMesa').value;
    const painel = document.getElementById('itensPedido');
    const totalCompra = document.getElementById('totalCompra').textContent;
    var data = getDataAtual(); 

    if (!nomeCliente || (tipoPedido === 'mesa' && !numeroMesa)) {
        alert('Por favor, preencha todas as informações necessárias antes de imprimir o pedido.');
        return;
    }

    let detalhesPedido = `
        <div style="max-width: 58mm; font-size: 12px; font-family: Arial, sans-serif;">
        <table style="width: 100%; font-size: 22px;">
            <tr style="font-size: 22px;">
                <td style="text-align: right; width: 30%;"><img src="Logo.png" style="width: 100%; height: auto;"></td>
                <td colspan="3" style="text-align: left; padding: 15px""><strong>PEDIDO</strong></td>
            </tr>
            <tr font-size: 20px;>
                <td colspan="4" style="text-align: center; width: 100%;">${data}</td>
            </tr>
             <tr>
                <td colspan="4" style="text-align: left;"><strong>${nomeCliente}</strong> </td>
            </tr>
            <tr>
                <td colspan="4" style="width: 20%; text-align: left;">${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</td>
            </tr>
        </table>  
        <table style="width: 100%; ">
            <tr>
                <td colspan="4">-----------------------------------------------</td>
            </tr>
            <tr font-size: 22px; style="width: 100%;">
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
            
            detalhesPedido += `
                <tr>
                    <td colspan="4">-----------------------------------------------</td>
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
                <tr>
                    <td colspan="4">-----------------------------------------------</td>
                </tr>
                </tbody>
            </table>
            
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
    gerarArquivoExcel();
    //novaJanela.print();
    //novaJanela.close();
}
// inicio gerar arquivo
function gerarArquivoExcel() {
    const dadosPedido = [
        ['Data', getDataAtual()],
        ['Cliente', document.getElementById('nomeCliente').value],
        ['Produto', 'Quantidade', 'Valor Unitário (R$)', 'Valor Total (R$)'], // Cabeçalho
    ];

    produtosSelecionados.forEach(item => {
        dadosPedido.push([
            item.nome,
            item.qtd,
            (item.valor / item.qtd).toFixed(2), // Valor unitário
            item.valor.toFixed(2)               // Valor total
        ]);
    });

    dadosPedido.push([], ['Total do Pedido (R$)', '', '', document.getElementById('totalCompra').textContent]);

    // Criação do workbook (arquivo Excel)
    const ws = XLSX.utils.aoa_to_sheet(dadosPedido); // Converte o array em uma aba do Excel
    const wb = XLSX.utils.book_new();               // Cria um novo workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Pedido'); // Adiciona a aba "Pedido" ao arquivo Excel

    // Salvar o arquivo no navegador
    const excelBlob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });
    const fileName = `Pedido_${getDataAtual().replace(/\//g, '-')}.xlsx`;

    // Chama a função para enviar por e-mail
    enviarEmailExcel(fileName, excelBlob);
}
// fim gerar arquivo
// inicio enviar email
function enviarEmailExcel(nomeArquivo, arquivoExcel) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const base64Excel = e.target.result.split(',')[1]; // Obtém o arquivo como Base64

        const parametrosEmail = {
            to_email: 'barskina735@gmail.com',
            subject: 'Novo Pedido - Arquivo Excel',
            message: 'Segue em anexo o arquivo Excel com os detalhes do pedido.',
            attachment: {
                filename: nomeArquivo,
                content: base64Excel,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                disposition: 'attachment',
            },
        };

        emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', parametrosEmail)
            .then(response => {
                alert('E-mail enviado com o Excel anexado!');
                console.log('SUCESSO:', response.status, response.text);
            }, error => {
                alert('Erro ao enviar o e-mail.');
                console.log('ERRO:', error);
            });
    };

    reader.readAsDataURL(arquivoExcel); // Converte o arquivo Excel para Base64
}

//
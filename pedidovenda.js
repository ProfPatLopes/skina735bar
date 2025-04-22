const produtosSelecionados = []; // Array para armazenar os produtos já adicionados
const bebid = [];
const porco = [];
const divers = [];



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
                { nome:'Heineken 600ml',   preco:14.00,tipo:'bebida'},
                { nome:'Skol     600ml',       preco:10.00,tipo:'bebida'},
                { nome:'Amistel  600ml',    preco:10.00,tipo:'bebida'},
                { nome:'Original 600ml',   preco:14.00,tipo:'bebida'},
                { nome:'Brahma   600ml',     preco:12.00,tipo:'bebida'},
                { nome:'Skol     300ml',       preco: 5.00,tipo:'bebida'},
                { nome:'Brahma   300ml',     preco: 5.00,tipo:'bebida'},
                { nome:'Original 300ml',   preco: 6.00,tipo:'bebida'},
                { nome:'Conti    300ml',      preco: 4.00,tipo:'bebida'},
                { nome:'Skol lt     350ml',    preco: 5.00,tipo:'bebida'},
                { nome:'Brahma lt   350ml',  preco: 5.00,tipo:'bebida'},
                { nome:'Amistel lt  350ml', preco: 5.00,tipo:'bebida'},
                { nome:'Heineken lt 350ml',preco: 6.00,tipo:'bebida'}
            ],
            refri:[
                { nome:'Coca-cola     350ml ',   preco: 6.00,tipo:'bebida'},
                { nome:'Fanta laranja 350ml',preco: 6.00,tipo:'bebida'},
                { nome:'Fanta uva     350ml ',   preco: 6.00,tipo:'bebida'},
                { nome:'Guarana       350ml ',     preco: 6.00,tipo:'bebida'},
                { nome:'Coca-Cola    1L',  preco: 8.00,tipo:'bebida'},
                { nome:'Coca-cola 290ml',    preco: 5.00,tipo:'bebida'},
                { nome:'Sodinha   200ml',      preco: 3.00,tipo:'bebida'},
                { nome:'Tubaina   600ml',      preco: 5.00,tipo:'bebida'}
            ],
            suco:[
                { nome:'Dell Vale uva',      preco: 5.00,tipo:'bebida'}, 
                { nome:'Dell Vale laranja',  preco: 5.00,tipo:'bebida'}
            ],
            dose:[
                { nome:'Passport Scotch',         preco: 10.00,tipo:'bebida'},
                { nome:'Matu Nobilis',         preco: 10.00,tipo:'bebida'},
                { nome:'Vodka Smirnoff',      preco:  8.00,tipo:'bebida'},
                { nome:'Vodka',              preco:  8.00,tipo:'bebida'},
                { nome:'Ypioca',              preco:  5.00,tipo:'bebida'},
                { nome:'Campari',            preco:  8.00,tipo:'bebida'},
                { nome:'Caipirinha (vodka)', preco:  15.00,tipo:'bebida'}
            ],
            outras:[
                { nome:'Redbull',            preco: 10.00,tipo:'bebida'},
                { nome:'Monster',            preco: 10.00,tipo:'bebida'},
                { nome:'Agua s/gas 500ml',   preco:  4.00,tipo:'bebida'},
                { nome:'Agua c/gas 500ml',   preco:  4.00,tipo:'bebida'}
            ],
            porcoes: [
                { nome: 'Frango frito 1kg',     preco: 40.00, tipo:'porcao' },
                { nome: 'Frango frito 500g',    preco: 30.00, tipo:'porcao' },
                { nome: 'Peixe frito 500g ',    preco: 45.00, tipo:'porcao' },
                { nome: 'Peixe frito 250g',     preco: 30.00, tipo:'porcao' },
                { nome: 'Calabresa 500g ',      preco: 30.00, tipo:'porcao' },
                { nome: 'Calabresa 250g',       preco: 20.00, tipo:'porcao' },
                { nome: 'Batata frita',         preco: 30.00, tipo:'porcao' },
                { nome: 'Batata frita',         preco: 20.00, tipo:'porcao' },
                { nome: 'Polenta 500g',              preco: 20.00, tipo:'porcao' },
                { nome: 'Polenta 250g',              preco: 15.00, tipo:'porcao' }
                
            ],
            diversos: [
                { nome: 'Sinuca ficha', preco: 2 , tipo:'diversos'}
            ]
};
function exibirProdutos() {
            const categoria = document.getElementById('categoria').value;
            const listaProdutos = document.getElementById('listaProdutos');
            listaProdutos.innerHTML = '';
//


//
            if (categoria && produtosPorCategoria[categoria]) {
                const produtos = produtosPorCategoria[categoria];
                produtos.forEach((produto, index) => {
                    const produtoHTML = `
                    <div class="produto" style="width:100%">
                        <table style="width:100%">
                            <tr style="width:100%">
                                <td style="width:2%"><input type="checkbox" id="produto${index}" data-tipo="${produto.tipo}" data-produto="${produto.nome}" data-preco="${produto.preco}" onchange="atualizarTotal()"></td>
                                <td><label class='item' for="produto${index}">${produto.nome} (R$${produto.preco.toFixed(2)})</label></td>
                                <td style="width:10%; text-align: right"><label class='quant' >Qtd:<input type="number" style="width: 35%" id="quantidade${index}" value=" " min="0" onchange="atualizarTotal()"></label</td>
                                <td style="width:5%"><button class="botao" onclick="adicionarItens()"><img src="adiciona.png" alt="Adicionar" width="20" height="20"></button></td>
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



function imprimirPedido2() {
    
    const checkbox    = document.getElementById('fecharConta');
    const nomeCliente = document.getElementById('nomeCliente').value;
    const tipoPedido  = document.getElementById('tipoPedido').value;
    const numeroMesa  = document.getElementById('numeroMesa').value;
    const painel      = document.getElementById('itensPedido');
    const totalCompra = document.getElementById('totalCompra').textContent;
    
    var data = getDataAtual(); 

    if (!nomeCliente || (tipoPedido === 'mesa' && !numeroMesa)) {
        alert('Por favor, preencha todas as informações necessárias antes de imprimir o pedido.');
        return;
    }
    //        <div style="max-width: 78mm; text-align: center; font-size: 12px; font-family: Arial, sans-serif; border-style:solid dashed;">

    let detalhesPedido = `
        <div style="text-align: center; font-size: 12px; font-family: Arial, sans-serif; border-style:solid dashed;">
        <table style="width: 100%; font-size: 22px;">
            <tr>
                <td style="text-align: right; width: 30%;"><img src="Logo.png" style="width: 100%; height: auto;"></td>
                <td colspan="3" style="font-size: 6px; text-align: justify; padding: 15px""><strong>Skina 735 Bar - Rua Norte do Paraná, 735 esquina com a Goioerê Bairro Jd. Curitiba - Goioerê-Pr CEP 87.360-000 CNPJ: 14.451.465/0001-73 Contato: (44) 99865-5735</strong></td>
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
            <tbody>`;
    //
    if (produtosSelecionados.length > 0) {
        produtosSelecionados.forEach(item => {
            const produto = item.nome;
            const quantidade = item.qtd;
            const valorUnitario = item.valor / item.qtd; // Calcula o valor unitário
            const valorTotal = item.valor.toFixed(2); // Valor total do item
            const tipo_produto = item.tipo;
            if (tipo_produto === "bebida") {
                bebid.push({ produto, quantidade, valorUnitario, valorTotal });
            } 
            if (tipo_produto === "porcao") {
                porco.push({ produto, quantidade, valorUnitario, valorTotal });
            } 
            if (tipo_produto === "diversos") {
                divers.push({ produto, quantidade, valorUnitario, valorTotal });
            }
            detalhesPedido += `
                <tr font-size: 22px;>
                    <td colspan="2">${produto}</td>
                    <td style="text-align: center;">${quantidade}</td>
                    <td style="text-align: right;">${valorTotal}</td>
                </tr>
                <tr style="width: auto;">
                    <td colspan="4">.......................................................</td>
                </tr>`;
        });
        // imprimi por categoria
        detalhesPedido += `           
        </tbody>
        </table>
        <p style="background-color: black; color: white;text-align: right; font-size: 22px;"><strong>Valor Total:  ${totalCompra}</strong></p>`;
// se não for fechamento imprime individual 
        if (!checkbox.checked) {
            if (divers.length > 0 ) {
                detalhesPedido += `
                <p style="text-align: center;font-size: 14px;">----------------- corte aqui ------------------</p>
                <p style="background-color: black; color: white;text-align: center; font-size: 16px;"><strong>>----------DIVERSOS----------<</strong></p>
                <table style="width: 100%; font-size: 15px;">
                    <tbody>
                        <tr >
                        <td colspan="4" style="width: auto; text-align: left; width: 100%;">Data/hora: ${data}</td>
                        </tr>
                        <tr>
                        <td colspan="4" style="text-align: left;font-size: 18px;">Cliente: <strong>${nomeCliente}</strong> </td>
                        </tr>
                        <tr>
                        <td colspan="4" style="width: 20%; text-align: center;font-size: 18px;"><strong> ${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</strong></td>
                        </tr>
                    </tbody>
                </table>  
                <table style="width: 100%; ">`;
                divers.forEach(item => {
                detalhesPedido += `<tr>
                <td colspan="3" style="text-align: left;">${item.produto}</td>
                <td style="text-align: right;">${item.quantidade}</td>
                </tr>`;
                });
                detalhesPedido+=`</table>`;
            }
            if (bebid.length > 0 ) {
                detalhesPedido += `
                    <p style="text-align: center;font-size: 14px;">------------------- corte aqui ----------------</p>
                    <p style="background-color: black; color: white;text-align: center; font-size: 16px;"><strong>>----------VIA BAR----------<</strong></p>
                    <table style="width: 100%; font-size: 15px;">
                    <tbody>                    
                        <tr >
                            <td colspan="4" style="width: auto; text-align: left; width: 100%;">Data/hora: ${data}</td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align: left;font-size: 18px;">Cliente: <strong>${nomeCliente}</strong> </td>
                        </tr>
                        <tr>
                            <td colspan="4" style="width: 20%; text-align: center;font-size: 18px;"><strong> ${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</strong></td>
                        </tr>
                    </body>
                    </table>  
                    <table style="width: 100%; ">`;

                bebid.forEach(item => {
                    detalhesPedido += `<tr>
                    <td colspan="3" style="text-align: left;">${item.produto}</td>
                    <td style="text-align: right;">${item.quantidade}</td>
                    </tr>`;
                });
                detalhesPedido+=`</table>`;
            }
            if (porco.length > 0 ) {
                detalhesPedido += `
                        <p style="text-align: center;font-size: 14px;">------------------- corte aqui ----------------</p>
                        <p style="background-color: black; color: white;text-align: center; font-size: 16px;"><strong>>--------VIA COZINHA-------<</strong></p> 
                        <table style="width: 100%; font-size: 15px;">
                        <tbody>    
                            <tr >
                                <td colspan="4" style="width: auto; text-align: left; width: 100%;">Data/hora: ${data}</td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align: left;font-size: 18px;">Cliente: <strong>${nomeCliente}</strong> </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="width: 20%; text-align: center;font-size: 18px;"><strong>${tipoPedido === 'mesa' ? `Mesa ${numeroMesa}` : 'Balcão'}</strong></td>
                            </tr>
                            </tbody>
                    </table>  
                    <table style="width: 100%; ">`;
                        porco.forEach(item => {
                            detalhesPedido += `<tr>
                                <td colspan="3" style="text-align: left;">${item.produto}</td>
                    <td style="text-align: right;">${item.quantidade}</td>
                    </tr>`;
                        })

                    
                    detalhesPedido +=`</table>`;
            }
    // vai imprimir
        } else{
            /*
            let totalCompra = parseFloat(document.getElementById("totalCompra").innerText); // Obter o valor do DOM
            const txid = "Clientedodia";
            //
            const payloadPIX = `00020126360014BR.GOV.BCB.PIX0114144514650001735204000053039865405${totalCompra.toFixed(2)}5802BR5901N6001C62150511skina745bar6304A830`;
            const canvasElement = document.getElementById("qrcode");
            QRCode.toCanvas(canvasElement, payloadPIX, function (error) {
            if (error) {
                console.error("Erro ao gerar QR Code:", error);
            } else {
                console.log("QR Code gerado com sucesso!");
                const qrCodeBase64 = canvasElement.toDataURL();
                console.log(qrCodeBase64);
                detalhesPedido  += `
                    <p style="text-align: center;">..................................................</p>
                    <p style="text-align: center;">PAGAMENTO - PIX</p>
                    <p style="text-align: center;">..................................................</p>
                    
                    
                    <tr>
                        <td colspan="4" style="text-align: center;">
                            <img src="${qrCodeBase64}" alt="QR Code" style="width: 50%;">
                        </td>
                    </tr>
                    </tbody></table></div>`;
            // vai imprimir
            }}); */
            // gera qr        
        } // fechar pedido e gera qr  
    // Após garantir que o QR Code foi gerado, abrir nova janela
    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(`
        <html>
            <head>
                <title>Imprimir Pedido</title>
                <link rel="shortcut icon" href="Logo.png" type="image/x-icon">
                <style>
                    body { margin: 0; padding: 10px; font-family: Arial, sans-serif; }
                    table, th, td { border: 0px solid #000; padding: 0px; }
                    img { display: block; margin: 0 auto; }
                </style>
            </head>
            <body>
                <table>
                    ${detalhesPedido}
                </table>
            </body>
        </html>
    `);
    novaJanela.document.close();
    novaJanela.print();
    novaJanela.close();  //fim por categoria
    } else {
        
           detalhesPedido += `
            <tr>
                <td colspan="4" style="text-align: center;">Nenhum item selecionado.</td>
            </tr>
                      </tbody>
            </table>
        </div>
        `;
    }
    
        
    
}


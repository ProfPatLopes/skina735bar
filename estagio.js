document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu-vertical');
    menu.classList.toggle('active');
});
// Função para esconder/mostrar o campo número da mesa
function toggleMesa() {
    var balcaoCheckbox = document.getElementById('balcao');
    var mesaField = document.getElementById('numero_mesa_field');
    var mesaInput = document.getElementById('numero_mesa');

    if (balcaoCheckbox.checked) {
        mesaField.style.display = 'none';
        mesaInput.value = "";
        mesaInput.removeAttribute('required');
    } else {
        mesaField.style.display = 'block';
        mesaInput.setAttribute('required', 'required');
    }
}

// Função para esconder o checkbox "Balcão" se o cliente inserir número da mesa
function toggleBalcao() {
    var balcaoContainer = document.getElementById('balcao_container');
    var balcaoCheckbox = document.getElementById('balcao');
    var mesaInput = document.getElementById('numero_mesa');

    if (mesaInput.value.trim() !== "") {
        balcaoContainer.style.display = 'none';
        balcaoCheckbox.checked = false;
        toggleMesa();
    } else {
        balcaoContainer.style.display = 'block';
    }
}

// Função para obter a data atual formatada
function getDataAtual() {
    var hoje = new Date();
    var dia = String(hoje.getDate()).padStart(2, '0');
    var mes = String(hoje.getMonth() + 1).padStart(2, '0');
    var ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para imprimir o pedido
function imprimirPedido() {
    var nome = document.getElementById('nome').value;
    var balcao = document.getElementById('balcao').checked;
    var numeroMesa = document.getElementById('numero_mesa').value;
    var pedidosBar = document.getElementById('pedidos_bar').value;
    var pedidosCozinha = document.getElementById('pedidos_cozinha').value;
    var pedidosCaixa = document.getElementById('pedidos_caixa').value;
    var dataAtual = getDataAtual(); // Obtém a data formatada

    if (!nome || (!balcao && !numeroMesa) || (!pedidosBar.trim() && !pedidosCozinha.trim() && !pedidosCaixa.trim())) {
        alert("Preencha todos os campos corretamente antes de imprimir!");
        return;
    }

    // Layout de impressão
    var conteudoImpressao = `
        <div style="font-family: Arial, sans-serif; text-align: center;">
            <h2>Pedido - Skina 735 Bar</h2>
            <p><strong>Data:</strong> ${dataAtual}</p>
            <p><strong>Nome:</strong> ${nome}</p>
            ${balcao ? `<p><strong>Local:</strong> Balcão</p>` : `<p><strong>Mesa:</strong> ${numeroMesa}</p>`}
            <hr>
            ${pedidosBar ? `<h3>Pedidos para o BAR:</h3><pre style="font-size: 16px; text-align: left;">${pedidosBar}</pre><hr>` : ""}
            ${pedidosCozinha ? `<h3>Pedidos para a COZINHA:</h3><pre style="font-size: 16px; text-align: left;">${pedidosCozinha}</pre><hr>` : ""}
            ${pedidosCaixa ? `<h3>Pedidos para o CAIXA:</h3><pre style="font-size: 16px; text-align: left;">${pedidosCaixa}</pre><hr>` : ""}
            <p>Obrigado por escolher o Skina 735 Bar!</p>
        </div>
    `;

    var janelaImpressao = window.open('', '', 'width=600,height=600');
    janelaImpressao.document.write('<html><head><title>Imprimir Pedido</title></head><body>');
    janelaImpressao.document.write(conteudoImpressao);
    janelaImpressao.document.write('</body></html>');
    janelaImpressao.document.close();
    janelaImpressao.print();
}

// Aplica as configurações ao carregar a página
window.onload = function () {
    toggleMesa();
    toggleBalcao();
};


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

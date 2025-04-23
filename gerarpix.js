function gerar() {
    // Obtendo o valor inserido pelo usuário
    const valorPix = document.getElementById('valorPix').value;
    
    // Verificar se o valor foi preenchido
    if (!valorPix) {
        alert("Por favor, digite um valor para gerar o QR Code.");
        return;
    }

    // Construindo a payload do PIX (exemplo simplificado)
    const payloadPIX = `00020126360014BR.GOV.BCB.PIX0114144514650001735204000053039865405${parseFloat(valorPix).toFixed(2)}5802BR5901N6001C62150511skina745bar6304A830`;

    // Obtendo o elemento canvas
    const canvasElement = document.getElementById("qrcode");
    canvasElement = canvasElement.toDataURL();
    // Gerando o QR Code no canvas
    QRCode.toCanvas(canvasElement, payloadPIX, function (error) {
        if (error) {
            console.error("Erro ao gerar QR Code:", error);
        } else {
            console.log("QR Code gerado com sucesso no canvas!");
            const qrCodeBase64 = canvasElement.toDataURL();
        }
    });
}

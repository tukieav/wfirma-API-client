exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', data);

    // Przykładowy klucz webhooka, który powinien być unikalny dla każdej domeny
    const webhookKey = 'aca700257b337ba79e6254232d60ec99';

    // Przetwarzanie danych z webhooka
    res.status(200).json({ webhook_key: webhookKey });
};
exports.handleWebhook = (req, res) => {
    const data = req.body;
    console.log('Webhook received:', data);

    // Przykładowy klucz webhooka, który powinien być unikalny dla każdej domeny
    const webhookKey = '50f1811d67487937bdd53dae49043e56';

    // Przetwarzanie danych z webhooka
    res.status(200).json({ webhook_key: webhookKey });
};
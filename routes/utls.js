const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const urls = require('../index').urls; // Importa o objeto urls do index.js

router.post('/shorten', (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();

    urls[shortUrl] = originalUrl; // Armazena a URL no objeto em memória

    res.json({ shortUrl: `http://seu-dominio/${shortUrl}` });
});

router.get('/:id', (req, res) => {
    const originalUrl = urls[req.params.id]; // Busca a URL no objeto em memória

    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: 'URL não encontrada' });
    }
});

router.get('/date/:date', (req, res) => {
    // Como estamos usando apenas memória, não temos data de criação.
    res.status(501).json({ error: 'Operação não suportada com armazenamento em memória' }); // Retorna erro 501 (Not Implemented)
});

router.get('/find/:short', (req, res) => {
    const originalUrl = urls[req.params.short];
    if (originalUrl) {
        res.json({ originalUrl: originalUrl, shortUrl: req.params.short });
    } else {
        res.status(404).json({ error: 'URL não encontrada' });
    }
});

module.exports = router;
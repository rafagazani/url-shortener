const express = require('express');
const shortid = require('shortid');
const app = express();
const urlsRouter = require('./routes/urls');

const urls = {}; // Objeto para armazenar as URLs em memória
exports.urls = urls; // Exporta o objeto para ser usado nas rotas

app.use(express.json());
app.use('/urls', urlsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
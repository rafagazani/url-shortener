const express = require('express');
const shortid = require('shortid');
const app = express();
const urls = {}; // Objeto para armazenar as URLs em memória

app.use(express.json());

// ... (resto do código)
app.use('/urls', urlsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
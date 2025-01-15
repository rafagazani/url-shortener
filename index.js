const express = require('express');
const app = express();
const urlsRouter = require('./routes/urls');

app.use(express.json());
app.use('/urls', urlsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
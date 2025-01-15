const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const shortid = require('shortid'); // Para gerar URLs curtas

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();

    try {
        const url = await Url.create({ originalUrl, shortUrl });
        res.json({ shortUrl: `http://seu-dominio/${url.shortUrl}` }); // Substitua pelo seu domínio
    } catch (error) {
        res.status(500).json({ error: 'Erro ao encurtar URL' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const url = await Url.findOne({ where: { shortUrl: req.params.id } });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'URL não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar URL' });
    }
});

router.get('/date/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        const urls = await Url.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.between]: [date, nextDay]
                }
            }
        });
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar URLs por data' });
    }
});

router.get('/find/:short', async (req, res) => {
    try {
      const url = await Url.findOne({ where: { shortUrl: req.params.short } });
      if (url) {
        res.json(url);
      } else {
        res.status(404).json({ error: 'URL não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar URL' });
    }
  });

module.exports = router;
const express = require('express');
const routes = express.Router();

const Automovel = require('./controllers/automovel.js');
const Estadia = require('./controllers/estadia.js');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Estacionamento ACME' });
});

routes.post('/automoveis', Automovel.create);
routes.get('/automoveis', Automovel.read);
routes.get('/automoveis/:placa', Automovel.readOne);
routes.put('/automoveis/:placa', Automovel.update);
routes.delete('/automoveis/:placa', Automovel.remove);

routes.post('/estadias', Estadia.create);
routes.get('/estadias', Estadia.read);
routes.get('/estadias/:id', Estadia.readOne);
routes.put('/estadias/:id', Estadia.update);
routes.delete('/estadias/:id', Estadia.remove);

module.exports = routes;
const express = require('express');

const UserController = require('./controllers/UserController')
const FinancesController = require('./controllers/FinancesController')


const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:user_id', UserController.delete);


routes.get('/user/:user_id/finances', FinancesController.index);
routes.post('/user/:user_id/finances', FinancesController.store);
routes.delete('/user/:user_id/finances/:id', FinancesController.delete);

module.exports = routes;
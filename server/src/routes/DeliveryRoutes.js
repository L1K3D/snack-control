// src/routes/DeliveryRoutes.js
const express = require('express');
const router = express.Router();
const DeliveryController = require('../controller/DeliveryController');

// Listar autorizações de uma data para entregar
router.get('/authorized', DeliveryController.listAuthorized);

// Registrar entrega
router.post('/', DeliveryController.deliver);

// Listar entregas (com filtro opcional por data)
router.get('/', DeliveryController.list);

module.exports = router;
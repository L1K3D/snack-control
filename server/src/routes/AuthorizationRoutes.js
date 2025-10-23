// src/routes/AuthorizationRoutes.js
const express = require('express');
const router = express.Router();
const AuthorizationController = require('../controller/AuthorizationController');

// CRUD de autorizações
router.post('/', AuthorizationController.create);
router.get('/', AuthorizationController.list);
router.put('/:id', AuthorizationController.update);
router.delete('/:id', AuthorizationController.remove);

module.exports = router;
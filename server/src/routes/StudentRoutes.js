// src/routes/StudentRoutes.js
const express = require('express');
const router = express.Router();
const StudentController = require('../controller/StudentController');
const upload = require('../middlewares/upload');

// CRUD de alunos
router.post('/', upload.single('photo'), StudentController.create);
router.get('/', StudentController.list);
router.put('/:id', upload.single('photo'), StudentController.update);
router.delete('/:id', StudentController.remove);

module.exports = router;
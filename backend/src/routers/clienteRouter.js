
const express = require('express');
const router = express.Router();
const ClienteController = require("../controllers/clienteController");

router.get('/users', ClienteController.exibircliente.bind(ClienteController));

module.exports = router;

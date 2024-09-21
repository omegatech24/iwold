const express = require("express");
const LoginController = require("../controllers/loginController");
const requiredLogin = require("../middlewares/authToken"); 
const router = express.Router();

router.post('/registro', LoginController.RegisterCliente.bind(LoginController));
router.post('/login', LoginController.loginCliente.bind(LoginController));
router.post('/logout', requiredLogin, LoginController.logoutCliente.bind(LoginController));
module.exports = router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {addToBlackList} = require("../middlewares/blacklistToken");

const LoginModel = require('../models/loginModel');
class LoginController {
    async RegisterCliente(req, res){
       
        try {
            const data = {
                nome: req.body.nome, 
                email: req.body.email, 
                senha: req.body.senha
            };
    
            if(!data.nome) return res.status(400).json({ message: "Nome não inserido!"});
            if(!data.email) return res.status(400).json({ message: "Email não inserido!"});
            if(!data.senha) return res.status(400).json({ message: "Senha não inserido!"});
    
            const verificarEmail = await LoginModel.GetByEmail(data.email);
    
            if(verificarEmail !== null) return res.status(401).json({ message: "Email já cadastrado!"});
    
            const novoCliente = await LoginModel.Create(data);
    
            return res.status(201).json(novoCliente)
        } catch (error) {
            return res.status(500).json({message: "Erro ao cadastrar!"});
        }
    }

        async loginCliente(req, res){
            try {
                const cliente = await LoginModel.Login(req.body.email);
                if(!cliente) return res.status(404).json({
                    message: "Usuário não encontrado."
                });

                const validarSenha = await bcrypt.compare(req.body.senha, cliente["senha_hash"]);
                if(validarSenha){
                    const token = jwt.sign(
                        {id_cliente: user["id_cliente"], nome: user["nome"]}, 
                        process.env.TOKEN_SECRET, 
                        {expiresIn: process.env.TOKEN_TIME}
                    );

                    return res.status(200).json({
                        message: "Login efetuado!", token: token
                    });
                }

                else {
                    return res.status(401).json({message:"Login não efetuado."});
                }
            } catch (error) {
                return res.status(500).json({message:"Erro ao logar."});
            }
        }


            async logoutCliente(req, res){
                try {
            const token = req.headers["authorization"];
            if(!token) return res.status(401).json({message:"O usuário não está logado."});   
            addToBlackList(token);
            return res.status(204).json({message: "Logout efetuado com sucesso!"});
            
                } catch (error) {
                    return res.status(500).json({message: "Erro ao deslogar"});
                }
            }
}

module.exports = new LoginController();
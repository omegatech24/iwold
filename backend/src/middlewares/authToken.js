require("dotenv").config();
const jwt = require("jsonwebtoken");
const {blackList} = require("../middlewares/blacklistToken");

const requiredLogin = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'Token não fornecido'
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (erro, decoded) => {
        if(erro){
            return res.status(500).json({
                auth: false,
                messge: 'Falha na autenticação'
            });
        }

        if(blackList.has(token)){
            return res.status(403).json({
                auth: false,
                message:"Token inválido!"
            });
        }

        req.id_cliente = decoded.id_cliente;
        req.nome = decoded.nome;
        next();
    });

};
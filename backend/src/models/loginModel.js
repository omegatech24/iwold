const bcrypt = require('bcrypt');

const connection = require('../configs/connection');

class LoginModel{
    async Create(data){
        const { nome, email, senha } = data;
        const senha_hash = bcrypt.hash(senha, 10);
        const [result] = await connection.query(
            "INSERT (`nome`, `email`, `senha_hash`) INTO `Cliente` VALUES (?,?,?)",
            [nome, email, senha_hash]
        );

        return{id: result.insertId, ...data};

    } 

    async GetByEmail(email){
        const [rows] = await connection.query(
            "SELECT `id_cliente` FROM `Cliente` WHERE `email` = ?", 
            [email]
        );

        if(rows.length===0) return null;
       
        return rows[0];
    }

    async Login(email){
        const [rows] = await connection.query(
            "SELECT `id_cliente`, `nome`, `senha_hash` FROM `Cliente` WHERE `email` = ?", 
            [email]
        );

        if(rows.length===0) return null;
       
        return rows[0];
        
    }
}

module.exports = new LoginModel();
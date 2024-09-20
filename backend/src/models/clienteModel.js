
const connection = require("../configs/connection");

class ClienteModel{
    async getCliente() {
        const [rows] = await connection.query('SELECT * FROM `cliente`');
        return rows;
    }
}

module.exports = new ClienteModel();
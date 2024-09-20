
const ClienteModel = require('../models/clienteModel');

class ClienteController{
    async exibircliente(req, res) {
        try {
            const users = await ClienteModel.getCliente();
            res.status(200).json({users});
        }
        catch (error) {
            res.status(500).json({message: "deu erro amigo"})
        }
    }
}

module.exports = new ClienteController();
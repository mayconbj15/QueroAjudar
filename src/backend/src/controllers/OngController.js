const generateUniqueId = require('../utils/GenerateUniqueId');
const connection = require('../database/connection');

module.exports = {
    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async index(req, res) {
        const ongs = await connection('ongs').select('*');
    
        return res.json(ongs);
    },
    
    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async create(req, res) {
        const { name, email, password, whatsapp, city, uf } = req.body;

        // Gerar 4 bytes aleatórios, converter para string e retornar em 
        // forma de hexadecimal
        const id = generateUniqueId();

        // Como o insert pode demorar um pouco, então colocamos um 'await'
        // para que a execução espere até que a operação seja finalizada.
        await connection('ongs').insert({
            id,
            name,            
            email,
            password,
            whatsapp,
            city,
            uf
        });

        res.json({ id, email });
    }
};

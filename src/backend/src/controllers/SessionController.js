const connection = require('../database/connection');

/**
 * Controller para login.
 */
module.exports = {
    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async create(req, res) {
        const { id } = req.body;
 
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if(!ong) {
            return res.status(400).json({ error: 'No ONG found with this id.'});
        }

        return res.json(ong);
    },
};

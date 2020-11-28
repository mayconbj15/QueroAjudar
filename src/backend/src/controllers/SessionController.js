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
        const { email, password } = req.body;
     
        const ong = await connection('ongs')
            .where('email', email)
            .where('password', password)
            .select('id','password', 'name')
            .first();
       
        if(!ong) {
            return res.status(400).json({ error: 'Invalid password.'});
        }

        return res.json(ong);
    },
};

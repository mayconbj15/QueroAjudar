const connection = require('../database/connection');

module.exports = {
    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async index(req, res) {
        const page = parseInt(req.query.page) || 1;     
        
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) // Limitar em 5 incidents por página
            .offset( (page - 1) * 5 ) // Pular de 5 em 5 começando de (1-1) * 5 = 0
            .select([            
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // Passar contador de regs para o cabeçalho
        res.header('X-Total-Count', count['count(*)']);
    
        return res.json(incidents);
    },

    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async create(req, res) {
        const { title, description, value } = req.body;

        // Headers guardam o contexto da requisição
        const ong_id = req.headers.authorization; // Pegar id da 'ong' que criou o 'incident'       
        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value,
            ong_id,
        });

        return res.json({ id });        
    },

    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if(incident.ong_id !== ong_id) {
            // conferir mais sobre status de requisição na documentação
            return res.status(401).json({ error: "Operation not permitted."});
        }

        // Deletar registro 
        await connection('incidents').where('id', id).delete();

        return res.status(204).send(); // Status vazio
    },
};

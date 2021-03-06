const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const helpers = require('../helpers');

describe('ONG', () => {

    // beforeEach significa -> "Antes de cada um dos testes execute esta função do parâmetro"
    beforeEach( async () => {
        // Sempre zerar o banco de dados dos testes 
        // para evitar conflitos com dados armazenados
        // anteriormente
        await connection.migrate.rollback(); // -> zera banco de dados do teste

        // Executar as nossa migrations
        await connection.migrate.latest(); // é o mesmo que -> npx knex migrate:latest
    }); 

    // afterAll significa -> "Depois de todos os testes execute esta função do parâmetro"
    afterAll( async () => {
        await connection.migrate.rollback();
        // await connection.destroy(); // Desfazer a conexão do nosso teste com o banco de dados
    });

    it('should list ONGs', async () => {
        const response = await request(app).get('/ongs');

        expect(response.body).toBeInstanceOf(Array);
    });

    it('should be able to create a new ONG', async () => { // 'Deveria ser possível criar uma nova ONG'
         const response = await helpers.createOng(app);

        // console.log(response.body);
        expect(response.body).toHaveProperty('id'); // "Espero que a resposta tenha um campo 'id' "
        expect(response.body.id).toHaveLength(8); // "Espero que esse 'id' tenha 8 caracteres"
        expect(response.body).toHaveProperty('email'); // "Espero que a resposta tenha um campo 'email' "
    });
});

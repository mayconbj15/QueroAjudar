const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')


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
        await connection.destroy(); // Desfazer a conexão do nosso teste com o banco de dados
    });

    it('should be able to create a new ONG', async () => { // 'Deveria ser possível criar uma nova ONG'
         const response = await request(app) // Realizar requisição utilizando o supertest
         .post('/ongs')
         // .set('Authorization', 'id Válido da ong aqui') -> Para setar o Header
         .send({
            name: "APAE",
            email: "emailtop@gmail.com",
            whatsapp: "31912341234",
            city: "Belo Horizonte",
            uf: "MG"
        });

        // console.log(response.body);
        expect(response.body).toHaveProperty('id'); // "Espero que a resposta tenha um campo 'id' "
        expect(response.body.id).toHaveLength(8); // "Espero que esse 'id' tenha 8 caracteres"
    });
    
});


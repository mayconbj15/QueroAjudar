const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('Session', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should login', async () => {
        const ongName = "BebidasParaTodos";
        const createOngResponse = await request(app)
            .post('/ongs')
            .send({
                name: ongName,
                email: "bebeaqui@gmail.com",
                whatsapp: "31913131876",
                city: "Belo Horizonte",
                uf: "MG"
            });

        const response = await request(app)
            .post('/sessions')
            .send({
                id: createOngResponse.body.id
            });

        expect(response.body).toMatchObject({ name: ongName });
    });

    it('should not login', async () => {
        const ongName = "BebidasParaTodos";
        const createOngResponse = await request(app)
            .post('/ongs')
            .send({
                name: ongName,
                email: "bebeaqui@gmail.com",
                whatsapp: "31913131876",
                city: "Belo Horizonte",
                uf: "MG"
            });

        const response = await request(app)
            .post('/sessions')
            .send({
                id: createOngResponse.body.id + '@'
            });

        expect(response.status).toBe(400);
    });
});

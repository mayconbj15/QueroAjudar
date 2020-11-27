const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('Profile', () => {
    let ong;

    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "BebidasParaTodos",
                email: "bebeaqui@gmail.com",
                whatsapp: "31913131876",
                city: "Belo Horizonte",
                uf: "MG"
            });
        ong = response.body;
    });

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should list Ong Incidents', async () => {
        const createIncidentResponse = await request(app)
            .post('/incidents')
            .set('Authorization', ong.id)
            .send({
                title: 'nostrobar',
                description: 'drinks',
                value: 15.66
            });

        const response = await request(app)
            .get('/profile')
            .set('Authorization', ong.id);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: createIncidentResponse.body.id
                })
            ])
        );
    });
});

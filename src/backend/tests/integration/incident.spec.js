const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('Incident', () => {
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

    it('should list Incidents', async () => {
        const response = await request(app).get('/incidents');

        expect(response.body).toBeInstanceOf(Array);
    });

    it('should be able to create a new Incident', async () => {
        const response = await request(app)
            .post('/incidents')
            .set('Authorization', ong.id)
            .send({
                title: 'nostrobar',
                description: 'drinks',
                value: 15.66
            });

        expect(response.body).toHaveProperty('id');
    });

    it('should be able to delete a Incident', async () => {
        const createIncidentResponse = await request(app)
            .post('/incidents')
            .set('Authorization', ong.id)
            .send({
                title: 'nostrobar',
                description: 'drinks',
                value: 15.66
            });

        const response = await request(app)
            .delete('/incidents/' + createIncidentResponse.body.id)
            .set('Authorization', ong.id)
            .send();

        expect(response.status).toBe(204);
    });

    it('should be unable to delete a Incident with wrong ong id', async () => {
        const createIncidentResponse = await request(app)
            .post('/incidents')
            .set('Authorization', ong.id)
            .send({
                title: 'nostrobar',
                description: 'drinks',
                value: 15.66
            });

        const response = await request(app)
            .delete('/incidents/' + createIncidentResponse.body.id)
            .set('Authorization', ong.id + '@')
            .send();

        expect(response.status).toBe(401);
    });
});

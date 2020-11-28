const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const helpers = require('../helpers');

describe('Incident', () => {
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
        const createOngResponse = await helpers.createOng(app);
        const createIncidentResponse = await helpers.createIncident(
            app,
            createOngResponse.body.id
        );
        
        expect(createIncidentResponse.body).toHaveProperty('id');
    });

    it('should be able to delete a Incident', async () => {
        const createOngResponse = await helpers.createOng(app);
        const createIncidentResponse = await helpers.createIncident(
            app,
            createOngResponse.body.id
        );

        const response = await request(app)
            .delete('/incidents/' + createIncidentResponse.body.id)
            .set('Authorization', createOngResponse.body.id)
            .send();

        expect(response.status).toBe(204);
    });

    it('should be unable to delete a Incident with wrong ong id', async () => {
        const createOngResponse = await helpers.createOng(app);
        const createIncidentResponse = await helpers.createIncident(
            app,
            createOngResponse.body.id
        );

        const response = await request(app)
            .delete('/incidents/' + createIncidentResponse.body.id)
            .set('Authorization', createOngResponse.body.id + '@')
            .send();

        expect(response.status).toBe(401);
    });
});

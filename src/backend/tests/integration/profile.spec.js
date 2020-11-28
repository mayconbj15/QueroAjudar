const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const helpers = require('../helpers');

describe('Profile', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should list Ong Incidents', async () => {
        const createOngResponse = await helpers.createOng(app);
        const createIncidentResponse = await helpers.createIncident(
            app,
            createOngResponse.body.id
        );

        const response = await request(app)
            .get('/profile')
            .set('Authorization', createOngResponse.body.id);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: createIncidentResponse.body.id
                })
            ])
        );
    });
});

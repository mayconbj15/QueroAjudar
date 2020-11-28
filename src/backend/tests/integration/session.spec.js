const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const helpers = require('../helpers');

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
        const createOngResponse = await helpers.createOng(app, { name: ongName });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: createOngResponse.body.email,
                password: '123456'
            });

        expect(response.body).toMatchObject({ name: ongName });
    });

    it('should not login', async () => {
        const ongName = "BebidasParaTodos";
        const createOngResponse = await helpers.createOng(app, { name: ongName });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: createOngResponse.body.email + '@',
                password: '123456'
            });

        expect(response.status).toBe(400);
    });
});

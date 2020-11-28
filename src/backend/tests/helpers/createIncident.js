const request = require('supertest');

/**
 * @param {import('express').Express} app
 * @param {string} ongId
 * @param {any} incident
 */
module.exports = (app, ongId, incident = {}) => request(app)
    .post('/incidents')
    .set('Authorization', ongId)
    .send({
        title: incident.title || 'nostrobar',
        description: incident.description || 'drinks',
        value: incident.value || 15.66
    });

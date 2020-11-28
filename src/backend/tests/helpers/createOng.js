const request = require('supertest');

/**
 * @param {import('express').Express} app 
 * @param {any} ong 
 */
module.exports = (app, ong = {}) => request(app)
    .post('/ongs')
    .send({
        name: ong.name || "BebidasParaTodos",
        email: ong.email || "bebeaqui@gmail.com",
        password: ong.password || "123456",
        whatsapp: ong.whatsapp || "31913131876",
        city: ong.city || "Belo Horizonte",
        uf: ong.uf || "MG"
    });

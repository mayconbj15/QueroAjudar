const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentControler');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Desacoplando o módulo de rotas do express em um nova variável
const routes = express.Router();

// ------------ Métodos SESSIONS ------------ \\
routes.post('/sessions', SessionController.create);



// ------------ Métodos ONGS ------------ \\

routes.get('/ongs', OngController.index);
// A validação deve ser feita antes da criação. Por isso o celebrate() vem antes de OngController.create
routes.post('/ongs', celebrate({
    // Validar body
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(), // name dever ser: string e obrigatório
        email: Joi.string().required().email() , // email deve ser: string, obrigatório e dever ser um email
        whatsapp: Joi.string().required().min(10).max(11), // whatsapp deve ser: numero, obrgatório, minimo de 10 chars e maximo de 11 chars
        city: Joi.string().required(), // city deve ser: string e obrigatório
        uf: Joi.string().required().length(2) // uf deve ser: string, obrigatório e ter tamanho 2 
    }) 
}) , OngController.create); 


// ------------ Métodos PROFILE ------------ \\

// Podem ter propriedades que vem dentro do Header que não conhecemos.
// Por isso que é colocado a validação dentro de object e logo após coloca-se
// o método unknown().
routes.get('/profile', celebrate({
    // Validar Header
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), // authorization deve ser: string e obrigatório
    }).unknown() 
}), ProfileController.index);



// ------------ Métodos INCIDENTS ------------ \\

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.post('/incidents', IncidentController.create); // CRIAR VALIDAÇÃO AQUI (BODY E HEADER)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

module.exports = routes;
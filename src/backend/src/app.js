const express = require('express'); // não usa-se ./ pois este não é um arquivo
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes'); // usa-se ./ pois este é um arquivo


const app = express();

// Isso vai dizer ao express que o body da requisição vai 
// ser entendida com um JSON.
app.use(cors());
app.use(express.json());
app.use(routes); // Utilizar rotas
app.use(errors()); // Vai tratar os erros de validação de maneira mais agradável

// app.listen(3333);

module.exports = app;

/**
 * Trocamos o nome de index para app pois ...
 */
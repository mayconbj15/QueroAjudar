const knex = require('knex');
const configuration = require("../../knexfile");

// process.env.NODE_ENV -> variável de ambiente global 

// Se nossa variável de ambiente for 'test' então utilizamos
// (das configurações descritas no knexfile) a configuração 'test' 
// (configuration.test), senão, utilizaremos a configuração 'development'
// (configuration.development)
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// Criar conexão com banco de dados
const connection = knex(config);

module.exports = connection;

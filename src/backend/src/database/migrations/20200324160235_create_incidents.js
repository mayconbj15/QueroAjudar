
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments(); // Chave primária auto-incrmental
        table.string('title').notNullable(); // Campo não poderá ser nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); // Criando chave de ralacionamento

        // Utilizando 'ong_id' criado acima como uma chave estrangeira para 
        // a tabela 'ongs'
        table.foreign('ong_id').references('id').inTable('ongs'); 
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');  
};

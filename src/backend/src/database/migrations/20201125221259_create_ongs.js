
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary(); // Id será chave primária
        table.string('name').notNullable(); // Campo não poderá ser nulo
        table.string('password').notNullable(); // Campo não poderá ser nulo
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // O campo terá apenas dois caracteres
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};

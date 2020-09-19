
/**
 * O 'UP' será responsável por criar as tabelas.
 */
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary(); // Id será chave primária
    table.string('name').notNullable(); // Campo não poderá ser nulo
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); // O campo terá apenas dois caracteres
  });
};

/**
 * O 'DOWN' será responsável por desfazer o que foi feito se houver algum 
 * problema.
 */
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};

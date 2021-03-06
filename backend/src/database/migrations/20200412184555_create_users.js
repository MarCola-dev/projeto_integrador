
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.string('id').primary();
        
        table.string('nameU').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('whatsapp').notNullable();
        table.string('type').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};

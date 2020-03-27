
exports.up = function(knex) {
  return knex.schema.createTable('cases',function(table){
    table.increments();
    table.string('title').notNullable();
    table.string('desc').notNullable();
    table.decimal('value').notNullable();
    
    table.string('ongId').notNullable();
    table.foreign('ongId').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cases');
};

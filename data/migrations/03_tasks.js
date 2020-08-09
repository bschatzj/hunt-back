exports.up = knex =>
  knex.schema.createTable("tasks", tbl => {
    tbl.increments('task_id');
    tbl.integer('game_id')
    .references('game_id')
    .inTable('game');
    tbl.text('title')
    .notNullable()
    tbl.text('description')
    .notNullable()
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
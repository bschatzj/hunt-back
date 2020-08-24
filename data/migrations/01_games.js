exports.up = knex =>
  knex.schema.createTable("game", tbl => {
    tbl.increments('game_id');
    tbl.text('game_title').notNullable().unique();
    tbl.text('password');
    tbl.boolean('private').defaultTo(false);
    tbl.integer('end_date')
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
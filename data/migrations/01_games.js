exports.up = knex =>
  knex.schema.createTable("game", tbl => {
    tbl.increments('game_id');
    tbl.text('game_title').notNullable().unique();
    tbl.text('password');
    tbl.boolean('private').defaultTo(false);
    tbl.bigInteger('end_date')
  });

exports.down = knex => knex.schema.dropTableIfExists("game");
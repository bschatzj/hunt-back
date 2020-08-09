exports.up = knex =>
  knex.schema.createTable("game", tbl => {
    tbl.increments('game_id');
    tbl.text('game_title');
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
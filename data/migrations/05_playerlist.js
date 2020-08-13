exports.up = knex =>
  knex.schema.createTable("list", tbl => {
    tbl.text('display_name')
    .notNullable()
    tbl.integer('user')
    .references('user_id')
    .inTable('users')
    tbl.string('game')
    .references('game_title')
    .inTable('game')
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
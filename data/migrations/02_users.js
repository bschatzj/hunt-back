exports.up = knex =>
  knex.schema.createTable("users", tbl => {
    tbl.increments('user_id');
    tbl
    .text('email')
    .notNullable()
    .unique()
    tbl.text('password')
    .notNullable()
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
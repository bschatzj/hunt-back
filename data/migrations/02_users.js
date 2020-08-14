const { table } = require("../db");

exports.up = knex =>
  knex.schema.createTable("users", tbl => {
    tbl.increments('user_id');
    tbl
    .text('email')
    .notNullable()
    .unique()
    tbl.text('password')
    .notNullable()
    tbl.text('display_name')
    tbl.text('icon')
    .defaultTo('https://img.icons8.com/cute-clipart/64/000000/bug.png')
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
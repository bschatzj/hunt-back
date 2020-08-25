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
    .defaultTo('http://www.clipartbest.com/cliparts/dir/eqz/direqzE9T.png')
  });

exports.down = knex => knex.schema.dropTableIfExists("users");
exports.up = knex =>
  knex.schema.createTable("votes", tbl => {
    tbl.integer('user')
    .references('user_id')
    .inTable('users')
    tbl.integer('task')
    .references('task_id')
    .inTable('tasks')
  });

exports.down = knex => knex.schema.dropTableIfExists("votes");
exports.up = knex =>
  knex.schema.createTable("submissions", tbl => {
    tbl.increments('sub');
    tbl.text('title')
    .notNullable()
    tbl.text('description')
    tbl.integer('task')
    .references('task_id')
    .inTable('tasks')
    tbl.integer('user')
    .references('user_id')
    .inTable('users')
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
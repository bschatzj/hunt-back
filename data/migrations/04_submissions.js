exports.up = knex =>
  knex.schema.createTable("submissions", tbl => {
    tbl.increments('sub');
    tbl.text('title')
    .notNullable()
    tbl.text('description')
    tbl.text('photo')
    tbl.integer('task')
    .references('task_id')
    .inTable('tasks')
    tbl.integer('user')
    .references('user_id')
    .inTable('users')
    tbl.integer('votes')
    .defaultTo(0)
    tbl.text('game')
    .references('game_title')
    .inTable('game')
  });

exports.down = knex => knex.schema.dropTableIfExists("todo");
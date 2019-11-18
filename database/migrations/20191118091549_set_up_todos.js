
exports.up = function (knex) {
    return knex.schema
        .createTable('todo_items', TodoItems => {
            TodoItems.increments();
            TodoItems
                .integer('todos_id')
                .unsigned()
                .references('id')
                .inTable('todos')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            TodoItems.string('description', 1048).notNullable();
        })
        .table('todos', Todos => {
            Todos.string('name').notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
};

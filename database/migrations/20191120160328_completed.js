
exports.up = function (knex) {
    return knex.schema.table("todos", Todos => {
        Todos.integer('is_completed').unsigned().default(0);
    });
};

exports.down = function (knex) {
    return knex.schema.table("todos", Todos => {
        Todos.dropColumn('isCompleted');
    });
};

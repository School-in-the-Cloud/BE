
exports.up = function (knex) {
    return knex.schema
        .createTable('users', Users => {
            Users.increments();
            Users.string('password').notNullable();
            Users.string('type', 128).notNullable();
            Users.string('first_name').notNullable();
            Users.string('last_name').notNullable();
            Users.string('email').notNullable();
        })
        .createTable('volunteers', Volunteers => {
            Volunteers.increments();
            Volunteers.string('availability', 1024).notNullable();
            Volunteers.string('country').notNullable();
            Volunteers
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('admins', Admins => {
            Admins.increments();
            Admins
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('students', Students => {
            Students.increments();
            Students
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('todos', Todos => {
            Todos.increments();
            Todos
                .integer('admin_id')
                .unsigned()
                .references('id')
                .inTable('admins')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            Todos
                .integer('volunteer_id')
                .unsigned()
                .references('id')
                .inTable('volunteers')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('todos')
        .dropTableIfExists('students')
        .dropTableIfExists('admins')
        .dropTableIfExists('volunteers')
        .dropTableIfExists('users')
};

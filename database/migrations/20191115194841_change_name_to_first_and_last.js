
exports.up = function (knex) {
    return knex.schema.table('users', Users => {
        Users.dropColumn('name');
        Users.string('first_name').notNullable();
        Users.string('last_name').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.table('users', Users => {
        Users.dropColumn('last_name');
        Users.dropColumn('first_name');
        Users.string('name').notNullable();
    })
};

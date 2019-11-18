
exports.up = function (knex) {
    return knex.schema.table('users', Users => {
        Users.dropColumn('email');
        Users.string('email').notNullable().unique();
    })
};

exports.down = function (knex) {
    return knex.schema.table('users', Users => {
        Users.dropColumn('email');
        Users.string('email').notNullable();
    })
};

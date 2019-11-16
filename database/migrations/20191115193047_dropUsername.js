
exports.up = function (knex) {
    return knex.schema.table('users', Users => {
        Users.dropColumn('username');
    })
};

exports.down = function (knex) {
    return knex.schema.table('users', Users => {
        Users.string('username').notNullable();
    })
};

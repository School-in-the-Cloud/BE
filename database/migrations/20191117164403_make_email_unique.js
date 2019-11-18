
exports.up = function (knex) {
    return knex.schema.table('users', Users => {
        Users.string('email').notNullable().unique().alter();
    })
};

exports.down = function (knex) {
    return knex.schema.table('users', Users => {
        Users.string('email').notNullable().alter();
    })
};

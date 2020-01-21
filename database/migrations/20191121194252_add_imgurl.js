
exports.up = function (knex) {
    return knex.schema.table('volunteers', Volunteers => {
        Volunteers.string('imgurl', 1048);
    })
};

exports.down = function (knex) {
    return knex.schema.table('volunteers', Volunteers => {
        
    })
};

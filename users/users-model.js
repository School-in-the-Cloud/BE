const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    findAdmins,
    findAdminBy,
    findVolunteers,
    findVolunteerBy
}

function find() {
    return db('users');
}

function findBy(filter) {
    return db('users').where(filter);
}

function findAdmins() {
    return db('admins');
}
function findAdminBy(filter) {
    return db('admins').where(filter);
}

async function findVolunteers() {
    return db('volunteers').join('users', 'volunteers.user_id', '=', 'users.id');

}
function findVolunteerBy(filter) {
    return db('volunteers').where(filter);
}
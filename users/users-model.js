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
    return db('volunteers')
        .join('users', 'volunteers.user_id', '=', 'users.id')
        .select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'volunteers.country', 'volunteers.availability');

}
function findVolunteerBy(filter) {
    return db('volunteers')
        .join('users', 'volunteers.user_id', '=', 'users.id')
        .where(filter)
        .select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'volunteers.country', 'volunteers.availability');
}
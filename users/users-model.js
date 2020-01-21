const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    findAdmins,
    findAdminBy,
    findVolunteers,
    findVolunteerBy,
    updateVolunteer
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
    return db('admins')
        .join('users', 'admins.user_id', '=', 'users.id')
        .select('users.id', 'users.first_name', 'users.last_name', 'users.email')
        .where(filter);
}

async function findVolunteers() {
    return db('volunteers')
        .join('users', 'volunteers.user_id', '=', 'users.id')
        .select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'volunteers.country', 'volunteers.availability');

}
function findVolunteerBy(filter) {
    return db('volunteers')
        .join('users', 'volunteers.user_id', '=', 'users.id')
        .select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'volunteers.country', 'volunteers.availability')
        .where(filter);
}

async function updateVolunteer(changes, id) {
    let userChanges = {};
    if (changes.first_name) {
        userChanges.first_name = changes.first_name;
    }
    if (changes.last_name) {
        userChanges.last_name = changes.last_name;
    }
    if (changes.email) {
        userChanges.email = changes.email;
    }
    if (changes.first_name || changes.last_name || changes.email) {
        try {
            const changedUser = await db('users').update(userChanges).where({ id });
        } catch (error) {
            console.log(`\nERROR in updateVolunteer:\n${error}\n`);
            return null;
        }
    }

    let volunteerChanges = {};
    if (changes.availability) {
        volunteerChanges.availability = changes.availability;
    }
    if (changes.country) {
        volunteerChanges.country = changes.country;
    }
    if (changes.availability || changes.country) {
        try {
            const changedVolunteer = await db('volunteers').update(volunteerChanges).where({ user_id: id });
        } catch (error) {
            console.log(`\nERROR in updateVolunteer:\n${error}\n`);
            return null;
        }
    }
    if (!userChanges && !volunteerChanges) {
        return null;
    }
    return 1;
}
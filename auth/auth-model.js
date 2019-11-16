const db = require('../database/dbConfig');

module.exports = {
    addUser,
    addAdmin,
    addVolunteer,
    addStudent,
    find,
    findBy,
    findById
};

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

function findById(id) {
    return db('users').where({ id }).first();
}

async function addUser(user) {
    const [id] = await db('users').insert(user);
    // switch(type) {
    //     case 'admin':
    //         const roleId = await db('admin')
    //         break;
    //     case 'volunteer':
    //         break;
    //     case 'student':
    //         break;
    //     default:
    //         return null;
    // }

    // *** TODO: Create middleware to validate correct user type ***
    const added = findById(id);
    //const roleId = await db(`type`).insert(user, "id");
    return added;
}

async function addAdmin(user) {
    const [id] = await db('admins').insert(user);
    const added = db('admins').select('*').where(id);
    return added;
}

async function addVolunteer(user) {
    const [id] = await db('volunteers').insert(user);
    const added = db('volunteers').select('*').where(id);
    return added;
}

async function addStudent(user) {
    const [id] = await db('students').insert(user);
    const added = db('students').select('*').where(id);
    return added;
}
const db = require('../database/dbConfig');
const Users = require('../users/users-model');

module.exports = {
    add,
    addItem,
    find,
    findBy,
    findItem,
    update,
    remove
}

async function add(admin_id, volunteer_id, name, items) {
    const todo = {
        admin_id,
        volunteer_id,
        name
    };
    const [todos_id] = await db('todos').insert(todo, "id");
    
    let items_ids = [];
    let item;
    let id;
    
    for (let i = 0; i < items.length; i++) {
    
        item = { description: items[i], todos_id };
    
        id = await addItem(item);
        items_ids.push(id);
    }
    
    return { todos_id, items_ids };
}

async function addItem(item) {
    const [id] = await db('todo_items').insert(item, "id");
    return id;
}

async function findItem(id) {
    return db('todo_items').where({ id });
}

async function find() {
    try {
        const todos = await db('todos');
        const todo_items = await db('todo_items');
        const volunteers = await Users.findVolunteers();
        const admins = await Users.findAdmins();

        const packagedTodos = todos.map(todo => {
            const volunteer = volunteers.find(vol => vol.id === todo.volunteer_id);
            const admin = admins.find(adm => adm.id === todo.admin_id);

            return {
                todos_id: todo.id,
                admin_id: todo.admin_id,
                admin,
                volunteer_id: todo.volunteer_id,
                volunteer,
                name: todo.name,
                is_completed: Boolean(todo.is_completed),
                steps: todo_items
                    .filter(item => item.todos_id === todo.id)
            };
        });
        return packagedTodos;
    } catch (error) {
        console.log(`\nError getting todos\n${error}\n`)
    }

}

async function findBy(filter) {
    const prop = Object.keys(filter)[0];
    const val = Number(filter[prop]);
    try {
        const todos = await find();
        const filtered = todos.filter(todo => todo[prop] === val);
        return filtered;
    } catch (error) {
        return error;
    }
}

async function update(changes, id) {

    let count;
    let temp;

    try {
        if (Object.keys(changes).includes("is_completed")) {
            const completed = changes.is_completed ? 1 : 0;
            const comp = await db('todo_items').select('*').where({ todos_id: id });
            count += await db('todos').where({ id }).update({ is_completed: completed });
        }
        if (changes.name) {
            count += await db('todos').where({ id }).update({ name: changes.name });

        }
        if (changes.steps) {
            for (let i = 0; i < changes.steps.length; i++) {
                try {
                    const item = await findItem({ id: changes.steps[i].id });
                    if (item) {
                        temp = await modifyStep(changes.steps[i]);
                        count += temp;
                    } else {
                        temp = await addItem(changes.steps[i]);
                    }

                } catch (error) {
                    console.log("Error adding step: ", error);
                }
            }
        }
        return count;
    } catch (error) {
        console.log(`\nERROR in update todo\n${error}\n`);
        return error;
    }
}

async function modifyStep(changes) {
    try {
        const newStep = await db("todo_items").where({ id: changes.id }).update(changes);
        return newStep;
    } catch (error) {
        console.log(`\nError modifying step:\n${error}\n`);
        return error;
    }
}

async function remove(id) {
    const todo = await db('todos').where({ id }).del();
    const todoItems = await db('todo_items').where({ todos_id: id }).del();
    return todo + todoItems;
}
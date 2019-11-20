const db = require('../database/dbConfig');
const Users = require('../users/users-model');

module.exports = {
    add,
    addItem,
    find,
    findBy,
    findItem,
    update
}

async function add(admin_id, volunteer_id, name, items) {
    const todo = {
        admin_id,
        volunteer_id,
        name
    };
    const [todos_id] = await db('todos').insert(todo, "id");
    console.log(`\nTodo Id:\n${todos_id}\n`);
    let items_ids = [];
    let item;
    let id;
    console.log("\nItems:\n", items);
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
        item = { description: items[i], todos_id };
        console.log(item);
        id = await addItem(item);
        items_ids.push(id);
    }
    console.log(`\ Items Ids:\n${items_ids}\n`);
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
    // return db('todos').join('todo_items', 'todos.id', '=', 'todo_items.todos_id');
    const todos = await db('todos');
    // console.log(todos);
    const todo_items = await db('todo_items');
    // console.log(todo_items); 
    // const admins = await db('users').where({ type: 'admin' });
    // const volunteers = await db('users')
    //     .join('volunteers', 'users.id', '=', 'volunteers.user_id')
    //     .where({ type: 'volunteer' });
    const volunteers = await Users.findVolunteers();
    const admins = await Users.findAdmins();
    try {
        const packagedTodos = todos.map(todo => {
            // console.log(todo.id);
            try {
                // const admin = await db('users').where({ id: todo.admin_id })
                //     .join('admins', 'users.id', '=', 'admins.user_id');


                // const volunteer = await db('users')
                //     .join('volunteers', 'users.id', '=', 'volunteers.user_id')
                //     .where({ type: 'volunteer', id: todo.volunteer_id });

                // const volunteer = await Users.findVolunteerBy({ user_id: todo.volunteer_id });
                // const admin = await Users.findAdminBy({ user_id: todo.admin_id });
                const volunteer = volunteers.filter(vol => vol.id === todo.volunteer_id);
                const admin = admins.filter(adm => adm.id === todo.admin_id);

                const todoObj = {
                    todos_id: todo.id,
                    admin_id: todo.admin_id,
                    admin,
                    volunteer_id: todo.volunteer_id,
                    volunteer,
                    name: todo.name,
                    steps: todo_items
                        .filter(item => item.todos_id === todo.id)
                };
                console.log("Should come first");
                // console.log(todoObj);
                return todoObj;
            } catch (error) {
                console.log(`\nERROR in find() todos\n${error}\n`);
                return error;
            }
        });
        // console.log("Should come second");
        // // console.log(packagedTodos);
        return packagedTodos;
    } catch (error) {
        console.log(`\nError getting todos\n${error}\n`)
    }

}

async function findBy(filter) {
    const prop = Object.keys(filter)[0];
    console.log("Prop: ", prop);
    const val = Number(filter[prop]);
    console.log("Val: ", val);
    try {
        const todos = await find();
        // console.log(todos);
        const filtered = todos.filter(todo => {
            // console.log("Desired: ", val);
            // console.log("Actual: ", todo[prop]);
            // console.log("Difference: ", todo[prop] - val);
            // console.log("Equality: ", todo[prop] === val);
            return todo[prop] === val;
        });
        // console.log(filtered);
        return filtered;
    } catch (error) {
        return error;
    }
}

async function update(changes, id) {
    let todo = {};
    let count;
    let temp;

    try {
        if (changes.name) {
            console.log("ID: ", id);
            count += await db('todos').where({ id }).update({ name: changes.name });

        }
        if (changes.steps) {
            console.log("steps: ", changes.steps);
            // let count = await db('todo_items').where({ todos_id: id }).update({ description: changes.steps });
            // if (!count) { return count }
            for (let i = 0; i < changes.steps.length; i++) {
                try {
                    const item = await findItem({ id: changes.steps[i].id });
                    if (item) {
                        // console.log();
                        //temp = await db('todo_items').where({ id: changes.steps[i].id }).update({ description: changes.steps[i].description });
                        temp = await modifyStep(changes.steps[i]);
                        console.log(temp);
                        count += temp;
                    } else {
                        temp = await addItem(changes.steps[i]);
                    }

                } catch (error) {
                    console.log("Error adding step: ", error);
                }

            }

            // count = await changes.steps.map(async step => {
            //     const curCount = await db('todo_items').where({ todos_id: id }).update({ description: step });
            //     return curCount;
            // }).reduce((acc, cur) => acc + cur, 0);
        }
        return count;
    } catch (error) {
        console.log(`\nERROR in update todo\n${error}\n`);
        return error;
    }
}

async function modifyStep(changes) {
    console.log("modifySteps id: ", changes.id);
    try {
        const newStep = await db("todo_items").where({ id: changes.id }).update(changes);
        return newStep;
    } catch (error) {
        console.log(`\nError modifying step:\n${error}\n`);
        return error;
    }
}
const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy
}

async function add(admin_id, volunteer_id, name, items) {
    const todo = {
        admin_id,
        volunteer_id,
        name
    };
    const [todo_id] = await db('todos').insert(todo, "id");
    console.log(`\nTodo Id:\n${todo_id}\n`);
    let items_ids = [];
    let item;
    let id;
    console.log("\nItems:\n", items);
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
        item = { description: items[i], todos_id: todo_id };
        console.log(item);
        id = await addItem(item);
        items_ids.push(id);
    }
    console.log(`\ Items Ids:\n${items_ids}\n`);
    return { todo_id, items_ids };
}

async function addItem(item) {
    const [id] = await db('todo_items').insert(item, "id");
    return id;
}

async function find() {
    // return db('todos').join('todo_items', 'todos.id', '=', 'todo_items.todos_id');
    const todos = await db('todos');
    // console.log(todos);
    const todo_items = await db('todo_items');
    // console.log(todo_items);
    return todos.map(todo => {
        // console.log(todo.id);
        return {
            todo_id: todo.id,
            admin_id: todo.admin_id,
            volunteer_id: todo.volunteer_id,
            name: todo.name,
            steps: todo_items
                .filter(item => item.todos_id === todo.id)
                .map(item => item.description)
        }
    })
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
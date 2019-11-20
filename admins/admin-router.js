const router = require('express').Router();

const Todos = require('../todos/todos-model');

router.post('/:id/todos', async (req, res) => {
    const admin_id = req.params.id;
    const { volunteer_id, name, items } = req.body;
    console.log(`\nItems:\n${items}\n`);
    try {
        const { todos_id, items_id } = await Todos.add(admin_id, volunteer_id, name, items);
        res.status(201).json({ todos_id, items_id });
    } catch (error) {
        console.log(`\nERROR in POST to /admins/:id/todos\n${error}\n`);
        res.status(500).json({ message: "Internal server error." })
    }
});

router.put('/:id/todos', async (req, res) => {
    const changes = req.body;
    if (!changes) {
        res.status(400).json({ message: "No changes included in PUT request." });
    }

    const adminId = req.params.id;

    const id = changes.todos_id;
    console.log(changes.steps);

    try {
        const todo = await Todos.findBy({ todos_id: id });
        if (!todo) {
            res.status(404).json({ message: "To-do not available at the given id." });
        }
        // if (todo.admin_id !== adminId) {
        // res.status(401).json({ message: "You do not have permission to edit this resource." })
        // }
    } catch (error) {
        console.log(`\nERROR in PUT to /admin/:id/todos\n${error}\n`);
        res.status(500).json({ message: "Internal server error" });
    }

    try {
        const changed = await Todos.update(changes, id);
        res.status(201).json(changed);
    } catch (error) {
        console.log(`\nERROR in PUT to /admin/:id/todos\n${error}\n`);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/:id/todos', async (req, res) => {
    const admin_id = req.params.id;
    try {
        const todos = Todos.findBy({ admin_id });
        res.status(200).json(todos);
    } catch (error) {
        console.log(`\nERROR in GET to /admin/:id/todos\n${error}\n`);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;
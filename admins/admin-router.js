const router = require('express').Router();

const todos = require('../todos/todos-model');

router.post('/:id/todos', async (req, res) => {
    const admin_id = req.params.id;
    const { volunteer_id, name, items } = req.body;
    console.log(`\nItems:\n${items}\n`);
    try {
        const { todo_id, items_id } = await todos.add(admin_id, volunteer_id, name, items);
        res.status(201).json({ todo_id, items_id });
    } catch (error) {
        console.log(`\nERROR in POST to /admins/:id/todos\n${error}\n`);
        res.status(500).json({ message: "Internal server error." })
    }
})



module.exports = router;
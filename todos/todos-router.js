const router = require('express').Router();

const Todos = require('./todos-model');

router.get('/', async (req, res) => {
    try {
        const todos = await Todos.find();
        res.status(200).json(todos);
    } catch (error) {
        console.log(`\nERROR in GET to /todos/\n${error}\n`);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todos.findBy({ todos_id: id });
        if (!todo.length) { res.status(404).json({ message: "Todo not found." }) };
        res.status(200).json(todo[0]);
    } catch (error) {
        console.log(`\nERROR in GET to /todos/:id/\n${error}\n`);
        res.status(500).json({ message: "Internal server error getting todo." });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removed = await Todos.remove(id);
        res.status(200).json(removed);
    } catch (error) {
        console.log(`\nERROR in DELETE to /todos/:id/\n${error}\n`);
        res.status(500).json({ message: "Internal server error while removing todo." })
    }
})

router.get('/:id')

module.exports = router;
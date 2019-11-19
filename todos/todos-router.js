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

router.get('/:id')

module.exports = router;
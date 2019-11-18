const router = require('express').Router();

const todos = require('./todos-model');

router.get('/', async (req, res) => {
    try {
        const items = await todos.find();
        res.status(200).json(items);
    } catch (error) {
        console.log(`\nERROR in GET to /todos/\n${error}\n`);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
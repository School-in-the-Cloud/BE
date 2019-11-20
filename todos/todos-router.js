const router = require('express').Router();

const Todos = require('./todos-model');

router.get('/', async (req, res) => {
    try {
        const todos = await Todos.find();
        console.log(todos);
        res.status(200).json(todos);
    } catch (error) {
        console.log(`\nERROR in GET to /todos/\n${error}\n`);
        res.status(500).json({ message: "Internal server error" });
    }

    // Todos.find().then(todos =>
    //     todos.then(td => res.status(200).json(td)).catch(err => console.log(err))).catch(err => res.status(500).json({ message: "Internal server error", error }));
});

router.get('/:id')

module.exports = router;
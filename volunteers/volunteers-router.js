const router = require('express').Router();

const Todos = require('../todos/todos-model');

router.get('/:id/todos', async (req, res) => {
    const { id } = req.params;
    // console.log(req.params);
    // console.log(`\nVolunteer ID:\n${id}\n`);

    try {
        const todos = await Todos.findBy({ volunteer_id: id });
        console.log(todos);
        res.status(200).json(todos);
    } catch (error) {
        console.log(`\nERROR in GET to /volunteers/:id/todos\n${error}\n`);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;
const router = require('express').Router();

const Todos = require('../todos/todos-model');
const Users = require('../users/users-model');

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
});

router.get('/:id/', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findBy({ id });
        res.status(200).json(user);
    } catch (error) {
        console.log(`\nERROR in GET to /volunteers/:id\n${error}\n`);
        res.status(500).json({ message: "Internal server error." });
    }
})

router.get('/', async (req, res) => {
    try {
        const volunteers = await Users.findVolunteers();
        res.status(200).json(volunteers);
    } catch (error) {
        console.log(`\nERROR in GET to /volunteers/\n${error}\n`);
    }
})

module.exports = router;
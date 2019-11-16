const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./auth-model');
const { validateUser, getJwtToken } = require('./auth-helpers');

router.post('/register', async (req, res) => {
  let user = req.body;
  const validateResults = validateUser(user);

  const role = user.type;

  if (validateResults.isSuccessful) {
    const hash = bcrypt.hashSync(user.password, 14);
    const hashedUser = {
      name: user.name,
      password: hash
    };

    try {
      const saved = await Users.addUser(hashedUser);

      switch (role) {
        case 'admin':
          const info = {
            user_id: saved.id
          };
          const roleInfo = await Users.addAdmin(roleInfo);
          break;
        case 'volunteer':
          const info = {
            user_id: saved.id,
            availability: user.availability,
            country: user.country
          };
          const roleInfo = await Users.addVolunteer(roleInfo);
          break;
        case 'student':
          const info = {
            user_id: saved.id
          };
          const roleInfo = await Users.addStudent(roleInfo);
          break;
        default:
          console.log("\nERROR in POST to /api/auth/register");
          console.log(`Role passed to switch statement: ${role}`);
          res.status(500).json({ message: "Internal server error" });
      }

      const token = getJwtToken(saved.username);
      res.status(201).json({
        user: saved,
        roleInfo,
        token
      });
    } catch (error) {
      console.log(`\nError in POST to /api/auth/register\n${error}\n`);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.status(401).json({
      message: "Invalid user information.",
      errors: validateResults.errors
    });
  }
});

router.post('/login', async (req, res) => {
  // implement login
  let { username, password } = req.body;
  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwtToken(username);
      res.status(200).json({
        message: `Welcome to the site, ${username}`,
        user,
        token
      });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.log(`\nError in POST to /api/auth/login\n${error}\n`);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;

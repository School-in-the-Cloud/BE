const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

module.exports = {
    validateUser,
    getJwtToken
};

function validateUser(user) {
    let errors = [];

    // check for
    // valid password
    if (!user.password || user.password.length < 8) {
        errors = [...errors, "Please include a password with at least 8 characters"];
    }
    // first name
    if (!user.first_name) {
        errors = [...errors, "Please include user's first name."];
    }
    // last name
    if (!user.last_name) {
        errors = [...errors, "Please include user's last name."];
    }
    // valid email
    if (!user.email || !user.email.includes("@") || !user.email.includes(".")) {
        errors = [...errors, "Please include a valid email."];
    }
    // valid type
    if (user.type !== 'admin' && user.type !== 'volunteer' && user.type !== 'student') {
        errors = [...errors, "Please include a valid user type. The options are 'admin' 'volunteer' or 'student' "];
    }

    if (user.type === 'volunteer' && !(user.availability && user.country)) {
        errors = [...errors, "Volunteers must state country and availability."]
    }

    if (Users.find({ email: user.email })) {
        errors = [...errors, "An account with the provided email already exists."]
    }

    return {
        isSuccessful: errors.length === 0,
        errors
    };
}

function getJwtToken(email, type) {
    const payload = {
        email,
        type
    };

    const secret = process.env.JWT_SECRET || "make sure it's a secret please";

    const options = {
        expiresIn: '7d'
    };

    return jwt.sign(payload, secret, options);
}

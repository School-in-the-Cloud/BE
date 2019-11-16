const jwt = require('jsonwebtoken');

module.exports = {
    validateUser,
    getJwtToken
};

function validateUser(user) {
    let errors = [];

    // check for
    // valid username
    if (!user.username || user.username.length < 6) {
        errors = [...errors, "Please include a username with at least 6 characters."];
    }
    // valid password
    if (!user.password || user.password.length < 8) {
        errors = [...errors, "Please include a password with at least 8 characters"];
    }
    // name
    if (!user.name) {
        errors = [...errors, "Please include a name."];
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

    return {
        isSuccessful: errors.length === 0,
        errors
    };
}

function getJwtToken(username, userType) {
    const payload = {
        username,
        userType
    };

    const secret = process.env.JWT_SECRET || "make sure it's a secret please";

    const options = {
        expiresIn: '7d'
    };

    return jwt.sign(payload, secret, options);
}

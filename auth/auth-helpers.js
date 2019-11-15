const jwt = require('jsonwebtoken');

module.exports = {
    validateUser,
    getJwtToken
};

function validateUser(user) {
    let errors = [];

    if (!user.username || user.username.length < 6) {
        errors = [...errors, "Please include a username with at least 6 characters."];
    }

    if (!user.password || user.password.length < 8) {
        errors = [...errors, "Please include a password with at least 8 characters"];
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
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret, options);
}

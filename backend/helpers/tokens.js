const jwt = require('jsonwebtoken');
require('dotenv').config();

// Return signed JWT from user data 
function createToken (user) {
    console.assert(user.isAdmin !== undefined,
        "createToken paased user without isAdmin property"
    );

    let payload = {
        username: user.username,
        isAdmin: user.isAdmin || false
    };

    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = {createToken};
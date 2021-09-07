const jwt = require('jsonwebtoken');
const {UnauthorizedError} = require('../expressError');

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            // return payload of username and isAdmin if token is valid
            res.locals.user = jwt.verify(token, process.env.SECRET_KEY);
        }
        return next();
    } catch (error) {
        return next();
    }
}

/** Middlewae to be used when users must be logged in
 * if not, return unauthorized
*/

function ensureLoggedIn(req, res, next) {
    try {
        // if no user info is provied, then throw errors
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (error) {
        return next(error);
    }
}

/** Middlewae to be used when the user logged in as an admin
 * if not, return unauthorized
*/

function ensureAdmin(req, res, next) {
    try {
        if(!res.locals.user || !res.locals.user.isAdmin) throw new UnauthorizedError();
        return next();
    } catch (error) {
        return next(error);
    }
}

/** Middleware to use when token is valid and user's username matches the one provide as route param
 * if not, return Unauthorized
 */

function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        console.log('ensure correct user or admin');
        console.log(`res.locals.user ${JSON.stringify(res.locals)}`);
        console.log(`res.locals.user ${res.locals.user}`);

        const user = res.locals.user;
        if (!(user && (user.username === req.params.username || user.isAdmin))) {
            throw new UnauthorizedError();
        }
        console.log(`ensureCorrectUserOrAdmin, ${user}`);
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin
}


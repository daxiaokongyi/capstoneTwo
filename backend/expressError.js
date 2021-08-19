/**
 * ExpressError extends normal JS Error so that status can be added in
 * The error-handling middleware will return this
 */

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

/** Bad Request with status 400 */
class BadRequestError extends ExpressError {
    constructor() {
        super("Bad Request", 400);
    }
}

/** Unauthorized Error with status 401 */
class UnauthorizedError extends ExpressError {
    constructor() {
        super("Unauthorized", 401);
    }
}

/** Forbidden Error with status 403 */
class ForbiddenError extends ExpressError {
    constructor() {
        super("Forbidden Error", 403);
    }
}

/** Not Found Error with status 404 */
class NotFoundError extends ExpressError {
    constructor() {
        super("Not Found", 404);
    }
}

module.exports = {
    ExpressError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
};









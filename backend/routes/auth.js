"use strict"

const jsonSchema = require('jsonschema');
const userAuthSchema = require('../schemas/userAuth.json');
const {BadRequestError} = require('../expressError');
const User = require('../models/users');
const express = require('express');
const router = new express.Router();
const {createToken} = require('../helpers/tokens');

/** POST /auth/token: {username, password} => {token}
 * Returns JWT token which can be used to authenticate further request
 * Authorization required: none
 */

router.post('/token', async function(req, res, next) {
    try {
        console.log('testing token, it works');
        // do the validator to check if username and password valid
        const validator = jsonSchema.validate(req.body, userAuthSchema);
        // throw error message if invalid
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        // get username and password from req.body if input valids
        const {username, password} = req.body;
        // return user info from database
        console.log(username, password);
        const user = await User.authenticate(username, password);
        console.log(`test user authenticate: ${user}`);
        const token = createToken(user);
        // return token with a format of json
        return res.json({token});
    } catch (error) {
        return next(error);
    }
});

/** POST /auth/register: {user} = {token}
 * user must include {username, password, firstName, lastName, email}
 * Returns JWT token which can be used to authenticate further request
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
    try {
        console.log('register works so far!');
        console.log(req.body);
        const validator = jsonSchema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errors = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }
        const newUser = await User.signup({...req.body, isAdmin: false});
        const token = createToken(newUser);
        return res.status(201).json({token});
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
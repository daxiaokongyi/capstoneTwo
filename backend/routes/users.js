"use strict"

const jsonschema = require('jsonschema');
const express = require('express');

const router = express.Router();
const {ensureAdmin, ensureCorrectUserOrAdmin} = require('../middleware/auth');
const userNewSchema = require('../schemas/userNew.json');
const {BadRequestError} = require('../expressError');
const User = require('../models/users');
const {createToken} = require('../helpers/tokens');

/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
        // check user schema
        const validator = jsonschema.validate(req.body, userNewSchema);
        // return error if validator is invalid
        if (!validator.valid) {
            const errors = validator.errors.map(e => e.stack);
            throw new BadRequestError(errors);
        }
        // add user if no errors on user new schema
        const user = await User.signup(req.body);
        const token = createToken(user);
        // return response with status of 201 and user and token with json format
        return res.status(201).json({user, token});
    } catch (error) {
        return next(error);
    }
});

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/", ensureAdmin, async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({user});
    } catch (error) {
        return next(error);
    }
})

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id }
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    console.log(`get username ...`);
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        console.log(req.body);
        const validator = jsonschema.validate(req.body, userNewSchema);
        if (!validator.valid) {
            const errors = validator.errors.map(e => e.stack);
            console.log(errors);
            throw new BadRequestError(errors);
        }
        console.log('hello tesing!');
        const user = await User.update(req.params.username, req.body);
        return res.json({user});
    } catch (error) {
        return next(error);
    }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function(req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({deleted: req.params.username});
    } catch (error) {
        return next(error);
    }
});

/** POST /[username]/songs/[id]  { state } => { application }
 *
 * Returns {"applied": songId}
 *
 * Authorization required: admin or same-user-as-:username
 * */

router.post("/:username/songs/:id", ensureCorrectUserOrAdmin, async function(req, res, next) {
    try {
        const songId = +req.params.id;
        await User.setFavorite(req.params.username, songId);
        return res.json({favorited: songId});
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
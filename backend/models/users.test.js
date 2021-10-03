"use strict";

// connect to test DB
process.env.NODE_ENV = 'test';

// imports db
const db = require('../db');
const User = require('../models/users');
const {UnauthorizedError, BadRequestError} = require('../expressError');

const {
    commonBeforeEach,
    commonAfterEach,
    commonBeforeAll,
    commonAfterAll,
} = require('./_testCommon');
const { user } = require('pg/lib/defaults');

beforeEach(commonBeforeEach)
beforeAll(commonBeforeAll);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// authenticate an user with username and password
describe('authenticate an user', function() {
    test('good request that user and password match', async function() {
        const user1 = await User.authenticate('username1', 'password1');
        expect(user1.username).toEqual('username1');
        expect(user1.email).toEqual('user1@email.com');
    })
    test('bad request that user put a wrong password', async function() {
        try {
            await User.authenticate('username1', 'password2');
        } catch (error) {
            expect(error instanceof UnauthorizedError).toBeTruthy();
        }
    })
    test('bad request that user does not exist', async function() {
        try {
            await User.authenticate('username99', 'password1');
        } catch (error) {
            expect(error instanceof UnauthorizedError).toBeTruthy();
        }
    })
})

describe('register a new user', function() {
    test('good request that register successfully', async function() {
        let newUser = await User.signup({
            username: 'username99', 
            password: 'password99',
            firstName: 'firstname99',
            lastName: 'lastname99',
            email: 'user99@gmail.com'
        })
        expect(newUser.email).toEqual('user99@gmail.com');
        let found = await User.authenticate('username99', 'password99');
        expect(found.email).toEqual('user99@gmail.com');
    });
    test('bad request that sign up with dupulicate data', async function() {
        try {
            await User.signup({
                username: 'username1', 
                password: 'password1',
                firstName: 'firstname1',
                lastName: 'lastname1',
                email: 'user1@gmail.com'
            })
        } catch (error) {
            expect(error instanceof BadRequestError).toBeTruthy();
        }
    });
});




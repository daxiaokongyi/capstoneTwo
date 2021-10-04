"use strict";

const request = require('supertest');
const app = require('../app');

const {
    commonBeforeAll,    
    commonBeforeEach,
    commonAfterAll, 
    commonAfterEach
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterAll(commonAfterAll);
afterEach(commonAfterEach);

describe('GET /users/:username', function() {
    test('good request that getting user info successfully', async function () {
        const resp = await request(app)
            .get('/users/username1');

        console.log(JSON.stringify(resp));
        expect(resp.statusCode).toEqual(201);
    });
})
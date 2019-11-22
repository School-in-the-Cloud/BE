const request = require('supertest');

const server = require('../api/server');

describe('auth router', () => {
    describe('POST to /api/auth/register', () => {
        it('should respond with a token given complete user information',
            async () => {
                const info = {
                    email: `testingUser${new Date()}@mail.com`,
                    password: "testingPassword",
                    type: 'student',
                    first_name: 'first',
                    last_name: 'last'
                };

                const newUser = await request(server).post('/api/auth/register').send(info);
                return expect(newUser.body).toHaveProperty("token");
            }
        );

        it('should include the provided username in the response',
            async () => {
                const info = {
                    email: `testingUser${new Date()}@mail.com`,
                    password: "testingPassword",
                    type: 'student',
                    first_name: 'first',
                    last_name: 'last'
                };

                const newUser = await request(server).post('/api/auth/register').send(info);
                console.log("New User: ", newUser.body);
                return expect(newUser.body.user.username).toEqual(info.username);
            }
        );

        it('should include an id in the user object',
            async () => {
                const info = {
                    email: `testingUser${new Date()}@mail.com`,
                    password: "testingPassword",
                    type: 'student',
                    first_name: 'first',
                    last_name: 'last'
                };

                const newUser = await request(server).post('/api/auth/register').send(info);
                return expect(newUser.body.user.id).toBeDefined();
            }
        );
    });

    describe('POST to /api/auth/login', () => {
        it('should include an id in the user object',
            async () => {
                const info = {
                    email: `testingUser${new Date()}@mail.com`,
                    password: "testingPassword",
                    type: 'student',
                    first_name: 'first',
                    last_name: 'last'
                };
                const creds = {
                    email: info.email,
                    password: info.password
                };

                const newUser = await request(server).post('/api/auth/register').send(info);

                const loggedIn = await request(server).post('/api/auth/login').send(creds);

                return expect(loggedIn.body.user.id).toBeDefined();
            }
        );

        it('should respond with a token given correct user information',
            async () => {
                const info = {
                    email: `testingUser${new Date()}@mail.com`,
                    password: "testingPassword",
                    type: 'student',
                    first_name: 'first',
                    last_name: 'last'
                };
                const creds = {
                    email: info.email,
                    password: info.password
                };

                const newUser = await request(server).post('/api/auth/register').send(info);
                const loggedIn = await request(server).post('/api/auth/login').send(creds);
                return expect(loggedIn.body).toHaveProperty("token");
            }
        );
    });
})
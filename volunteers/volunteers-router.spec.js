const request = require('supertest');
const server = require('../api/server');

describe('volunteers router', () => {
    describe('GET to /', () => {
        it('should respond with status 400 if no token provided', async () => {
            const res = await request(server).get('/api/volunteers/');
            expect(res.status).toBe(400);
        });
        it('should respond with an array of objects', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";

            const res = await request(server).get('/api/volunteers/').set({ Authorization: token });
            const body = res.body;
            const bodyType = typeof body[0];
            expect(bodyType).toBe('object');
        });
    });

    describe('GET to /:id', () => {
        it('should respond with status 400 if no token provided', async () => {
            const res = await request(server).get('/api/volunteers/2');
            expect(res.status).toBe(400);
        });
        it('should respond with an object', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";

            const res = await request(server).get('/api/volunteers/2').set({ Authorization: token });
            const body = res.body;
            // console.log("Vol ID body: ", body);
            const isBodyArr = Array.isArray(body);
            expect(isBodyArr).toBe(true);
        }
        );
    });

    describe('GET to /:id/todos', () => {
        it('should respond with status 200 if token provided', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/volunteers/2/todos').set({ Authorization: token });
            expect(res.status).toBe(200);
        });
        it('should respond with todos', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/volunteers/2/todos').set({ Authorization: token });
            const firstTodo = res.body[0];
            console.log(firstTodo);
            expect(firstTodo.todos_id).toBeDefined();
        });
        it('should respond with todos only having volunteer id', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/volunteers/2/todos').set({ Authorization: token });
            const todos = res.body;
            const filtered = todos.filter(todo => todo.volunteer_id !== 2);
            // console.log("Testing id: ", todos);
            expect(filtered.length).toBe(0);
        });
    });

    describe('GET to /:id/filter/', () => {
        it('should only give volunteers with given id', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/volunteers/filter?country=Mexico').set({ Authorization: token });
            const vols = res.body;
            const filtered = vols.filter(vol => {
                console.log(vol.country);
                return vol.country !== "Mexico";
            });
            console.log("Testing filter: ", vols);
            expect(filtered.length).toBe(0);
        });
    });
});
const request = require('supertest');

const server = require('../api/server');

describe('admin router', () => {
    describe('GET to /:id/todos', () => {
        it('should respond with status 200 if token provided', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/admins/1/todos').set({ Authorization: token });
            expect(res.status).toBe(200);
        });
        it('should respond with todos', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/admins/1/todos').set({ Authorization: token });
            const firstTodo = res.body[0];
            expect(firstTodo.todos_id).toBeDefined();
        });
        it('should respond with todos only having admin id', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/admins/1/todos').set({ Authorization: token });
            const todos = res.body;
            const filtered = todos.filter(todo => todo.admin_id !== 1);
            expect(filtered.length).toBe(0);    
        });
    });
    describe('POST to /:id/todos', () => {
        it('should return the todos_id', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const todo = {
                "volunteer_id": "2",
                "name": "testing POST functionality",
                "items": ["step 1 of test", "step 2 of test", "step 3 of test"],
                "is_completed": false
            }
            const res = await request(server)
                .post('/api/admins/1/todos')
                .set({ Authorization: token })
                .send(todo);
            const { todos_id } = res.body;
            expect(todos_id).toBeDefined();
        });
        it('should respond with status 400 if no token is provided', async () => {

            const todo = {
                "volunteer_id": "2",
                "name": "testing POST functionality",
                "items": ["step 1 of test", "step 2 of test", "step 3 of test"],
                "is_completed": false
            }
            const res = await request(server)
                .post('/api/admins/1/todos')
                .send(todo);
            expect(res.status).toBe(400);
        });
    });
    describe('PUT to /:id/todos', () => {
        it('should successfully change is_completed to true', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const todoBefore = await request(server).get('/api/todos/12').set({ Authorization: token });
            const isCompleted = todoBefore.body.isCompleted;
            const todo = {
                "todos_id": "12",
                "is_completed": !isCompleted
            };
            const res = await request(server)
                .put('/api/admins/1/todos')
                .set({ Authorization: token })
                .send(todo);
            const todoAfter = await request(server).get('/api/todos/12').set({ Authorization: token });
            expect(todoAfter.body.is_completed).toBe(!isCompleted);
        });
        it('should respond with status 400 if no token is provided', async () => {

            const todo = {
                "volunteer_id": "2",
                "name": "testing POST functionality",
                "items": ["step 1 of test", "step 2 of test", "step 3 of test"],
                "is_completed": false
            }
            const res = await request(server)
                .post('/api/admins/1/todos')
                .send(todo);
            expect(res.status).toBe(400);
        });
    });
});
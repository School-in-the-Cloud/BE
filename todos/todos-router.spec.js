const request = require('supertest');
const server = require('../api/server');

describe('todos router', () => {
    describe('GET to /', () => {
        it('should return ', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = request(server).get('/api/todos/').set({ Authorization: token });

        });
    });
    describe('GET to /:id', () => {
        it('should respond with status 200 if token provided', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/todos/12/').set({ Authorization: token });
            expect(res.status).toBe(200);
        });
        it('should respond with todos', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/todos/12').set({ Authorization: token });
            const firstTodo = res.body;
            console.log(firstTodo);
            expect(firstTodo.todos_id).toBeDefined();
        });
        it('should respond with todos only having provided id', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const res = await request(server).get('/api/todos/12').set({ Authorization: token });
            const todo = res.body;
            // console.log("Testing id: ", todos);
            expect(todo.todos_id).toBe(12);
        });
    });
    describe('DELETE to /:id', () => {
        it('should ', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const todo = {
                volunteer_id: "2",
                name: "testing is completed AGAIN",
                items: ["step 1 of test", "step 2 of test", "step 3 of test"],
                is_completed: true
            };
            const newTodoId = await request(server).post('/api/admin/1/todos').set({ Authorization: token }).send(todo);
            // const toBeDeleted = await request(server).get(`/api/todos/${newTodoId}`).set({Authorization: token});
            const res = await request(server).delete(`/api/todos/${newTodoId}`).set({ Authorization: token });
            const shouldBeDeleted = await request(server).get(`/api/todos/${newTodoId}`).set({ Authorization: token });
            expect(shouldBeDeleted.status).toBe(404);
        });
        it('should return status 200', async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzQzNTY3NjcsImV4cCI6MTU3NDk2MTU2N30.WVh68htd7buX4LJ1NZ_CoMgWwHw9Ap-52x27ekRtGOs";
            const todo = {
                volunteer_id: "2",
                name: "testing is completed AGAIN",
                items: ["step 1 of test", "step 2 of test", "step 3 of test"],
                is_completed: true
            };
            const newTodoId = await request(server).post('/api/admin/1/todos').set({ Authorization: token }).send(todo);
            // const toBeDeleted = await request(server).get(`/api/todos/${newTodoId}`).set({Authorization: token});
            const res = await request(server).delete(`/api/todos/${newTodoId}`).set({ Authorization: token });
            expect(res.status).toBe(200);
        });
    });

});
const request = require('supertest');
const app = require('./server');

describe("To-Do API Tests", () => {
    beforeEach(() => {
        // Reset the todos array before each test
        global.todos = [];
    });

    test("POST /todo - Should return 400 for empty task", async () => {
        const res = await request(app).post('/todo').send({});
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Task is required");
    });

    test("PUT /todo/:id - Should return 404 for non-existent item", async () => {
        const res = await request(app).put('/todo/999').send({ task: "Updated Task" });
        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Todo not found");
    });

    test("DELETE /todo/:id - Should return 404 for non-existent item", async () => {
        const res = await request(app).delete('/todo/999');
        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Todo not found");
    });

    test("GET /todo - Should return an empty array when no tasks exist", async () => {
        const res = await request(app).get('/todo');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    test("GET /todo/delayed - Should handle delayed response", async () => {
        jest.setTimeout(3000); // Increase timeout for async operations
    
        await request(app).post('/todo').send({ task: "Delayed Task" });
        const res = await request(app).get('/todo/delayed');
    
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });
    
});

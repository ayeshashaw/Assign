const request = require('supertest');
const app = require('./server');

describe("To-Do API Tests", () => {
    test("POST /todo - Should create a new task", async () => {
        const res = await request(app)
            .post('/todo')
            .send({ task: "Learn Jest" });

        expect(res.status).toBe(201);
        expect(res.body.task).toBe("Learn Jest");
    });

    test("GET /todo - Should retrieve all tasks", async () => {
        const res = await request(app).get('/todo');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("PUT /todo/:id - Should update a task", async () => {
        await request(app).post('/todo').send({ task: "Old Task" });
        
        const res = await request(app)
            .put('/todo/1')
            .send({ task: "Updated Task" });

        expect(res.status).toBe(200);
        expect(res.body.task).toBe("Updated Task");
    });

    test("DELETE /todo/:id - Should delete a task", async () => {
        await request(app).post('/todo').send({ task: "Delete Me" });

        const res = await request(app).delete('/todo/1');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Deleted successfully");
    });

    test("POST /todo - Should return 400 for missing task", async () => {
        const res = await request(app).post('/todo').send({});
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Task is required");
    });
});


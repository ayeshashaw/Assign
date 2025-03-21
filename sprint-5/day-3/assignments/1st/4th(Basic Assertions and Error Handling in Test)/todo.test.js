test("POST /todo - Should return 400 for missing task", async () => {
    const res = await request(app).post('/todo').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Task is required");
});

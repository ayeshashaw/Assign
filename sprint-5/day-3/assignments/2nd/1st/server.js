app.get('/todo/delayed', async (req, res) => {
    setTimeout(() => {
        res.json(todos);
    }, 2000);
});

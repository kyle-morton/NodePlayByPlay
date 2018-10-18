module.exports = (app) => {
    app.get('/dog', (req, res) => {
        setTimeout(() => {
            res.send("here's a dog!");
        }, 5000)
    });
    app.get('/dog/:id', (req, res) => {
        res.send('getting dog by id: ' + req.params.id);
    });
    app.post('/dog', (req, res) => {

    });
    
};
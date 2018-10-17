module.exports = (app) => {
    app.get('/dog', (req, res) => {
        res.send("here's a dog!");
    });
    app.get('/dog/:id', (req, res) => {
        res.send('getting dog by id: ' + req.params.id);
    });
    app.post('/dog', (req, res) => {

    });
    
};
module.exports = (app) => {
    app.get('/cat', (req, res) => {
        res.send("here's a cat!");
    });
    app.get('/cat/:id', (req, res) => {
        res.send('getting cat by id: ' + req.params.id);
    });
    app.post('/cat', (req, res) => {

    });
    
};
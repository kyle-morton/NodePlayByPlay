let r = require('request').defaults({
    json: true
});

module.exports = (app) => {
    
    app.get('/pets', (req, res) => {
        r({ uri: 'http://localhost:3001/dog'},
        (err, response, body) => {
            if (!err && response.statusCode === 200) {
                res.json(body);
            } else {
                res.send(response.statusCode);
            }
        })
    });
    
};
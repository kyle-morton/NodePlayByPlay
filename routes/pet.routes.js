let r = require('request').defaults({
    json: true
});
let async = require('async');

module.exports = (app) => {
    
    app.get('/pets', (req, res) => {
        
        async.parallel({
            cat: (callback) => {
                r({ uri: 'http://localhost:4000/cat'},
                    (err, response, body) => {
                        if (response.statusCode === 200) {
                            callback(null, body);
                        } else if (err) {
                            callback({service:'cat', error: err});
                            return;
                        } else {
                            callback(response.statusCode);
                        }
                    })
            },
            dog: (callback) => {
                r({ uri: 'http://localhost:4001/dog'},
                (err, response, body) => {
                    
                    if (response.statusCode === 200) {
                        callback(null, body);
                    } else if (err) {
                        callback({service:'dog', error: err});
                        return;
                    } else {
                        callback(response.statusCode);
                    }
                })
            }
        }, 
        /**
         * Called when all request are done
         */
        (err, results) =>{
            res.json({
                error: err,
                results: results
            });
        })
    
    });
    
};
let r = require('request').defaults({
    json: true
});
let async = require('async');
let redis = require('redis');

let redisClient = redis.createClient(6379, '127.0.0.1');

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

    app.get('/pets/dogs', (req, res) => {
        const key = 'dogs';
        redisClient.get(key, (err, dogs) => {
            if (err) 
                throw err;
            if (dogs)
                res.json(JSON.parse(dogs));
            else {
                r({ uri: 'http://localhost:4001/dog'},
                (err, response, body) => {
                    
                    if (err) 
                        throw err;
                    if (!err && response.statusCode == 200) {
                        res.json(body);

                        //cache request for 10 seconds in redis client

                        // redisClient.set(key, JSON.stringify(body), (err) => {
                        redisClient.setex(key, 10, JSON.stringify(body), (err) => {
                            if (err) 
                                throw err;
                        });
                    } else {
                        res.send(response.statusCode);
                    }
                })
            }

        });


    });

    app.post('/pets/clear', (req, res) => {
        redisClient.FLUSHALL();
        res.send('done');
    });
    
};
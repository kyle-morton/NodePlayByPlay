let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//requiring cat export, passing in express app
require('./routes/pet.routes')(app);

let server = app.listen(3002, () => {
    console.log('pet server running on port: ' + 3002);
})

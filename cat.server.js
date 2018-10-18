let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//requiring cat export, passing in express app
require('./routes/cat.routes')(app);

let server = app.listen(4000, () => {
    console.log('cat server running on port: ' + 4000);
})

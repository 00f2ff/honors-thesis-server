var express = require('express');
var app = express();
var dbRoutes = require('./routes/dbRoutes');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// appType will be "fingers" or "read"
app.get('/:appType/:participant_id/:task_id', dbRoutes.startTask);
app.post('/save', dbRoutes.saveTask);
app.post('/saveListings', dbRoutes.saveListing); // I don't feel like refactoring
app.get('/listings/:category', dbRoutes.getListing);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



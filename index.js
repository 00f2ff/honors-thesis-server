var express = require('express');
var app = express();
var dbRoutes = require('./routes/dbRoutes');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// appType will be "fingers" or "read"
app.get('/:appType/:participant_id/:task_id', dbRoutes.startTask);
app.put('/update', dbRoutes.saveTask);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



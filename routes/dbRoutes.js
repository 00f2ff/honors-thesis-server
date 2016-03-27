var mongo = require('../models/mongo.js');

var participant_id;
var task_id;

exports.startTask = function(req, res) {
	var data = {
		fingers: (req.params.appType === "fingers"),
		participant_id: req.params.participant_id,
		task_id: req.params.task_id
	}
	res.render('index_'+req.params.appType, {data: data}); // requires 'fingers' or 'reader'
}

// called via ajax request
exports.saveTask = function(req, res) {
	console.log(req.body);
	mongo.create(req.body, function(doc) {
		res.send(JSON.stringify(doc));
	})
}
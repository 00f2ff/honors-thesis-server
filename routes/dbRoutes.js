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
	mongo.create(req.body, 'logs', function(doc) {
		res.send(JSON.stringify(doc));
	});
}

exports.saveListings = function(req, res) {
	console.log(req.body);
	mongo.create(req.body, 'listings', function(doc) {
		res.send(JSON.stringify(doc));
	});
}

exports.getListings = function(req, res) {
	mongo.find('listings', {'category': req.params.category}, function(doc) {
		res.send(JSON.stringify(doc));
	});
}

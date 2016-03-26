var mongo = require('../models/mongo.js');

var participant_id;
var task_id;

exports.startTask = function(req, res) {
	var data = {
		fingers: (req.params.appType === "fingers"),
		participant_id: req.params.participant_id,
		task_id: req.params.task_id
	}
	res.render('index', {data: data});
}

// called via ajax request
exports.saveTask = function(req, res) {

}

/*
How do I get all of the information and save it?

I'll need to store an object client-side with access to the participant_id and task_id
On document.ready, it needs to call a series of functions to collect user metadata
It should then save
After that, each time a new interaction is made, metadata is appended to the object's interactions array
When the submit button is pressed, the object is updated (or should I just save the whole thing at once?)

*/
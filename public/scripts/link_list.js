// initialize helper class
var global = new Global();

function LinkList() {
	$('.hover-row').first().empty();
	// Convert all categories into cells
	var categories = $('#link_list li');
	for (var i = 0; i < categories.length; i++) {
		var attributes = {
			'data-name': $(categories[i]).text()
		}
		var cell = global.cell(attributes);
		$('.hover-row').first().append(cell);
	}
	
}

LinkList.prototype.populate = function() {
	
}
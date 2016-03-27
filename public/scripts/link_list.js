// initialize helper class
var global = new Global();

function LinkList() {
	$('.hover-row').first().empty();
	// Convert all categories into cells
	var categories = $('#link_list li');
	var keyCodes = [49,50,51,52,53,54];
	for (var i = 0; i < categories.length; i++) {
		var attributes = {
			'data-name': $(categories[i]).text(),
			'data-keycode': keyCodes[i]
		}
		var cell = global.cell(attributes);
		$('.hover-row').first().append(cell);
	}
	
}

LinkList.prototype.populate = function() {
	
}
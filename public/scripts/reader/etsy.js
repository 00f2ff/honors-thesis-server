var table = new Table();
var productTable = new ProductTable();

function Etsy() {
	this.queryBase = 'https://openapi.etsy.com/v2/';
	// Each time an etsy request is made, add {purpose: __, uri: __, parameters: __} to history for ability to go back
	this.requestHistory = [];
}

Etsy.prototype.getRequest = function(purpose, uri, parameters) {
	// don't push category request to history
	if (purpose !== 'categories') {
		this.requestHistory.push({
			purpose: purpose,
			uri: uri,
			parameters: parameters
		});
	}
	console.log(this.requestHistory)
	// format parameters as ampersand-separated string
	var params = '';
	for (var key in parameters) {
		if (parameters.hasOwnProperty(key)) {
			params = params + key + '=' + parameters[key] + '&';
		}
	}
	var query = this.queryBase + uri + '.js?' + params + 'api_key=' + api_key;
	$.ajax({
		url: query,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			if (data.ok) {
				switch (purpose) {
					case 'listings':
						table.populate(data.results);
						// add next-page button if not already present
						if (!$('#next-page').length) {
							$('body').append('<div id="next-page" tabindex="0" role="button">Next Page</div>')
						}
						break;
					case 'product':
						productTable.populate(data.results[0]); // comes in array
						// remove next-page button
						$('#next-page').detach();
						break;
					default:
						console.log('Not a valid purpose');
				}
				
			} else {
				console.log(data.error);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}



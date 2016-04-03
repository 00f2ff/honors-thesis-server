var table = new Table();
var productTable = new ProductTable();

/*
 * No API version spoofs everything but search and view product
 Todo:
 1. Build backend support for saving product information to database
 2. Save 36 (2*18, so 2 pages) listings + product info to each category and trending
 3. Reconfigure etsy classes and main js files to pull listing information from the database instead of calling it from API
 4. All product data I use is sent through listings, so just pull that particular info from database
 - reconfigure how requestHistory works 
 {
 	type: , # if 'search', use proper next page protocol; otherwise, call DB again but modify what's returned
	url: , # main.js should generate proper uri for search
	productIndex: undefined, # will be a number if it's a product
	offset: 0 # will be 18 if next page
 }
 */


function Etsy() {
	this.queryBase = 'https://openapi.etsy.com/v2/';
	this.currentListings;
	this.requestHistory = [];
	/*
	 * History data structure:
	 {
	 	type: , # if 'search', use proper next page protocol; otherwise, call DB again but modify what's returned
		url: , # main.js should generate proper uri for search
		productIndex: undefined, # will be a number if it's a product
		offset: 0 # will be 18 if next page
	 }
 	*/
}

Etsy.prototype.getRequest = function(type, uri, productIndex, offset, keywords) {

	if (type === 'search') {
		var query = this.queryBase + uri + '.js?limit=36&offset=' + offset + '&keywords=' + keywords + '&api_key=' + api_key;
	} else {
		var query = '/listings/' + type;
	}

	this.requestHistory.push({
		type: type,
		uri: uri,
		productIndex: productIndex,
		offset: offset,
		keywords: keywords
	});

	console.log(this.requestHistory);
	var that = this;
	if (productIndex == undefined) { // not a product page
		$.ajax({
			url: query,
			type: 'GET',
			dataType: 'jsonp',
			success: function(data) {
				if (data.ok) {
					that.currentListings = data.results;
					// need to pass offset so data-productIndex gets updated
					table.populate(offset, that.currentListings.slice(offset+1, offset+19)); // only show 18 products, despite 36 being available
					// add next-page button if not already present
					if (!$('#next-page').length) {
						$('body').append('<div id="next-page" tabindex="0" role="button">Next Page</div>')
					}
				} else {
					console.log(data.error);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	} else { // product page
		productTable.populate(that.currentListings[productIndex]);
		console.log(data);
		// remove next-page button
		$('#next-page').detach();
	}

}



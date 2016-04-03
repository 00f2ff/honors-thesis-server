/* 
 * This file sends a bunch of consecutive Etsy requests to populate the database
 */

makeRequest('trending', 'listings/trending');
makeRequest('Accessories', 'listings/active');
makeRequest('Art', 'listings/active');
makeRequest('Bags and Purses', 'listings/active');
makeRequest('Bath and Beauty', 'listings/active');
makeRequest('Books and Zines', 'listings/active');
makeRequest('Candles', 'listings/active');

function makeRequest(category, uri) {
	if (category === 'trending') {
		var query = 'https://openapi.etsy.com/v2/' + uri + '.js?limit=36&api_key=' + api_key;
	} else {
		var query = 'https://openapi.etsy.com/v2/' + uri + '.js?limit=36&category=' + category + '&api_key=' + api_key;
	}
	$.ajax({
		url: query,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			if (data.ok) {
				console.log("############ "+category);
				console.log(data);
				saveToDB(category, data);
			} else {
				console.log(data.error);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function saveToDB(category, data) {
	// filter data
	data.category = category;
	delete data.pagination;
	delete data.params;
	// removed description because it is usually too long and confusing
	for (var i = 0; i < data.results.length; i++) {
		data.results[i] = {
			listing_id: data.results[i].listing_id,
			title: data.results[i].title,
			price: data.results[i].price,
			category_path: data.results[i].category_path,
			materials: data.results[i].materials,
			style: data.results[i].style,
		}
	}
	$.ajax({
		type: 'POST',
		url: '/saveListings',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType:'json',
		success: function() {
			console.log('yay');
			
		},
		error: function(err) {
			console.log(err);
			console.log('noooo');
		}
	});
}

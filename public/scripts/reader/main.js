
var etsy = new Etsy();
etsy.getRequest('listings', 'listings/trending', {'limit': 18, 'offset': 0});

// NOTE: pressing space also has default behavior of bringing down page, but that shouldn't matter

$('body').keydown(function(e) {
	var kc = e.keyCode;
	
	var isSearch = $('#search input:focus').length;
	var isCategory = $('li:focus').length;
	var isProduct = $('.product:focus').length;
	var isNext = $('#next-page:focus').length;
	console.log(isNext);

	// all key functionality doesn't hold for typing in search box
	if (!isSearch) {
		if (kc === 192) { // grave accent (back button)
			// reset categories in base case (from first page) or going back to first page
			if (etsy.requestHistory.length > 1) {
				// last element of etsy.requestHistory is the current call, so pop it
				etsy.requestHistory.pop();
				// previous call from this page is now last element, so send new request with popped element
				var previousRequest = etsy.requestHistory.pop();
				// this request will add it back into history again; next back call will remove it
				etsy.getRequest(previousRequest.purpose, previousRequest.uri, previousRequest.parameters);
			}
		} else if (isProduct && (kc === 32 || kc === 13)) { // is product and space or enter
			etsy.getRequest('product', 'listings/'+$(document.activeElement).data('listing_id'), {});
		} else if (isCategory && (kc === 32 || kc === 13)) { // is category and space or enter
			etsy.getRequest('listings', 'listings/active', {'limit': 18, 'offset': 0, 'category': $(document.activeElement).data('name')});
		} else if (isNext && (kc === 32 || kc === 13)) { // is next and space or enter
			goToNextPage();
		}
	} else {
		if (kc === 13) { // enter to search
			var searchString = $('#search input').val().replace(/\s+/g, '%20');
			console.log(searchString);
			$('#search input').val('');
			etsy.getRequest('listings', 'listings/active', {'limit': 18, 'offset': 0, 'keywords': searchString});
			// remove focus from input so user can use site again
			$('#search input').blur();
		}
	}
	
	// cancel speech because cell won't contain same content
	speechSynthesis.cancel();
});

function goToNextPage() {
	// send previous Etsy request with an updated offset
	var lastRequest = etsy.requestHistory[etsy.requestHistory.length-1];
	// create copy of last parameters
	var newParameters = {}
	var oldKeys = Object.keys(lastRequest.parameters);
	for (var i = 0; i < oldKeys.length; i++) {
		newParameters[oldKeys[i]] = lastRequest.parameters[oldKeys[i]];
		if (oldKeys[i] === 'offset') {
			newParameters[oldKeys[i]] = lastRequest.parameters[oldKeys[i]] + 18;
		} else {
			newParameters[oldKeys[i]] = lastRequest.parameters[oldKeys[i]];
		}
	}
	etsy.getRequest(lastRequest.purpose, lastRequest.uri, newParameters);
}

// adds a next page click handler (not present on others; require enter to go to (act as links))
// $('body').on('click', '#next-page', goToNextPage)



// Search //
$('#search input').focus(function() {
	// Message about turning off Fingers
});
$('#search form').submit(function(e) {
	e.preventDefault();
})




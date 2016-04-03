
var etsy = new Etsy();
// etsy.getRequest('listings', 'listings/trending', {'limit': 18, 'offset': 0});
etsy.getRequest('trending', undefined, undefined, 0, undefined);

// NOTE: pressing space also has default behavior of bringing down page, but that shouldn't matter

$('body').keydown(function(e) {
	var kc = e.which || e.keyCode;
	
	var isSearch = $('#search input:focus').length;
	var isCategory = $('li:focus').length;
	var isProduct = $('.product:focus').length;
	var isNext = $('#next-page:focus').length;

	var logText = ''; // default: any key
	// don't collect data on pause (except for upause)
	if (!log.paused) {
		// all key functionality doesn't hold for typing in search box
		if (!isSearch) {
			console.log($(document.activeElement).data());
			
			if (kc === 192) { // grave accent (back button)
				// reset categories in base case (from first page) or going back to first page
				if (etsy.requestHistory.length > 1) {
					// last element of etsy.requestHistory is the current call, so pop it
					etsy.requestHistory.pop();
					// previous call from this page is now last element, so send new request with popped element
					var pr = etsy.requestHistory.pop();
					// this request will add it back into history again; next back call will remove it
					etsy.getRequest(pr.type, pr.uri, pr.productIndex, pr.offset, pr.keywords);
				}
				logText = 'back';
			} else if (isProduct && (kc === 32 || kc === 13)) { // is product and space or enter
				logText = $(document.activeElement).find('.product-name').text() + ' ' + $(document.activeElement).find('.product-price').text();
				etsy.getRequest(undefined, undefined, $(document.activeElement).data('product_index'), undefined, undefined);
			} else if (isCategory && (kc === 32 || kc === 13)) { // is category and space or enter
				logText = $(document.activeElement).text();
				etsy.getRequest($(document.activeElement).text(), undefined, undefined, 0, undefined);
			} else if (isNext && (kc === 32 || kc === 13)) { // is next and space or enter
				logText = 'next page';
				goToNextPage();
			} else if (kc === 27) { // press escape to pause
				log.paused = !log.paused;
				logText = 'pause';
			} else if (kc === 39) { // press right arrow to end task
				logText = 'end task';
			}
			log.logInteraction(kc, 'press', logText);
		} else {
			if (kc === 13) { // enter to search
				var searchString = $('#search input').val().replace(/\s+/g, '%20');
				logText = 'search';
				console.log(searchString);
				$('#search input').val('');
				etsy.getRequest('search', 'listings/active', undefined, 0, searchString);
				// remove focus from input so user can use site again
				$('#search input').blur();
				log.logInteraction(kc, 'press', logText);
			} else if (kc === 27) { // press escape to pause
				log.paused = !log.paused;
				logText = 'pause';
			}
		}
	} else {
		if (kc === 27) { // press escape to unpause
			logText = 'unpause';
			log.paused = !log.paused;
			log.logInteraction(kc, 'press', logText);
		}
	}

	// cancel speech because cell won't contain same content
	speechSynthesis.cancel();
});

function goToNextPage() {
	// send previous Etsy request with an updated offset
	var lastRequest = etsy.requestHistory[etsy.requestHistory.length-1];
	etsy.getRequest(lastRequest.type, lastRequest.uri, lastRequest.productIndex, lastRequest.offset+18, lastRequest.keywords);
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




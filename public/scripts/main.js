
var etsy = new Etsy();
etsy.getRequest('listings', 'listings/trending', {'limit': 18, 'offset': 0});

// Keycode arrays. Index of key corresponds with index of cell in hover-row
var linkListKeyCodes = [49,50,51,52,53,54];
var tableFirstColumnKeyCodes = [81,87,69,82,84,89];
var tableSecondColumnKeyCodes = [65,83,68,70,71,72];
var tableThirdColumnKeyCodes = [90,88,67,86,66,78];
var nextProductPageKeyCodes = [85,74,77];


// Assigns click handler to cells (effect differs based on cell type)
$('body').keydown(function(e) {
	// find which hover-row had a cell pressed
	var kc = e.keyCode;
	// find out whether UI is showing Table or ProductTable (because no arrow control / activation on latter)
	// AND is located on select conditionals (does not apply to LinkList)
	var isNotProductTable = $('.hover-row:nth-child(3)').children().length;
	var isSearch = $('#search input:focus').length;
	console.log(isNotProductTable);
	// all key functionality doesn't hold for typing in search box
	if (!isSearch) {
		if (linkListKeyCodes.indexOf(kc) > -1) {
			activateCategoryCell(kc);
		} else if (tableFirstColumnKeyCodes.indexOf(kc) > -1 && isNotProductTable) {
			activateTableCell(kc, 2);
		} else if (tableSecondColumnKeyCodes.indexOf(kc) > -1 && isNotProductTable) {
			activateTableCell(kc, 3);
		} else if (tableThirdColumnKeyCodes.indexOf(kc) > -1 && isNotProductTable) {
			activateTableCell(kc, 4);
		} else if (nextProductPageKeyCodes.indexOf(kc) > -1 && isNotProductTable) {
			activateNextPageCell();
		} else if (kc === 192) { // grave accent (back button)
			// reset categories in base case (from first page) or going back to first page
			if (etsy.requestHistory.length > 1) {
				// last element of etsy.requestHistory is the current call, so pop it
				etsy.requestHistory.pop();
				// previous call from this page is now last element, so send new request with popped element
				var previousRequest = etsy.requestHistory.pop();
				// this request will add it back into history again; next back call will remove it
				etsy.getRequest(previousRequest.purpose, previousRequest.uri, previousRequest.parameters);
			}
		} else if (kc === 16) { // press shift to set focus to search bar
			$('#search input').focus();
		}
	} else {
		if (kc === 13) { // enter to search
			var searchString = $('#search input').val().replace(/\s+/g, '%20');
			console.log(searchString);
			$('#search input').val('');
			etsy.getRequest('listings', 'listings/active', {'limit': 18, 'offset': 0, 'keywords': searchString});
			// remove focus from input so user can use site again
			$('#search input').blur();
		} else if (kc === 16) { // press shift again to unfocus search
			$('#search input').blur();
		}
	}
	
	// cancel speech because cell won't contain same content
	speechSynthesis.cancel();
});

function activateTableCell(kc, nthChild) {
	var ckc;
	if (nthChild === 2) {
		ckc = tableFirstColumnKeyCodes;
	} else if (nthChild === 3) {
		ckc = tableSecondColumnKeyCodes;
	} else if (nthChild === 4) {
		ckc = tableThirdColumnKeyCodes;
	}
	var cell = $('.hover-row:nth-child('+nthChild+') .cell:nth-child('+(1+ckc.indexOf(kc))+')');
	console.log(cell);
	etsy.getRequest('product', 'listings/'+cell.data('listing_id'), {});
}

/*
 * Moving logic to external function to make keydown handler less awful
 */
function activateCategoryCell(kc) {
	var cell = $('.hover-row:first-child .cell:nth-child('+(1+linkListKeyCodes.indexOf(kc))+')');
	etsy.getRequest('listings', 'listings/active', {'limit': 18, 'offset': 0, 'category': cell.data('name')});
}

function activateNextPageCell() {
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


// Search //
$('#search input').focus(function() {
	// Message about turning off Fingers
});
$('#search form').submit(function(e) {
	e.preventDefault();
})




// initialize helper class
var global = new Global();

function Table() {
	
}

Table.prototype.populate = function(unformattedProducts) {
	var products = [];
	for (var i = 0; i < unformattedProducts.length; i++) {
		if (i % 3 === 0) {
			products.push([]);
		}
		products[products.length-1].push(unformattedProducts[i]);
	}
	this.products = products;
	// cell queues
	this.inactiveQueue = [ [], [], [] ];
	this.previouslyActiveQueue = [ [], [], [] ];
	this.generateUI();
}

Table.prototype.createProduct = function(title, price) {
	return $('<div class="product"> \
				<div class="product-image"></div> \
				<div class="product-name">'+title+'</div> \
				<div class="product-price">'+price+'</div> \
			</div>');
}

/*
 * Generate visible and hover grids
 * Hover grid is rotated version of grid.
 * Grid: [ [1,2,3], [4,5,6], [7,8,9], [10,11,12], [13,14,15] ]
 * Hover grid: [ [1,4,7,10,13], [2,5,8,11,14], [3,6,9,12,15] ]
 */
Table.prototype.generateUI = function() {
	$('#table').empty();
	$('.hover-row:not(:first-child)').empty();
	for (var r = 0; r < this.products.length; r++) {
		var row = $('<div class="row"></div>');
		for (var c = 0; c < this.products[r].length; c++) {
			// Create cell	
			var attributes = {
				'data-title': this.products[r][c].title,
				'data-price': '$'+this.products[r][c].price,
				'data-listing_id': this.products[r][c].listing_id
			}
			var cell = global.cell(attributes);
			/* image is a placeholder at the moment; I'm not going to add a real image for bandwidth concerns */
			// Create product
			var product = this.createProduct(cell.data('title'), cell.data('price'));

			// perform rotation (add 1 to hover-row index to preserve number row)
			// move cells into inactiveQueue if number of product rows exceeds 6
			if (r > 5) {
				this.inactiveQueue[c].push(cell);
			} else {
				// match number of visible products with number of visible cells.
				// this is a semi-arbitrary decision that mainly helps with debugging.
				// while real UIs will incorporate lazy-loading, they don't remove previous content from the screen
				row.append(product);
				// $($('.hover-row')[c+1]).append(cell);
				$('.hover-row:nth-child('+(2+c)+')').append(cell); // 2+c because :nth-child(1) refers to first child
			}	
		}
		// check whether row had cells appended or if cells moved into inactiveQueue
		if (row.children().length > 0) {
			$('#table').append(row);
		}
	}
}

function Table() {
	
}

Table.prototype.populate = function(offset, unformattedProducts) {
	var products = [];
	for (var i = 0; i < unformattedProducts.length; i++) {
		if (i % 3 === 0) {
			products.push([]);
		}
		products[products.length-1].push(unformattedProducts[i]);
	}
	this.products = products;
	this.offset = offset;
	this.generateUI();
}

Table.prototype.createProduct = function(product_index, title, price, listing_id) {
	// add assistive help for locating product
	return $('<div class="product" tabindex="0" role="button" data-product_index="' + product_index + '" data-listing_id="'+listing_id+'"> \
				<div class="product-name">'+title+'</div> \
				<div class="product-price">$'+price+'</div> \
			</div>');
}

Table.prototype.generateUI = function() {
	$('#table').empty();
	var product_index = this.offset; // either 0 or 18
	for (var r = 0; r < this.products.length; r++) {
		var row = $('<div class="row"></div>');
		for (var c = 0; c < this.products[r].length; c++) {
			var product = this.createProduct(product_index, this.products[r][c].title, this.products[r][c].price, this.products[r][c].listing_id);
			row.append(product);
			product_index++;
		}
		$('#table').append(row);
	}
}

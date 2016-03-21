var global = new Global();

function ProductTable() {

}

/*
 * ProductTable consists of a 3x3 grid of cells.
 */
ProductTable.prototype.generateUI = function() {
	// clear old table view
	$('#table').empty();
	$('.hover-row:not(:first-child)').empty();
	// loop through data and add to DOM
	var keys = Object.keys(this.productData);
	var element, attributes, cell;
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === 'title') {
			element = $('<h1>'+this.productData[keys[i]]+'</h1>')
		} else {
			element = $('<p>'+this.productData[keys[i]]+'</p>')
		}
		$('#table').append(element);
		// add cell
		attributes = {
			'data-text': this.productData[keys[i]]
		}
		var cell = global.cell(attributes);
		$('.hover-row:nth-child(2)').append(cell);
	}
}

/*
 * Works differently than table, because traditional shopping sites list product information vertically instead of in a grid.
 */
ProductTable.prototype.populate = function(data) {
	var productData = {}
	// null checking
	if (data.title && data.title.length > 0) productData.title = data.title;
	if (data.description && data.description.length > 0) productData.description = 'Description: ' + data.description;
	if (data.price && data.price.length > 0) productData.price = 'Price: $' + data.price;
	if (data.category_path && data.category_path.length > 0) productData.category = 'Category: ' + data.category_path.join(', ');
	if (data.materials && data.materials.length > 0) productData.material = 'Material: ' + data.materials.join(', ');
	if (data.style && data.style.length > 0) productData.style = 'Style: ' + data.style.join(', ');

	this.productData = productData;
	this.generateUI();
}
//check browser support webp img format
var body = $('body');
function hasWebP() {
	var rv = $.Deferred(), img = new Image();
	img.onload = function() { rv.resolve(); };
	img.onerror = function() { rv.reject(); };
	img.src = "external/webp_detect/pixel.webp"
	return rv.promise();
}

hasWebP().then(function() {
	body.addClass('webp')}, function() {
	body.addClass('no-webp')
});
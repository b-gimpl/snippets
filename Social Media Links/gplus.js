$.ajax({
	type: 'GET',
	url: 'https://apis.google.com/js/plusone.js',
	timeout: 2000, // Timeout after 2 seconds
	dataType: 'script',
	cache: true,
	success: function() {
		window.___gcfg = {
			lang: lang
		};
	}
});
// edit the #socialmedia where you would like to add the Button (class or id)
$('#socialmedia').append('<div id="gplusButton"><div class="g-plusone" data-size="medium"></div></div>');
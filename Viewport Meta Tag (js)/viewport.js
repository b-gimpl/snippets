if( window.screen.width <= 320 || window.screen.width >= 801 ){
	if( !navigator.userAgent.match(/iPad/i) ){
		var viewP = document.createElement('meta');
		viewP.name = 'viewport';
		viewP.content = 'width=device-width, initial-scale=1.0';
		var m = document.getElementsByTagName('meta')[0];
		m.parentNode.insertBefore(viewP, m);
	}
}
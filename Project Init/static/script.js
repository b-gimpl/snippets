// Config init...
var _cfg = _config || {};

var cls = {
	log : function( _output ){
		if( app.debug ){
			console.log(_output);
		}
	}
};

var app = {
	debug: false,
	timeoutHandler: [],
	TWITTER: false,
	FACEBOOK: false,
	GPLUS: false,
	PINTEREST: false,

	//-> initialize function
	_init : function(){
		cls.log('-> _init');

	}, // end init()


	// AjaxInclude
	ajaxInclude  : function(){
		$("[data-append],[data-replace],[data-after],[data-before]").extendAjaxInclude();
	} // end ajaxInclude()



}
window.app = app || {};
 
(function( $ ){
	"use strict";
	$.each( _cfg, function( _key, _val ){
		if( typeof _val == 'boolean' && typeof window.app[_key] == 'function' ){
			window.app[_key]();
		}
	});
})(jQuery);
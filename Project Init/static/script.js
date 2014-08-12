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

	/**
	 * Your Functions
	 **/

	// AjaxInclude
	ajaxInclude  : function(){
		$("[data-append],[data-replace],[data-after],[data-before]").extendAjaxInclude();
	} // end ajaxInclude()



};
window.app = app || {};
 

;(function( $ ){
    "use strict";
    	/* -> _config._preload = Load this functions first */
	$.each( _cfg._preload, function( _key, _val ){
	    if( typeof _val == 'boolean' && typeof window.app[_key] == 'function' ){
	        window.app[_key]();
	    }
	});
	/* -> _config = Load all others (not _preload and _reload) */
	$.each( _cfg, function( _key, _val ){
	    if( ( typeof _val == 'boolean' && typeof window.app[_key] == 'function' && _key != '_reload' && _key != '_preload' ) ){
	        window.app[_key]();
	    }
	});
	/* -> _config._reload = Load the ajaxInclued and others after the rest */
	$.each( _cfg._reload, function( _key, _val ){
		if( ( typeof _val == 'boolean' && typeof window.app[_key] == 'function' ) ){
		    window.app[_key]();
		}
	});
})(jQuery);

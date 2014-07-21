/**
 * ExtendAjaxInclude v. 0.1.0
 * Dependencies: ajaxInclude()
 * © 2014 - Gerhard Kanzler (elements.at)
 **/
;(function ( $, window, document, undefined ) {

	var pluginName = "extendAjaxInclude",
		defaults = {
			defaultOffset: 500,
			callback : null
		};

	function ExtendAjaxInclude( element, options ) {
		this.element = element;
		if( typeof options == 'function' ){
		  defaults.callback = options;
        }
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;
		this.scrollHandle = [];
		this.innerHeight = $(window).innerHeight();
		

		this.init();
	}

	ExtendAjaxInclude.prototype = {
		init: function() {
			var _self = this;
			this.ajaxInclude();
			$(window).on('resize', function(){
				_self.innerHeight = $(window).innerHeight();
			});
			// Listen to Scroll event
			$(window).on('scroll', function(){
				if( _self.scrollHandle.length ){
					_self.innerHeight = $(window).innerHeight();
					_self.ajaxIncludeScrollCallback();
				}
			});
		},

		// AjaxInclude
		ajaxInclude  : function(){
			var _this = this;
			$(this.element).each(function(){
				var _self = $(this),
					_methods = [ "append", "replace", "before", "after" ],
					_method;
				for( var ml = _methods.length, i=0; i < ml; i++ ){
					if( _self.is( "[data-" + _methods[ i ] + "]" ) ){
						_method = _methods[ i ];
						if( _method === 'replace' ){
							_method += 'With';
						}
					}
				}
				if( window.sessionStorage ){
					if( !sessionStorage.getItem(_self.data('storage')) ){
						if( _self.is('[data-scrolloffset]') ){
							if( _self.data('scrolloffset') == '' ){
								_self.data('scrolloffset', _this.options.defaultOffset );
							}
							_this.scrollHandle.push( _self );
						}else{
							_this.callAjaxInclude( _self );
						}
					}else{
						_self[ _method ]( sessionStorage.getItem(_self.data('storage') ) );
                        if( typeof _this.options.callback === 'function' ){
                            _this.options.callback();
                        }
					}
				}
			});
			_this.ajaxIncludeScrollCallback();
		}, // end ajaxInclude()

		// Scroll event callback
		ajaxIncludeScrollCallback : function(){
			var _this = this;
			$(this.scrollHandle).each(function( _idx, _obj ){
				var winTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
				if( (_obj.offset().top - _obj.data('scrolloffset')) < winTop+_this.innerHeight ){
					_this.scrollHandle.splice(_idx, 1);
					_this.callAjaxInclude( _obj );
				}
			});
            
		}, // end ajaxIncludeScrollCallback()

		// Ajax Include Call
		callAjaxInclude : function( _self ){
            var _this = this;
			_self.ajaxInclude();
			_self.on('ajaxInclude', function( el, content ){
				try{
                    if( _self.is('[data-storage]') ){
					    sessionStorage.setItem( _self.data('storage'), content );
                    }
					if( typeof _this.options.callback === 'function' ){
                        _this.options.callback();
                    }
				}catch( e ){
					sessionStorage.clear();
					window.location.href = window.location.href;
				}
			});
		} // end callAjaxInclude()
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName,
				new ExtendAjaxInclude( this, options ));
			}
		});
	};

})( jQuery, window, document );
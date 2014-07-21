/**
 * ExtendAjaxInclude v. 0.2.0
 * Dependencies: ajaxInclude()
 * © 2014 - Gerhard Kanzler (elements.at)
 **/
;(function ( $, window, document, undefined ) {

	var pluginName = "extendAjaxInclude",
		defaults = {
			defaultOffset: 500,
			ttl : 60000
		};

	function ExtendAjaxInclude( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;
		
		window.ttl = new Array();
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
			
			// Add default Timeout
			if( tpeof window.ttlHandle != 'undefined' ){
				window.ttlHandle = setInterval(function(){
					var i = 0,
						inLen = window.ttl.length;
						nowTime = new Date();
					for( i; i < inLen; i++ ){
						if( window.ttl[i][0] <= nowTime.getTime() ){
							_self.ajaxInclude( window.ttl[i][1] );
							window.ttl.splice(i, 1);
						}
					}
				}, this.options.ttl);
            }
            
			// Listen to Scroll event
			$(window).on('scroll', function(){
				if( _self.scrollHandle.length ){
					_self.innerHeight = $(window).innerHeight();
					_self.ajaxIncludeScrollCallback();
				}
			});
		},

		// AjaxInclude
		ajaxInclude  : function( _obj ){
			var el = $(this.element);
            if( typeof _obj != 'undefined' ){
                el = $('[data-storage="' + $(_obj[0]).data('storage') + '"]');
            }
			var _this = this;
			el.each(function(){
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
				
                if( _self.is('[data-ttl]') ){
                    var ttl = _self.data('ttl');
                    
                    var myTime = new Date();
                    myTime = myTime.getTime() + ttl;
                    
                    window.ttl.push( [myTime, _self] );
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
						var content = sessionStorage.getItem(_self.data('storage') );

                        if( _method === 'replaceWith' ) {
                            _self['after']( content );
                            _self.trigger( "ajaxInclude", [ content ] );
                            _self.remove();
                        } else {
                            _self[ _method ]( content );
                            _self.trigger( "ajaxInclude", [ content ] );
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

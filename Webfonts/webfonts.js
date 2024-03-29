(function () {
    "use strict";
    // once cached, the css file is stored on the client forever unless
    // the URL below is changed. Any change will invalidate the cache

    function getBrowser() {
        var myAgent = navigator.userAgent.toLowerCase();
        if( myAgent.indexOf('msie') != -1 && parseInt(myAgent.split('msie')[1]) == 8 ){
            return 'ie8';
        }else if( myAgent.indexOf('webkit') != -1 ){
            return 'webkit';
        }else{
            return 'default';
        }
    }

    var css_href = '/static/css/fonts/web-font-' + getBrowser() + '.css';
    // a simple event handler wrapper
    function on(el, ev, callback) {
        if ( el.addEventListener ) {
            el.addEventListener(ev, callback, false);
        } else if ( el.attachEvent ) {
            el.attachEvent("on" + ev, callback);
        }
    }

    // if we have the fonts in sessionStorage or if we've cached them using the native browser cache    
    if ( (window.sessionStorage && sessionStorage.font_css_cache) || document.cookie.indexOf('font_css_cache') > -1 ) {
        // just use the cached version
        injectFontsStylesheet();
    } else {
        // otherwise, don't block the loading of the page; wait until it's done.
        on(window, "load", injectFontsStylesheet);
    }
    
    // quick way to determine whether a css file has been cached locally
    function fileIsCached(href) {
        return window.sessionStorage && sessionStorage.font_css_cache && (sessionStorage.font_css_cache_file === href);
    }

    // time to get the actual css file
    function injectFontsStylesheet() {
        // if this is an older browser
        if ( !window.sessionStorage || !window.XMLHttpRequest ) {
            var stylesheet = document.createElement('link');
            stylesheet.href = css_href;
            stylesheet.rel = 'stylesheet';
            stylesheet.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(stylesheet);
            // just use the native browser cache
            // this requires a good expires header on the server
            document.cookie = "font_css_cache";

            // if this isn't an old browser
        } else {
            // use the cached version if we already have it
            if ( fileIsCached(css_href) ) {
                injectRawStyle(sessionStorage.font_css_cache);
                // otherwise, load it with ajax
            } else {
                $.ajax( css_href ).done(function(responseText) {
                    // once we have the content, quickly inject the css rules
                    injectRawStyle(responseText);
                    // and cache the text content for further use
                    // notice that this overwrites anything that might have already been previously cached
                    sessionStorage.font_css_cache = responseText;
                    sessionStorage.font_css_cache_file = css_href;
                });
            }
        }
    }

    // this is the simple utitily that injects the cached or loaded css text
    function injectRawStyle(text) {
        var style = $(['<style>', text,'</style>'].join(''));
        document.getElementsByTagName('head')[0].appendChild(style[0]);
    }

}());

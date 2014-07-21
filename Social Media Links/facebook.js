$('html').attr('xmlns:fb', 'http://www.facebook.com/2008/fbml');
$('html').attr('xmlns:og', 'http://opengraphprotocol.org/schema/');

var cache = $.ajaxSettings.cache,
    langCode;
$.ajaxSettings.cache = true;

// Define a var lang = 'LANGUAGE'; before this code
switch (lang) {
    case 'de':
        langCode = 'de_DE';
        break;
    case 'it':
        langCode = 'it_IT';
        break;
    case 'fr':
        langCode = 'fr_FR';
        break;
    case 'es':
        langCode = 'es_ES';
        break;
    case 'ru':
        langCode = 'ru_RU';
        break;
    case 'pl':
        langCode = 'pl_PL';
        break;
    case 'cs':
        langCode = 'cs_CZ';
        break;
    case 'cz':
        langCode = 'cs_CZ';
        break;
    case 'nl':
        langCode = 'nl_NL';
        break;
    default:
        langCode = 'en_US';
        break;
}
$.getScript('http://connect.facebook.net/' + langCode + '/all.js', function() {
    FB.init({
        status: true,
        cookie: true,
        xfbml: true
    });
});
$.ajaxSettings.cache = cache;

// edit the #socialmedia where you would like to add the Button (class or id)
// Feel free to edit the URL Params like load Faces, breite, höhe, colorsheme, font, layout...
$('#socialmedia').append('<div id="fb-root"><fb:like href="' + window.location.href + '" layout="button_count" show_faces="false" width="450" height="35" action="like" colorscheme="light" font="trebuchet ms" allowTransparency="true"></fb:like></div>');
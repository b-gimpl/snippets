// Please define a language Variable like this: var lang = 'en';
$('#socialmedia').append('<a href="http://twitter.com/share" class="twitter-share-button" data-lang="' + lang + '">Tweet</a>');
! function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, 'script', 'twitter-wjs');
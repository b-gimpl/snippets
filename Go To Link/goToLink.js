function goToLink( selektor ){
    function isClickable( obj ){
        var $this = obj,
            link = $this.find('a:first'),
            href = link.attr('href'),
            target = link.attr('target');
        if( target == '_blank' ){
            window.open( href );
        }else{
            window.location.href = href;
        }
    }
    $(selektor).find('a:first').on('click', function(){
        isClickable( $(this).parents( selektor + ':first' ) );
        return false;
    });
    $(selektor).on('click', function(){
        isClickable( $(this) );
    });
}
 
//Edit here the Selector if you need
goToLink( '.is-clickable' );
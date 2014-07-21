var parsleyOptions = {
	successClass: 'has-success',
	errorClass: 'has-error',
	classHandler : function( _el ){
		return _el.$element.closest('.form-group');
	}
};
 
$('#form-id').parsley( parsleyOptions );
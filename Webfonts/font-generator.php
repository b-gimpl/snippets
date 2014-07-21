<?php
$filePath = realpath(dirname(__FILE__));


$fontNamePrefix = 'web-font-';
$fontArray = [
	'fontName' => '/static/fonts/font-name', //without file ending!
];

// all File endings to use
$fontFileEndings = [
	'ie8' => 'eot',
    'webkit' => 'svg',
    'default' => 'woff'
];

foreach( $fontFileEndings as $endKey => $ending ){

	$data = [];
	$fontFormat = '';
	if( $endKey == 'webkit'){
		$fontFormat = "format('svg')";
	}elseif( $endKey == 'default' ){
		$fontFormat = "format('woff')";
	}
	foreach( $fontArray as $fontName => $fontPath ){
		if( $endKey == 'ie8' ){
		$data[] = "
@font-face {
    font-family: '" . $fontName . "';
    src: url('". $fontPath .".". $ending ."') " . $fontFormat . ";
    font-weight: normal;
    font-style: normal;
}
			";
		}elseif($endKey == 'webkit'){
			$base64Font = base64_encode( file_get_contents( $filePath . '/../../../' . $fontPath . '.svg' ) );
			$data[] = "
@font-face {
    font-family: '" . $fontName . "';
    src: url(data:application/x-font-svg;charset=utf-8;base64,". $base64Font .") " . $fontFormat . ";
    font-weight: normal;
    font-style: normal;
}
			";
		}else{
			$base64Font = base64_encode( file_get_contents( $filePath . '/../../../' . $fontPath . '.woff' ) );
			$data[] = "
@font-face {
    font-family: '" . $fontName . "';
    src: url(data:application/x-font-woff;charset=utf-8;base64,". $base64Font .") " . $fontFormat . ";
    font-weight: normal;
    font-style: normal;
}
			";
		}
	}

	file_put_contents( $filePath . '/' . $fontNamePrefix . $endKey .'.css', $data );
}
?>
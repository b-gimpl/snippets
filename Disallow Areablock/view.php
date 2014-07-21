<?php
$areas = array_keys(Pimcore_ExtensionManager::getBrickConfigs());
$bricks = [];
foreach( $areas as $a ){
	if( strstr($a, 'portal_') === false ){
		$bricks[] = $a;
	}
}
 
 
echo $this->areablock('content', [
	'allowed' => $bricks
]);
?>
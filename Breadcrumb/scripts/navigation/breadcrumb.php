<?php
/*
Folder: /views/scripts/navigation/breadcrumb.php
*/
	$navigation = $this->pimcoreNavigation()->getNavigation($this->document, $this->languageRoot);
 
	if( $this->placeholder('addBreadcrumb') != '' ){
		$breadcrumbs = $this->placeholder('addBreadcrumb');
		foreach( $breadcrumbs as $breadcrumb ){
			$parentPage = $navigation->findBy('id', $breadcrumb['parentId']);
			$parentPage->addPage(Zend_Navigation_Page::factory([
				'uri' => $breadcrumb['url'] != '' ? $breadcrumb['url'] : '',
				'label' => $breadcrumb['label'],
				"active" => true
			]));
		}
	}
 
 
	$this->navigation()->menu()->setUseTranslator(false);
	$this->navigation($navigation);
 
?>
 
<nav class="breadcrumbs row">
 
	<div class="col-xs-6">
 
		<ol class="breadcrumb">
			<?= $this->navigation()->breadcrumbs()->setMinDepth(null)->setPartial("/navigation/partials/breadcrumb.php") ?>
		</ol>
 
	</div>
 
</nav>
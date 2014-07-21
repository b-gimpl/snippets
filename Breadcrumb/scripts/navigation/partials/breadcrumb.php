<?php
/*
Folder: /views/scripts/navigation/partials/breadcrumb.php
*/
?>
<?php foreach($this->pages as $pagekey => $page) {
	$active = false;
	if( $pagekey >= count($this->pages) - 1 ){
		$active = true;
	}
	?>
	<li class="<?= $active ? 'active' : '' ?>" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
		<?php if($pagekey >= count($this->pages) - 1) { ?>
			<?= $page->getLabel() ?>
		<?php } else { ?>
			<a itemprop="url" href="<?= $page->getUri() ?>">
				<span itemprop="title"><?= $page->getLabel() ?></span>
			</a>
		<?php } ?>
	</li>
<?php } ?>
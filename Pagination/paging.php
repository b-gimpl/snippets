<?php/*
path: /includes/paging.php
*/?>
<?php if($this->pageCount > 1){ ?>
<div class="row paging-row">
	<div class="col-xs-4">
		<?= $this->totalItemCount ?> <?= $this->translate('paging.ergebnisse') ?>
	</div>
 
	<div class="col-xs-8 text-right">
		<ul class="pagination">
 
		<?php if (isset($this->previous)){ ?>
		    <li><a href="<?= $this->url(array('page' => $this->previous)); ?>" rel="prev"><span class="icon-arrow-left"></span></a></li>
		<?php } else { ?>
		    <li class="disabled"><a href="#"><span class="icon-arrow-left"></span></a></li>
		<?php } ?>
 
		<?php foreach ($this->pagesInRange as $page){ ?>
		    <?php if ($page != $this->current){ ?>
		        <li><a href="<?= $this->url(array('page' => $page)); ?>"><?= $page; ?></a></li>
		    <?php } else { ?>
		        <li class="active"><a href=""><?= $page; ?> <span class="sr-only">(current)</span></a></li>
		    <?php } ?>
		<?php } ?>
 
		<?php if (isset($this->next)){ ?>
		    <li><a href="<?= $this->url(array('page' => $this->next)); ?>" rel="next"><span class="icon-arrow-right"></span></a></li>
		<?php } else{ ?>
		    <li class="disabled"><a href="#"><span class="icon-arrow-right"></span></a></li>
		<?php } ?>
 
		</ul>
	</div>
</div>
<?php } ?>
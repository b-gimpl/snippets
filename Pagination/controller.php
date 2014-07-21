<?php
 
$paginator = Zend_Paginator::factory( $objectList );
$paginator->setCurrentPageNumber( intval($this->getParam('page')) );
$paginator->setPageRange( 5 );
$paginator->setItemCountPerPage( 10 );
$this->view->objList = $paginator;
 
?>
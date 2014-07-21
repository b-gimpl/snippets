<?php
/*
Folder: /controllers/NavigationController.php
*/
class NavigationController extends Website_Controller_Action {
 
 
	public function breadcrumbAction () {
		$this->view->document = $this->getParam("document");
		$this->view->languageRoot = $this->getParam("languageRoot");
	}
 
	
}
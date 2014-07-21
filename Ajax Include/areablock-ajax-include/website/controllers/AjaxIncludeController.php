<?php 
class AjaxIncludeController extends Website_Controller_Action {
 
    public function areaAction () {
 
        $document = Document::getById($this->getParam("document"));
        $areaName = $this->getParam("area");
        $index = $this->getParam("index");
 
        if($document) {
            $this->setDocument($document);
            $this->view->areaName = $areaName;
            $this->view->index = $index;
        }
 
    }
}
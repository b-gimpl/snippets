<?php

$object = Object_Abstract::getById(intval($this->getParam('id')));
if( !$object || ( !$object->getO_Published() && !$this->editmode && !$this->getParam('pimcore_object_preview') && !$_COOKIE['pimcore_admin_sid'] ) ) {
    throw new Zend_Controller_Router_Exception("the requested object doesn't exist anymore");
}

?>
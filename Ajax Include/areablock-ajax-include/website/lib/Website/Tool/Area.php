<?php
class Website_Tool_Area {
 
	public static function ajaxInclude($el, $position = "after", $attributes = []) {
 
        $controller = "ajax-include";
        $action = "area";
 
        if($el->editmode) {
            return false;
        }
 
        if($el->getParam("ajaxInclude")) {
            return false;
        }
 
        if(!in_array($position, ["after", "before", "append", "replace"])) {
            $position = "after";
        }
 
        $attr = [];
        foreach($attributes as $key => $value) {
            //only include attributes with characters a-z and dashes in their name.
            if(preg_match("/^[a-z-]+$/i", $key)) {
                $attr[$key] = $key . '="' . htmlspecialchars($value) . '"';
            }
        }
 
        $url = "/?controller=" . $controller . "&action=" . $action . "&ajaxInclude=true&document=" . $el->document->getId() . "&area=" . $el->brick->getName() . "&index=" . $el->brick->getIndex();
		if( $el->getParam('link') != '' ){
            $html = '<a href="' . $el->getParam('link') . '" data-' . $position . '="' . $url . '" ' . implode(" ", $attr) . '></a>';
		}else{
			$html = '<div data-' . $position . '="' . $url . '" ' . implode(" ", $attr) . '></div>';
		}
 
        echo $html;
 
        return true;
    }
 
	public static function getStorageKey( $el ){
		$keyName = $el->document->getId() . '-' . $el->brick->getId() .'_'. $el->getIndex() . '-' . $el->document->getModificationDate();
        return $keyName;
	}
 
}
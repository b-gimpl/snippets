<?php

class Website_View_Helper_ElementsHeadMeta extends Zend_View_Helper_Placeholder_Container_Standalone
{
    private $built;

    public function elementsHeadMeta()
    {
        return $this;
    }


    public function resetMeta()
    {
        $this->built = false;
    }

    /**
     * set's property "built" to true,
     * use this method if metaDescription is set in headMeta before
     * (e.g. deskline)
     */
    public function setMetaDescriptionIsSet()
    {
        $this->built = true;

    }

    private function getStringAsOneLine($string)
    {
        $string = str_replace("\r\n", " ", $string);
        $string = str_replace("\n", " ", $string);
        $string = str_replace("\r", " ", $string);
        $string = str_replace("\t", "", $string);
        $string = preg_replace('#[ ]+#', ' ', $string);
        return $string;
    }

    private function getMetaDescription($string, $length)
    {
        $string = $this->getStringAsOneLine(strip_tags($string));
        if ($length < strlen($string)) {
            $text = substr($string, 0, $length);
            if (false !== ($length = strrpos($text, ' '))) {
                $text = substr($text, 0, $length);
            }
            $string = $text;
        }
        return $string;
    }

    public function toString()
    {
        if (!$this->built) {
            $this->setHeadMeta();
        }
        return (string)$this->view->headMeta();
    }
    
        public function setFirstContent($content)
    {
        if (!$this->metaDescriptionFromContent && $content) {
            $this->metaDescriptionFromContent = $content;
        }

    }


    private function setHeadMeta()
    {
        $this->view->set_metadescription = true;

        if ($this->view->getProperty('seo_description_characters_length')) {
            $desclength = $this->view->getProperty('seo_description_characters_length');
        }
        elseif ($this->view->document->getDescription()) {
            $desclength = 10000;
        }
        else {
            $desclength = 155;
        }

        if ($this->view->document->getDescription() and $this->view->set_metadescription) {
            $metadescription = $this->getMetaDescription($this->view->document->getDescription(), $desclength);
            $this->view->set_metadescription = false;
        }

        if ($this->view->placeholder('object_seodescription') != "") {
            $metadescription = $this->view->placeholder('object_seodescription');
            $this->view->set_metadescription = false;
        }


        if ($this->view->set_metadescription) {

            foreach ($this->view->document->getElements() as $e) {
                if ($e instanceof Document_Tag_Wysiwyg) {
                    $metadescription = $e->getValue();
                    if($e->getValue() != ''){
                        break;
                    }
                }
            }
        }

        $this->view->headMeta()->appendName('description', $this->getMetaDescription($metadescription, $desclength));
        $this->built = true;
    }
}
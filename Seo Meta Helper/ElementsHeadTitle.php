<?php

class Website_View_Helper_ElementsHeadTitle extends Zend_View_Helper_Placeholder_Container_Standalone
{
    private $built;

    protected $title;

    public function elementsHeadTitle()
    {
        return $this;
    }


    public function resetMeta()
    {
        $this->built = false;
    }

    /**
     * set's property "built" to true,
     * use this method if metaTitle is set in headTitle before
     * (e.g. deskline)
     */
    public function setMetaTitleIsSet()
    {
        $this->built = true;

    }

    private function getSmartTitle($headTitle, $length)
    {
        $smarttitle = strip_tags(htmlspecialchars_decode($headTitle));
        return $this->cutStringRespectingWhitespace($smarttitle, $length);
    }

    private function cutStringRespectingWhitespace($string, $length)
    {
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
            $this->setHeadTitle();
        }
        return (string)$this->view->headTitle();
    }

    public function setTitle($title)
    {
        if (!$this->title) {
            $this->title = $title;
        }
    }

    private function setHeadTitle()
    {
        $this->view->set_metatitle = true;

        $crop = false;
        $this->view->set_metatitle = true;

        // add title (Docuemnt Title)
        if ($this->view->document instanceof Document) {
            if ($this->view->document->getTitle()) {
                $this->view->headTitle($this->view->document->getTitle());
                $this->view->set_metatitle = false;
            }
        }

        $headline = "";
        if($this->view->document) {
            $headlineElement = $this->view->document->getElement("headline");
            if($headlineElement instanceof Document_Tag_Textarea || $headlineElement instanceof Document_Tag_Input) {
                $headline = $headlineElement->getData();
            }
        }

        if ($this->title) {
            $headline = $this->title;
        }


        if ($this->view->getProperty('seo_suffix')) {
            $l = strlen($headline) + strlen($this->view->getProperty("seo_suffix"));
            if ($l > 59) {
                $crop = 60;
            }
        }
        else {
            $l = strlen($headline) + strlen($this->view->translate("seo_title"));
            if ($l > 59) {
                $crop = 60;
            }
        }


        // for default content-pages
        if ($this->view->set_metatitle) {
            if ($headline) {
                if ($crop) {
                    $this->view->headTitle($this->getSmartTitle($headline . ' ' . $this->view->getProperty('seo_separator') . ' ' . $this->view->getProperty('seo_suffix'), $crop));
                }
                else {
                    $this->view->headTitle($headline);
                }
                if (!$this->view->getProperty('seo_title_suffix_disable')) {
                    $this->view->headTitle()->setSeparator(' ' . $this->view->getProperty('seo_separator') . ' ');
                    if ($this->view->getProperty('seo_suffix')) {
                        if (!$crop) {
                            $this->view->headTitle($this->view->getProperty('seo_suffix'));
                        }
                    }
                    else {
                        if (!$crop) {
                            $this->view->headTitle($this->view->translate("seo_title"));
                        }
                    }
                }
            }
        }


        if (!$this->view->metaTitleSet) {

            if($this->view->getProperty('seo_title_characters_length') != ""){
                $crop = $this->view->getProperty('seo_title_characters_length');
            } else {
                $crop = 60;
            }


            // override title in object detail view
            if ($this->view->placeholder('object_seotitle') != "") {

                if ($this->view->getProperty('seo_suffix')) {

                    $tempt = $this->getSmartTitle($this->view->placeholder('object_seotitle') . ' ' . $this->view->getProperty('seo_separator') . ' ' . $this->view->getProperty('seo_suffix'), $crop);
                    $this->view->headTitle($tempt, 'SET');

                } else {
                    $this->view->headTitle($this->view->placeholder('object_seotitle'), 'SET');
                }
            }

            if ($this->view->getProperty('seo_title_characters_length')) {
                $this->view->headTitle($this->getSmartTitle($this->view->headTitle(), $this->view->getProperty('seo_title_characters_length')), 'SET');
            }

            $this->view->metaTitleSet = true; //set to true to avoid duplicate meta titles in case elementsHeadMeta() is called twice
        }

        $this->built = true;
    }

}

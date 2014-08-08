<?php
// Save under: /website/lib/Website/View/Helper/JsConfig.php
class Website_View_Helper_JsConfig extends Zend_View_Helper_Abstract{

    protected static $config = [];

    protected $jsVariableName = "jsConf";

    public function jsConfig ($jsVariableName = null) {

        if($jsVariableName) {
            $this->jsVariableName = $jsVariableName;
        }

        return $this;
    }

    public function add($key, $value = '') {
        if(is_array($key)) {
            self::$config = array_merge(self::$config, $key);
        } else {
            self::$config[$key] = $value;
        }
    }

    public function __toString() {
		$config = "<script>\n";
        $config .= "\tvar " . $this->jsVariableName . " = " . json_encode(self::$config ) . ";";
        $config .= "\n";
        $config .= "</script>\n";

        return $config;
    }

}

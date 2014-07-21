Default Master Document Tree is 'de'

Under "Settings->Website" you need Property's for any Language:

noPage_de => document

This Pages are Links if there is no document available for DE or any other Language

(If you don't have master Documents use the Property "masterProperty")

in the Layout or Template or ... use:

```
<?php
echo $this->action("language-navigation", "navigation", null, [
	'documentId' => $this->document->id, //need always the Document_Page ID
	'lang' => array('de', 'en', 'it', 'fr'), //add Languages to this array,
	'objId' => $this->getParam('id') // if there is an object Detail page ...
	)];
?>
```
<?php /*
 
BEISPIEL AREA
 
In dieser Beispiel Area wird der Inhalt nur per XHR geladen wenn sich die Area NACH der 3. Position befindet (also weiter unten)
 
*/ ?>
 
<?php if($this->getIndex() > 2 && !Website_Tool_Area::ajaxInclude($this)) { ?>
    <section class="area-wysiwyg">
        <?= $this->wysiwyg("content"); ?>
    </section>
<?php } ?>
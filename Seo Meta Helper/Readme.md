# Readme #
Vordefinierte Eigenschaften
- seo_suffix (Hier kann der Standard SEO Title überschrieben werden)
- seo_title_suffix_disable (Entfernt den Suffix)
- seo_title_characters_length (Zeichenbeschränkung im Title)
- seo_description_characters_length (Zeichenbeschränkung in der Beschreibung)
- seo_separator SEO Trennzeichen

 
**Translation Key**
seo_title (Standard SEO Title)

## Einbindung ##
Falls noch nicht im **Website_Controller_Action** in der **init()** folgende Zeile einfügen.
```
$this->view->addHelperPath(PIMCORE_WEBSITE_PATH . "/lib/Website/View/Helper","Website_View_Helper_");
```

Die beiden Dateien werden nach **/website/lib/Website/View/Helper** kopiert
Im Head wird das ganze aufgerufen
```
<?php
    if( ! $this->editmode && $this->document instanceof Document_Page ){ 
        echo $this->elementsHeadTitle();
        echo $this->elementsHeadMeta();
    } 
?>
```
## Einbindung in der Area WYSIWYG ##
```
<?= $this->elementsHeadMeta()->setDescription($this->wysiwyg("content")->getData()) ?>
```

## Logik zur Generierung der Metadescription ##
* ist die Description im headMeta()-View-Helper schon anderweitig gesetzt worden (kann dem elementsHeadMeta()-Helper per setMetaDescriptionIsSet() mitgeteilt werden) ? Ja => gib headMeta() aus, nein => weiter zu punkt 2
* am Dokument Description gesetzt? ja => verwende diesen, nein => weiter zu 2.
placeholder "object_seodescription" gesetzt? ja => verwende diesen, nein => weiter zu 3.
* metaDescriptionFromContent (per setFirstContent($text) ) gesetzt?  ja => verwende diesen, nein => weiter zu 4.
* Content erster WYSIWYG-Block
 
## Integration in Textblöcken ##
Per default wird, wenn sonst keine Bedingungen zu treffen (siehe oben), der Content des ersten WYSIWYG-Content-Block des Dokuments als meta-Description verwendet. "Erster" bezieht sich jedoch hier auf die Erstellung des Textblocks, nicht auf die Reihenfolge in der Ausgabe! Der MetaDescription-Helper kann gar nicht wissen, welcher Block als erster bzw. überhaupt ausgegeben wird, da das ja erst in der view beim rendern passiert. Um konkret einen content zu setzen, kann daher die Methode setFirstContent() aufgerufen werden  - wenn der metaDescription-Helper noch keinen Text aus dem Content gesetzt 
z.B. in der View der WYSIWYG-.Area: 
```
$this->elementsHeadMeta()->setFirstContent($this->wysiwyg("content")->getValue());
 ```
**Wichtig**
Die H1 bitte mit $this->input("headline") einbinden.
Dieses Input wird für die Titelbefüllung verwendet. 
Placeholder für Objekte
```
$this->placeholder('object_seotitle')->set( $object->getHeadline() );
$this->placeholder('object_seodescription')->set( $object->getDescription() );
 ```
Eigenen Meta Title oder Meta Description verwenden
```
$this->view->metaTitleSet = true;
$this->view->metaDescriptionSet = true;
```

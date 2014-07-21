<?php
 
 
	$document = Document_Page::getById( $this->getParam('documentId') );
 
//p_r( $_SERVER['REQUEST_URI'] ); die();
 
	// $document == document not a folder or something else
	if( $document instanceof Document_Page ){
		$fromProperty = false;
 
		// show if master document is empty
		if( $document->getContentMasterDocument() == '' ){
			$masterDocument = $document;
		}else{
			$masterDocument = $document->getContentMasterDocument();
		}
 
		// If Master Document is from property then load the Property
		if( $this->getParam('masterProperty') ){
			if( $this->getParam('masterProperty') instanceof Document_Page ){
				$masterDocument = $this->getParam('masterProperty');
				$fromProperty = true;
			}
 
		}else{
			if( $masterDocument->getId() == $document->getId()  ){
				$fromProperty = false;
			}
		}
 
 
		// add first actuall language
		$languageDocuments = array(
			$this->language => $document->getFullPath()
		);
 
		// Show if Property is override the Master Document
		if( $fromProperty ){
			// Load Master Document and add it to Array
			$languageDocuments[ $masterDocument->getProperty('language') ] = $masterDocument->getFullPath();
			// Load other Languages
			$loadDocuments = Pimcore_Resource_Mysql::get();
 
			$resultDocumentList = $loadDocuments->fetchAll("SELECT * FROM properties WHERE ctype='document' AND name='translationMaster' AND data='" . $masterDocument->getId() . "'");
			foreach( $resultDocumentList as $property ){
				$d = Document::getById( $property['cid'] );
				$languageDocuments[ $d->getProperty('language') ] = $d->getFullPath();
			}
		}else{
			$loadDocuments = Pimcore_Resource_Mysql::get();
			$resultDocumentList = $loadDocuments->fetchAll("SELECT * FROM documents_page WHERE contentMasterDocumentId='" . $masterDocument->getId() . "' OR id = '" . $masterDocument->getId() . "'");
 
			foreach( $resultDocumentList as $docList ){
				$d = Document::getById( $docList['id'] );
				$languageDocuments[ $d->getProperty('language') ] = $d->getFullPath();
			}
		}
 
		$staticRoute = Staticroute::getCurrentRoute();
 
		if( $staticRoute && $this->getParam('objId') != '' ){
			$obj = Object_Abstract::getById( $this->getParam('objId') );
 
			$routename = $staticRoute->name;
 
			if( $routename != '' ){
 
				foreach( $this->getParam('lang') as $lang ){
					if(method_exists($obj, 'getTHeadline')){
						$detailUrls[$lang] = '/' . $this->url( array( 'name' => $obj->getTHeadline($lang), 'id' => $obj->getO_Id() ), $routename );
					} elseif(method_exists($obj, 'getName')){
						$n = $obj->getName('de');
						if( $obj->getName($lang) != '' ){
							$n = $obj->getName($lang);
						}
						$detailUrls[$lang] = '/' . $this->url( array( 'name' => $n, 'id' => $obj->getO_Id() ), $routename );
					} else {
						$detailUrls[$lang] = '';
					}
				}
 
 
			}
		} else {
			$detailUrls[$lang] = '';
		}
 
 
 
		foreach( $this->getParam('lang') as $lang ){
			if( $languageDocuments[$lang] ){
		?>
			<li><a href="<?= $languageDocuments[$lang] ?><?= $detailUrls[$lang] ?>"><?= $this->translate('language.'.$lang) ?></a></li>
		<?php
			}else{
				$pageNoLang = 'noPage_'.$lang;
		?>
			<li><a href="<?= $this->config->$pageNoLang ?><?= $detailUrls[$lang] ?>"><?= $this->translate('language.'.$lang) ?></a></li>
		<?php
			}
		}
 
	}
 
?>
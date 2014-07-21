Load in Layout:

echo $this->action("breadcrumb", "navigation", null, array( 'document' => $this->document, 'languageRoot' => $this->getProperty('languageRoot') //LanguageRoot Property = 'de' or 'en' Document ));

--- If the page is a Object Detail Document (with Static Route) add this Page to Breadcrumbs --- $this->placeholder('addBreadcrumb')->set([ 'parentId' => $this->document->getId(), 'url' => $this->document->getFullPath(), 'label' => $this->event->getName() ]);
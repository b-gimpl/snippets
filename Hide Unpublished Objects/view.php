<?php
//Place this Warning in the frontend. Only a simple help for the user to see this is not yet published (Bootstrap Style)
if( $_COOKIE['pimcore_admin_sid'] && !$this->detailObject->getO_Published() ){ ?>
	<div class="col-xs-12">
		<div>
			<div class="alert alert-danger">
				OBJECT NOT PUBLISHED
			</div>
		</div>
	</div>
<?php } ?>
<?php if($this->editmode){ ?>
 
		Auswahl:
		<?php echo $this->select("mymode",array(
			"store" => array(
				array("myselect", "Länder vorselektierung"),
				array("myauswahl", "Länder auswahl")
			),"reload" => true
		)); ?>
 
		<?php
			$countries = Zend_Locale::getTranslationList('Territory', $this->language, 2);
			asort($countries);
 
			$newcountries = array();
			foreach($countries as $key => $value){
				$newcountries[] = array($value, $value);
			}
		?>
 
		<?php if($this->select("mymode")->text == 'myselect'){ ?>
			<h2>Länder vorselektierung</h2>
			<?php while($this->block("contentblock")->loop()) { ?>
				<?php echo $this->select("mySelect",array(
					"store" => $newcountries,
					"width" => 500
				)); ?>
			<?php } ?>
		<?php } else { ?>
			<h2>Länder auswählen</h2>
			<?php while($this->block("contentblock")->loop()) { ?>
				<?php echo $this->select("mySelect",array(
					"store" => $newcountries,
					"width" => 500
				)); ?>
			<?php } ?>
		<?php } ?>
 
	<?php } else { ?>
 
	<option value="">-- <?= $this->translate('bitte wählen') ?> --</option>
	<?php if($this->select("mymode")->text == 'myselect'){ ?>
		<?php
			$bottomcountries = Zend_Locale::getTranslationList('Territory', $this->language, 2);
			asort($bottomcountries);
			$top = array();
			while($this->block("contentblock")->loop()) {
				$top[] = $this->select("mySelect")->text;
			}
 
			$result = array_diff($bottomcountries, $top);
			$all = array_merge($top, $result);
		?>
 
	<?php } else { ?>
		<?php
			$all = array();
			while($this->block("contentblock")->loop()) {
				$all[] = $this->select("mySelect")->text;
			}
		?>
	<?php } ?>
	<?php foreach ($all as $value){ ?>
		<option value="<?= $value ?>"><?= $value ?></option>
	<?php } ?>
<?php } ?>
JsConfig
======

This Script Creates a simple js Object for config or something.

###Use:
Copy File to:
```
/website/lib/Website/View/Helper/JsConfig.php
```
Layout File:
```php
<?= $this->jsConfig('NAME_OF_OBJECT') ?>
```
In your View/Template/something else:
```php
<?php $this->jsConfig('NAME_OF_OBJECT')->add('myKey', 'myValue'); ?>
```
or as Array:
```php
<?php $this->jsConfig('NAME_OF_OBJECT')->add([
    'myKey' => 'myValue',
    'myKey2' => [
        'keyValue' => 'Value'
    ]
]); ?>
```

#font-generator.php
Edit the variable:
```php
$fontArray = [
	'fontName' => '/static/fonts/font-name', //without file ending!
];
```
then start the script.
Now you have 3 files (one for every browser type)

__ The Font .css files are saved in the same Directory! __

#webfonts.js

edit the path if you need:
```js
var css_href = '/static/css/fonts/web-font-' + getBrowser() + '.css';
```
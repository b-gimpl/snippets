ExtendAjaxInclude
======

Dependencies:
- ajaxInclude.js


###Use:
In your .js file:
```js
$("[data-append],[data-replace],[data-after],[data-before]").extendAjaxInclude();
```
The HTML element:
```html
<div data-scrolloffset="500" data-storage="12-asd" data-replace="index.html">Hello, world!</div>
```

###Options:
```js
$("selector").extendAjaxInclude(function(){
  alert('callback');
});
```
```js
$("selector").extendAjaxInclude({
  defaultOffset: 500, //changes the default offset..
  callback: function(){
    alert('callback');
  }
});
```

###Attributes:

---

__data-scrolloffset="500"__

Default value is __500__ px.
With this attribute wil the content only loaded if there is in viewport (if the offset is reached)

---

__data.storage="ID-MODIFICATION-TIMESTAMP"__

Example:
```php
<?= $this->snippet('snippet')->getId() ?>-<?= $this->snippet('snippet')->getSnippet()->getModificationDate() ?>
```

---
__data-replace="URL"__

Replace the container... like ajaxInclude (same function)
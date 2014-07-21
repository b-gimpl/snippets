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
<div data-scrolloffset="500" data-ttl="80000" data-storage="12-asd" data-replace="index.html">Hello, world!</div>
```
If you use the __data-ttl__ attribute, you need all attributes in the reloaded container again!

###Options:
```js
$("selector").extendAjaxInclude({
  defaultOffset: 500, //changes the default offset..
  ttl: 60000 // 1 minute interval = default interval
});
```
__Callback:__
Same as default ajaxInclude!
After Session Storage include the event "ajaxInclude" would triggered on this element.

###Attributes:

---
__data-ttl="80000"__

Default value is __60000__ = __1 minute__
After 80 sec. would the element reloaded.
__Attention:__
You "need" the __data-storage__ for ttl!

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

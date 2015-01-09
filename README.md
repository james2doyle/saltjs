saltjs
======

salt.js is micro DOM selector library. Minified, it comes in at 255 bytes! (with attribution...)

Here is a [quick video](http://youtu.be/kTA7TNpB9dg) showing it off

### No longer the smallest

It looks like there are a couple ways to do this in even less code...

#### Other versions

Tomasz Żełudziewicz Versions
[version 1](https://gist.github.com/ofca/5575581)
[version 2](https://gist.github.com/ofca/5576459)
[version 3](https://gist.github.com/ofca/5577178)

[Michał Wachowskis fork](https://gist.github.com/Potfur/5576225).

### How it works

It uses an array string to map different queries you pass through it to their native get functions.

```javascript
// get by id
$('#iddiv');
// get by class name
$('.classdiv');
// get by element name
$('@namediv');
// get by element tag name
$('=div');
// get element by query selector
$('*div div.inside');
// getAttribute of name
$('#iddiv').getAttribute('name');
// getAttribute of name from nodelist
$('.classdiv')[0].getAttribute('name');
```

### Fun with Mapping

*WARNING!*

You need to extend native code to produce these functions. This is not recommended. Salt is really a micro selector library not a substitution for jQuery or anything else.

Here are a couple of little things you can do to shorten some syntax.

```javascript
// probably the most useful and allows $('#iddiv').find('.inside')
window.Element.prototype.find = function(selector) {
  return $(selector, this);
};

// doing a find in a NodeList doesnt really work. I had a function that
// would look inside and get the element but it was pretty big and
// required recusive searching inside NodeLists. So I would suggest just
// using a '*' selection method
window.NodeList.prototype.find = function find(elem) {
  console.error('You cannot find in a NodeList. Just use $(*selector %s)', elem);
  return this;
};

// another useful one for doing $('.inside').each()
window.NodeList.prototype.each = Array.prototype.forEach;

// $().attr('prop', 'value') support
window.Element.prototype.attr = function(name, value) {
  if(value) {
    this.setAttribute(name, value);
    return this;
  } else {
    return this.getAttribute(name);
  }
};

window.NodeList.prototype.attr = function(name, value) {
  this.each(function(el) {
    if(value) {
      el.setAttribute(name, value);
    } else {
      return el.getAttribute(name);
    }
  });
  return this;
};

// $().css('prop', 'value') support
window.Element.prototype.css = function(prop, value) {
  if (value) {
    this.style[prop] = value;
    return this;
  } else {
    return this.style[prop];
  }
};

window.NodeList.prototype.css = function(prop, value) {
  this.each(function(el) {
    el.css(prop, value);
  });
  return this;
};

// $().on('event', function(el){});
window.Element.prototype.on = function(eventType, callback) {
  eventType = eventType.split(' ');
  for (var i = 0; i < eventType.length; i++) {
    this.addEventListener(eventType[i], callback);
  }
  return this;
};


window.NodeList.prototype.on = function(eventType, callback){
  this.each(function(el){
    el.on(eventType, callback);
  });
  return this;
};

// $().addClass('name');
window.NodeList.prototype.addClass = function(name){
  this.each(function(el) {
    el.classList.add(name);
  });
  return this;
};

window.Element.prototype.addClass = function(name) {
  this.classList.add(name);
  return this;
};

// $().removeClass('name');
window.NodeList.prototype.removeClass = function(name){
  this.each(function(el) {
    el.classList.remove(name);
  });
  return this;
};

window.Element.prototype.removeClass = function(name) {
  this.classList.add(name);
  return this;
};

window.Element.prototype.hasClass = function(name) {
  // contains? how annoying!
  return this.classList.contains(name);
};

window.NodeList.prototype.first = function() {
  // if this is more than one item return the first
  return (this.length < 2) ? this : this[0];
};

window.NodeList.prototype.last = function() {
  // if there are many items, return the last
  return (this.length > 1) ? this[this.length - 1] : this;
};
```

So you can keep doing this with native commands and get something pretty close to jQuery.

If you used all of those you could turn this:

```javascript
var items = document.getElementById('iddiv').querySelectorAll('.inside');
for (var i = items.length - 1; i >= 0; i--) {
  items[i].setAttribute('name', 'Guy Dude Bro');
}
```

into this:

```javascript
$('#iddiv').find('.inside').each(function(elem){
  elem.attr('name', 'Guy Dude Bro');
});
```

### jsPerf testing

[jsPerf test](http://jsperf.com/micro-selector-libraries)

The reason I don't just use querSelectorAll for everything is because it is slower than the native get commands*.

[See this jsperf test](http://jsperf.com/getelementbyid-vs-queryselector/11)

Yes, I know that this library is slower than native gets, sometimes massively. But the point here is to beat querySelectorAll and it does it's job by that standard.

### I don't like FOO for selecting BAR

Cool. Change it up! You can choose your own mapping methods if you want. Just change the key in the 'matches' object and you are good.

### X returns an array!

That is because you are using a selector that has a live [nodelist](https://developer.mozilla.org/en/docs/DOM/NodeList) collection.


### License

(The MIT License)

Copyright (c) 2015 James Doyle <james2doyle@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

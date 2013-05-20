saltjs
======

slat.js is micro DOM selector library. Minified, it comes in at 263 bytes! (with attribution...)

### No longer the smallest

It looks like there are a couple ways to do this in even less code...

#### Other versions

Tomasz Żełudziewicz Versions
[version 1](https://gist.github.com/ofca/5575581)
[version 2](https://gist.github.com/ofca/5576459)
[version 3](https://gist.github.com/ofca/5577178)

[Michał Wachowskis fork](https://gist.github.com/Potfur/5576225).

### jsPerf testing

[jsPerf test](http://jsperf.com/micro-selector-libraries)

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

The reason I don't just use querSelectorAll for everything is because it is slower than the native get commands*.

[See this jsperf test](http://jsperf.com/getelementbyid-vs-queryselector/11)

Yes, I know that this library is slower than native gets, sometimes massively. But the point here is to beat querySelectorAll and it does it's job by that standard.

### I don't like FOO for selecting BAR

Cool. Change it up! You can choose your own mapping methods if you want. Just change the key in the 'matches' object and you are good.

### X returns an array!

That is because you are using a selector that has a live [nodelist](https://developer.mozilla.org/en/docs/DOM/NodeList) collection.


### License

(The MIT License)

Copyright (c) 2013 James Doyle <james2doyle@gmail.com>

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

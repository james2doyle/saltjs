saltjs
======

slat.js is micro DOM selector library. Minified, it comes in at 263 bytes! (with attribution...)

### No longer the smallest or fastest!!

It looks like there are a couple ways to do this in even less code...

[Tomasz Żełudziewicz smaler version](https://gist.github.com/ofca/5575581) and smaller still is [Michał Wachowskis even smaller version](https://gist.github.com/Potfur/5576225).

### jsPerf testing

I also wrote a [jsPerf test](http://jsperf.com/micro-selector-library-comparison) comparing this lib and the new one by Tomasz. It looks like they are both still slower than
any document.get command...

### How it works

It uses a regular expression to map different queries you pass through it to their native get functions.

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
$('?div div.inside');
// getAttribute of name
$('#iddiv').getAttribute('name');
// getAttribute of name from nodelist
$('.classdiv')[0].getAttribute('name');
```

The reason I don't just use querSelectorAll for everything is because it is slower than the native get commands*.

[See this jsperf test](http://jsperf.com/getelementbyid-vs-queryselector/11)

Yes, I see that the mapping is slower for newer versions of Chrome. But almost every other browser and device is slower using querySelectorAll over the mapping method.

Keep in mind the regex used in that example is **much more complicated than mine**.

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

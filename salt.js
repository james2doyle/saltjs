/*! Salt.js DOM Selector Lib. By @james2doyle */
window.$ = function(selector) {
  // an object containing the matching keys and native get commands
  var matches = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '*': 'querySelectorAll'
  }[selector[0]]; // you can treat a string as an array of characters
  // now pass the target without the key
  var el = (document[matches](selector.slice(1)));
  // if there is one element than return the 0 element
  return ((el.length < 2) ? el[0]: el);
};

// probably the most useful and allows $('#iddiv').find('.inside')
window.Element.prototype.find = window.Element.prototype.querySelectorAll;
// more like recursive search since you cannot use querySelectorAll
// for NodeLists - dumb!
window.NodeList.prototype.find = function(elem) {
  var flatten = function (array) {
    var returnValue = [];
    var temporaryFlatArray;
    for (var i = 0; i < array.length; i++) {
      // if this array has one item
      if (array.length === 1) {
        returnValue.push(array[i]);
      } else {
        temporaryFlatArray = flatten(array[i]);
        for (var j = 0; j < temporaryFlatArray.length; j++) {
          returnValue.push(temporaryFlatArray[j]);
        }
      }
    }
    return returnValue;
  };
  var items = [];
  this.each(function(el){
    items.push(el.find(elem));
  });
  return flatten(items);
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
window.NodeList.prototype.on = function(eventType, callback){
  this.each(function(el){
    el.addEventListener(eventType, callback);
  });
  return this;
};

window.Element.prototype.on = function(eventType, callback) {
  this.addEventListener(eventType, callback);
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
  // contains? how annoying
  return this.classList.contains(name);
};

window.NodeList.prototype.first = function() {
  // if this is more than one item return the first
  return (this.length < 2) ? this : this[0];
};

window.NodeList.prototype.last = function() {
  return this[this.length - 1];
};
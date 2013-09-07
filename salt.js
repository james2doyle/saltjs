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
  return (el.length === 1) ? el[0] : el;
};

// probably the most useful and allows $('#iddiv').find('.inside')
window.Element.prototype.find = window.Element.prototype.querySelectorAll;

// another useful one for doing $('.inside').each()
window.NodeList.prototype.each = Array.prototype.forEach;

// $().attr('prop', 'value') support
window.Element.prototype.attr = function(name, value) {
  if(value) {
    this.setAttribute(name, value);
  } else {
    return this.getAttribute(name);
  }
};

// $().css('prop', 'value') support
window.Element.prototype.css = function(prop, value) {
  if (value) {
    this.style[prop] = value;
  } else {
    return this.style[prop];
  }
};

window.NodeList.prototype.css = function(prop, value) {
  this.each(function(el) {
    el.css(prop, value);
  });
};

// $().on('event', function(el){});
window.NodeList.prototype.on = function(eventType, callback){
  Array.prototype.forEach.call(this, function(el){
    el.addEventListener(eventType, callback);
  });
};

window.Element.prototype.on = function(eventType, callback) {
  this['on'+eventType] = callback.bind(this);
};
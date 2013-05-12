window.$ = function(_s) {
  var m = {
    '#': function(_q) {
      return document.getElementById(_q);
    },
    '.': function(_q) {
      return document.getElementsByClassName(_q);
    },
    '@': function(_q) {
      return document.getElementsByName(_q);
    },
    '=': function(_q) {
      return document.getElementsByTagName(_q);
    },
    '*': function(_q) {
      return document.querySelectorAll(_q);
    }
  };
  var t = /[=#@.*]/.exec(_s)[0];
  return [m[t](_s.split(t)[1])][0];
};
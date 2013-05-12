/*! Salt.js DOM Selector Lib. By @james2doyle */
window.$ = function(_s) {
  var m = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '*': 'querySelectorAll'
  };
  var t = /[=#@.*]/.exec(_s)[0];
  return (document[m[t]](_s.split(t)[1]));
};
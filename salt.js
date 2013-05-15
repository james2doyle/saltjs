/*! Salt.js DOM Selector Lib. By @james2doyle */
window.$ = function(selector) {
  // an object containing the matching keys and native get commands
  var matches = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '*': 'querySelectorAll'
  }[/[=#@.*]/.exec(selector)[0]];
  // regex function to split the command with the target
  // so $('#iddiv') would return '#'
  // m[t] returns the command. use that in the document object
  // now pass the target without the match key
  return (document[matches](selector.slice(1)));
};
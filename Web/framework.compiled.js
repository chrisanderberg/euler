'use strict';

// Convert the hash url into an array of strings
window.urlToArr = function (url) {
  // remove the leading forward slash if it exists to avoid empty string
  if (url.length > 0 && url[0] == '/') url = url.slice(1);
  // remove the trailing forward slash if it exists to avoid empty string
  if (url.length > 0 && url[url.length - 1] == '/') url = url.slice(0, -1);

  // split the url by forward slashes and url decode each of the strings
  return url == '' ? [] : url.split('/').map(decodeURIComponent);
};

// convert an array of strings into url form for the hash
window.arrToUrl = function (arr) {
  return arr.length > 0 ? '/' + arr.map(encodeURIComponent).join('/') + '/' : '/';
};

// take an array of strings, update the url hash, and re-render
window.setParams = function (arr) {
  var suppressRender = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  window.location.hash = '#' + window.arrToUrl(arr);
  window.params = arr;
  // only render if not suppressed
  if (!suppressRender) window.render();
};

// Use the hash portion of the url to generate an array of strings to pass as parameters.
window.getParamsFromHash = function () {
  return window.location.hash ? window.urlToArr(window.location.hash.slice(1)) : [];
};

// Get the current parameters to the "Main" component.
// Rendering must be suppressed since the render function calls this function.
// If rendering was not suppressed,
// the function calls would never end due to mutual recursion with no base case.
window.getParams = function () {
  if (!window.params) {
    // define parameters for the "Main" component if none are defined yet
    if (window.location.hash) {
      // use the hash to set the parameters, suppress rendering
      window.setParams(window.getParamsFromHash(), true);
    } else {
      // If there is no hash in the url, use the default params (or empty array).
      window.setParams(window.defaultParams || [], true);
    }
  }
  return window.params;
};

// whenever the hash changes, the parameters need to be set to the new values
$(window).on('hashchange', function () {
  // set the new parameters, triggering the "Main" component to re-render
  window.setParams(window.getParamsFromHash());
});

// render the "Main" component, which is the root component for all other components
window.render = function () {
  ReactDOM.render(React.createElement(Main, { params: window.getParams() }), document.getElementById('main'));
};

// on page load, render the "Main" component
window.render();

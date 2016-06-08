'use strict';

(function () {
  // Convert the hash url into an array of strings
  function urlToArr(url) {
    // remove the leading forward slash if it exists to avoid empty string
    if (url.length > 0 && url[0] == '/') url = url.slice(1);
    // remove the trailing forward slash if it exists to avoid empty string
    if (url.length > 0 && url[url.length - 1] == '/') url = url.slice(0, -1);

    // split the url by forward slashes and url decode each of the strings
    return url == '' ? [] : url.split('/').map(decodeURIComponent);
  }

  // convert an array of strings into url form for the hash
  function arrToUrl(arr) {
    return arr.length > 0 ? '/' + arr.map(encodeURIComponent).join('/') + '/' : '/';
  }

  // Use the hash portion of the url to generate an array of strings to pass as parameters.
  function getParamsFromHash() {
    return window.location.hash ? urlToArr(window.location.hash.slice(1)) : [];
  }

  // Use the hash to get the params, or use the default params if the hash doesn't exist,
  // or just return an empty array of params if neither exists.
  function getParams() {
    // determine the params
    var params = window.location.hash ? getParamsFromHash() : window.defaultParams || [];

    // set the hash in case it wasn't normalized, or not set at all
    window.location.hash = '#' + arrToUrl(params);

    // return params
    return params;
  }

  // render the "Main" component, which is the root component for all other components
  function render() {
    ReactDOM.render(React.createElement(Main, { params: getParams() }), document.getElementById('main'));
  }

  // whenever the hash changes, render
  $(window).on('hashchange', function () {
    render();
  });

  // on page load, render the "Main" component
  render();
})();

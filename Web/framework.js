window.urlToArr = function(url) {
  if(url.length > 0 && url[0] == '/') url = url.slice(1);
  if(url.length > 0 && url[url.length - 1] == '/') url = url.slice(0, -1);
  return url.split('/').map(decodeURIComponent);
}

window.arrToUrl = function(arr) {
  return arr.length > 0 ? '/' + arr.map(encodeURIComponent).join('/') + '/' : '/';
}

window.setParams = function(arr, suppressRender = false) {
  window.location.hash = '#' + window.arrToUrl(arr);
  window.params = arr;
  if(!suppressRender) window.render();
}

window.getParamsFromHash = function() {
  return window.location.hash ? window.urlToArr(window.location.hash.slice(1)) : [];
}

window.getParams = function() {
  if(!window.params) {
    if(window.location.hash) {
      window.setParams(window.getParamsFromHash(), true);
    } else {
      window.setParams(window.defaultParams || [], true);
    }
  }
  return window.params;
}

$(window).on('hashchange', function() {
  window.setParams(window.getParamsFromHash());
});

window.render = function() {
  ReactDOM.render(
    <Main params={window.getParams()} />,
    document.getElementById('main')
  );
}

window.render();

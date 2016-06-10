(function() {
  // Convert the url hash into an array of strings
  function hashToArr(hash) {
    // remove the leading hash symbol if it exists
    if(hash.length > 0 && hash[0] == '#') hash = hash.slice(1);
    // remove the leading forward slash if it exists to avoid empty string
    if(hash.length > 0 && hash[0] == '/') hash = hash.slice(1);
    // remove the trailing forward slash if it exists to avoid empty string
    if(hash.length > 0 && hash[hash.length - 1] == '/') hash = hash.slice(0, -1);

    // split the url hash by forward slashes and url decode each of the strings
    return hash == '' ? [] : hash.split('/').map(decodeURIComponent);
  }

  // convert an array of strings into url hash form for the hash
  function arrToHash(arr) {
    return arr.length > 0 ? '#/' + arr.map(encodeURIComponent).join('/') + '/' : '#/';
  }

  // given an url hash, make sure it's normalized, aka properly formatted
  function normalizeHash(hash) {
    return arrToHash(hashToArr(hash));
  }

  // Use the hash portion of the url to generate an array of strings to pass as parameters.
  function getParamsFromHash() {
    return window.location.hash ? hashToArr(window.location.hash.slice(1)) : [];
  }

  // Use the hash to get the params, or use the default params if the hash doesn't exist,
  // or just return an empty array of params if neither exists.
  function getParams() {
    // determine the params
    let params = window.location.hash ? getParamsFromHash() : (window.defaultParams || []);

    // set the hash in case it wasn't normalized, or not set at all
    window.location.hash = arrToHash(params);

    // return params
    return params;
  }

  // render the "Main" component, which is the root component for all other components
  function render() {
    console.log('render');
    ReactDOM.render(
      <Main params={getParams()} />,
      document.getElementById('main')
    );
  }

  // set the default hash and default parameters, preferring to use the hash if available
  window.defaultParams = window.defaultHash ? hashToArr(window.defaultHash) : window.defaultParams || [];
  window.defaultHash = arrToHash(window.defaultParams);

  // make some useful functions available globally
  window.hashToArr = hashToArr;
  window.arrToHash = arrToHash;
  window.normalizeHash = normalizeHash;

  // initialize the undo/redo stack
  let undoRedoStack = [arrToHash(getParams())];
  let undoRedoStackIndex = 0;

  // enable or disable undo and redo buttons, depending on state of undo/redo stack
  function enableDisableButtons() {
    // can't make any undos when viewing first item
    if(undoRedoStackIndex == 0) {
      $('.ui-undo').addClass('disabled');
    } else {
      $('.ui-undo').removeClass('disabled');
    }

    // can't make any redos when viewing last item
    if(undoRedoStackIndex == undoRedoStack.length - 1) {
      $('.ui-redo').addClass('disabled');
    } else {
      $('.ui-redo').removeClass('disabled');
    }
  }

  // whenever the hash changes, render
  $(window).on('hashchange', function() {
    if(window.location.hash != normalizeHash(window.location.hash)) {
      window.location.hash = normalizeHash(window.location.hash);
      return;
    }

    // update the undo/redo stack if the hash is different than the stack
    if(window.location.hash != undoRedoStack[undoRedoStackIndex]) {
      undoRedoStackIndex += 1;
      // only change the stack if the change isn't already the next item
      if(undoRedoStack.length == undoRedoStackIndex || undoRedoStack[undoRedoStackIndex] != window.location.hash) {
        undoRedoStack.splice(undoRedoStackIndex);
        undoRedoStack.push(window.location.hash);
      }
      // update the enabled/disabled status of the undo/redo buttons
      enableDisableButtons();
    }

    // with the hash and stack properly updated, render
    render();
  });

  // handle clicks on the undo button
  $('.ui-undo').on('click', function(e) {
    // only undo if the stack allows
    if(undoRedoStackIndex != 0) {
      console.log('undo');

      // update the stack
      undoRedoStackIndex -= 1;
      window.location.hash = undoRedoStack[undoRedoStackIndex];

      // update the enabled/disabled status of the undo/redo buttons
      enableDisableButtons();
    }

    // prevent adding a '?' causing empty query params by returning false
    return false;
  });

  // handle clicks on the redo button
  $('.ui-redo').on('click', function(e) {
    // only redo if the stack allows
    if(undoRedoStackIndex != undoRedoStack.length - 1) {
      console.log('redo');

      // update the stack
      undoRedoStackIndex += 1;
      window.location.hash = undoRedoStack[undoRedoStackIndex];

      // update the enabled/disabled status of the undo/redo buttons
      enableDisableButtons();
    }

    // prevent adding a '?' causing empty query params by returning false
    return false;
  });

  // handle clicks on the reset button
  $('.ui-reset').on('click', function(e) {
    console.log('reset');
    // set the url hash to the default value
    window.location.hash = window.defaultHash;

    // prevent adding a '?' causing empty query params by returning false
    return false;
  });

  // on page load, render the "Main" component
  render();
})();

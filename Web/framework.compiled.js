'use strict';

(function () {
  function getInput() {
    var hash = window.location.hash || '#' + encodeURI(window.defaultInput);
    return decodeURI(hash.slice(1));
  }

  function updateInput(input) {
    window.location.hash = '#' + encodeURI(input);
  }

  // render all components
  function render() {
    console.log('render');
    var input = getInput();

    for (var elementId in window.components) {
      var Component = window.components[elementId];

      ReactDOM.render(React.createElement(Component, { input: input, update: updateInput }), document.getElementById(elementId));
    }
  }
  // initialize the undo/redo stack
  var undoRedoStack = [getInput()];
  var undoRedoStackIndex = 0;

  // enable or disable undo and redo buttons, depending on state of undo/redo stack
  function enableDisableButtons() {
    // can't make any undos when viewing first item
    if (undoRedoStackIndex == 0) {
      $('#undo').addClass('disabled');
    } else {
      $('#undo').removeClass('disabled');
    }

    // can't make any redos when viewing last item
    if (undoRedoStackIndex == undoRedoStack.length - 1) {
      $('#redo').addClass('disabled');
    } else {
      $('#redo').removeClass('disabled');
    }
  }

  // whenever the hash changes, render
  $(window).on('hashchange', function () {
    var input = getInput();
    // update the undo/redo stack if the hash is different than the stack
    if (input != undoRedoStack[undoRedoStackIndex]) {
      undoRedoStackIndex += 1;
      // only change the stack if the change isn't already the next item
      if (undoRedoStack.length == undoRedoStackIndex || undoRedoStack[undoRedoStackIndex] != input) {
        undoRedoStack.splice(undoRedoStackIndex);
        undoRedoStack.push(input);
      }
      // update the enabled/disabled status of the undo/redo buttons
      enableDisableButtons();
    }

    // with the hash and stack properly updated, render
    render();
  });

  // handle undo
  function undo() {
    // only undo if the stack allows
    if (undoRedoStackIndex != 0) {
      console.log('undo');

      // update the stack
      undoRedoStackIndex -= 1;
      updateInput(undoRedoStack[undoRedoStackIndex]);

      // update the enabled/disabled status of the undo/redo buttons
      enableDisableButtons();
    }
  }

  // handle redo
  function redo() {
    // only redo if the stack allows
    if (undoRedoStackIndex != undoRedoStack.length - 1) {
      console.log('redo');

      // update the stack
      undoRedoStackIndex += 1;
      window.location.hash = undoRedoStack[undoRedoStackIndex];

      // update the enabled/disabled status of the undo/redo buttons
      enableDisableButtons();
    }
  }

  // handle clicks on the undo button
  $('#undo').on('click', function (e) {
    undo();

    // prevent adding a '?' causing empty query params by returning false
    return false;
  });

  // handle clicks on the redo button
  $('#redo').on('click', function (e) {
    redo();

    // prevent adding a '?' causing empty query params by returning false
    return false;
  });

  // handle clicks on the reset button
  $('#reset').on('click', function (e) {
    console.log('reset');
    // set the url hash to the default value
    updateInput(window.defaultInput);

    // prevent adding a '?' causing empty query params by returning false
    return false;
  });

  $(document).ready(function () {
    var totalPresses = 0;

    // check for keys on keyup event
    $(document).keyup(function (e) {
      if (e.which == 17 || e.which == 92 || e.which == 91 || e.which == 93) {
        totalPresses -= 1;
      }
    });

    // check for keys on keydown event
    $(document).keydown(function (e) {
      if (e.which == 17 || e.which == 92 || e.which == 91 || e.which == 93) {
        totalPresses += 1;
      }
      if (e.which == 90 && totalPresses > 0) {
        undo();
      }
      if (e.which == 89 && totalPresses > 0) {
        redo();
      }
    });
  });

  window.defaultInput = window.defaultInput || "";
  updateInput(getInput());

  // on page load, render the "Main" component
  render();
})();

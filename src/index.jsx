require('./index.scss');

const AppContainer = require('./smartComponents/AppContainer.jsx');
const cursors = require('./stateCursors.jsx');
const proceedCellsToNextFrame = require('./proceedCellsToNextFrame.jsx');
const proceedVirtualHoursToNextFrame =
  require('./proceedVirtualHoursToNextFrame.jsx');
const utils = require('./utils.jsx');

const React = require('react');

// Some files/modules in this project don't import React but do include JSX.
// Now, when Babel transpiles the JSX DOM tags, it seems to output stuff like
// React.createElement.
// In such a case React would be undefined and the consequent JS error would
// stop the entire application from continuing.
// Thus this hack of setting the global variable React is necessary.
// Other than the fact that the global scope is being polluted, not much harm is
// being done.
global.React = React;

React.render(<AppContainer />, document.getElementById('cwb-app'));

(async function () {
  while (true) {

    const nextFrameTimeMs = await utils.rafAsync();

    cursors.curFrameTimeMs.set(nextFrameTimeMs);

    proceedVirtualHoursToNextFrame(nextFrameTimeMs);

    proceedCellsToNextFrame(nextFrameTimeMs);

  }
})();

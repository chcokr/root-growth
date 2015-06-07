const stateTree = require('./stateTree.jsx');

/**
 * An object that maps a cell's creation path (a string) to an object containing
 * info on the cell.
 * The info object has the following keys:
 * - createTimeVirtualHr: (number) how many virtual hours had elapsed since the
 * start of rendition to the moment at which the cell was created
 * - durationHr: (number) the duration (in virtual hours) since
 * createTimeVirtualHr after which the cell will split into two cells of the
 * same height (each of which is half as tall as the cell right before the
 * split)
 * - height: (number) the height of the cell (in pixels)
 * - lastTouchedVirtualHr: (number) how many virtual hours had elapsed since the
 * start of rendition to the moment at which this info object was last
 * modified/created
 */
module.exports.cellCreationPathToInfoMap =
  stateTree.select('cellCreationPathToInfoMap');

/**
 * The number of virtual hours that has elapsed since the current simulation
 * session began.
 */
module.exports.virtualHoursElapsed = stateTree.select('virtualHoursElapsed');

const stateTree = require('./stateTree.jsx');

/**
 * An object that maps a cell's creation path (a string) to an object containing
 * info on the cell.
 * The info object has the following keys:
 * - createTimeMs: (number) the UTC timestamp (in *visual* milliseconds) at
 * which the cell was created
 * - durationHr: (number) the duration (in *virtual* hours) since createTimeMs
 * after which the cell will split into two cells of the same height (each of
 * which is half as tall as the cell right before the split)
 * - height: (number) the height of the cell (in pixels)
 * - lastTouchedMs: (number) the UTC timestamp (in *visual* milliseconds) at
 * which this info object was last modified/created
 */
module.exports.cellCreationPathToInfoMap =
  stateTree.select('cellCreationPathToInfoMap');

/**
 * The UTC timestamp (in *visual* milliseconds) at which the newest
 * requestAnimationFrame() was fired.
 */
module.exports.curFrameTimeMs = stateTree.select('curFrameTimeMs');

/**
 * The number of virtual hours that correspond to one visual second.
 */
module.exports.virtualHourElapsePerVisualSec =
  stateTree.select('virtualHourElapsePerVisualSec');

/**
 * The number of virtual hours that has elapsed since the current simulation
 * session began.
 */
module.exports.virtualHoursElapsed = stateTree.select('virtualHoursElapsed');

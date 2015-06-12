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

module.exports.diffeq = {};

module.exports.diffeq.concens = {};

module.exports.diffeq.concens.act =
  stateTree.select('diffeq', 'concens', 'act');

module.exports.diffeq.concens.inh =
  stateTree.select('diffeq', 'concens', 'inh');

module.exports.diffeq.consts = {};

module.exports.diffeq.consts.actDecayCoeff =
  stateTree.select('diffeq', 'consts', 'actDecayCoeff');

module.exports.diffeq.consts.actDiffuCoeff =
  stateTree.select('diffeq', 'consts', 'actDiffuCoeff');

module.exports.diffeq.consts.aiCellThreshold =
  stateTree.select('diffeq', 'consts', 'aiCellThreshold');

module.exports.diffeq.consts.inhDecayCoeff =
  stateTree.select('diffeq', 'consts', 'inhDecayCoeff');

module.exports.diffeq.consts.inhDiffuCoeff =
  stateTree.select('diffeq', 'consts', 'inhDiffuCoeff');

module.exports.diffeq.consts.sourceDensity =
  stateTree.select('diffeq', 'consts', 'sourceDensity');

/**
 * The number of virtual hours that has elapsed since the current simulation
 * session began.
 */
module.exports.virtualHoursElapsed = stateTree.select('virtualHoursElapsed');

module.exports.rootViewHeight = stateTree.select('rootViewHeight');

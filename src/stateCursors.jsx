const stateTree = require('./stateTree.jsx');

module.exports.cellCreationPathToInfoMap =
  stateTree.select('cellCreationPathToInfoMap');

module.exports.curFrameTimeMs = stateTree.select('curFrameTimeMs');

module.exports.virtualHourElapsePerVisualSec =
  stateTree.select('virtualHourElapsePerVisualSec');

module.exports.virtualHoursElapsed = stateTree.select('virtualHoursElapsed');

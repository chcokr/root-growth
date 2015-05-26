const _ = require('lodash');
const Baobab = require('baobab');
const performanceNow = require('react/lib/performanceNow');

const now = performanceNow();

module.exports = new Baobab({
  cellCreationPathToInfoMap: _.range(1, 6).reduce((map, i) => {
    map[i] = {
      createTimeMs: now,
      durationHr: _.random(18, 22, true),
      height: 20,
      lastTouchedMs: now
    };
    return map;
  }, {}),
  curFrameTimeMs: now,
  virtualHourElapsePerVisualSec: 12,
  virtualHoursElapsed: 0
}, {
  syncwrite: true
});

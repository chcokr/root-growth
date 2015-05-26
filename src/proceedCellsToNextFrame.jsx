const cursors = require('./stateCursors.jsx');

const _ = require('lodash');
const performanceNow = require('react/lib/performanceNow');

function proceedCellsToNextFrame(nextFrameTimeMs) {

  const mapCursor = cursors.cellCreationPathToInfoMap;
  const map = mapCursor.get();

  const paths = Object.keys(map);
  const pathsSorted = Object.keys(map).sort();
  const bottom20 = _.takeRight(pathsSorted, 20);

  // Grow each cell's height.
  for (let path of paths) {
    const now = performanceNow();

    const createTimeMs = map[path].createTimeMs;
    const durationHr = map[path].durationHr;
    const height = map[path].height;
    const lastTouchedMs = map[path].lastTouchedMs;

    const visualMsElapsedSinceLastTouch = nextFrameTimeMs - lastTouchedMs;
    const virtualHrElapsedSinceLastTouch =
      (visualMsElapsedSinceLastTouch / 1000) *
        cursors.virtualHourElapsePerVisualSec.get();

    cursors.cellCreationPathToInfoMap.set([path, 'height'],
      height + virtualHrElapsedSinceLastTouch * 10); // 10 = speed of growth
    cursors.cellCreationPathToInfoMap.set([path, 'lastTouchedMs'], now);

    const visualMsElapsedSinceCreation =
      nextFrameTimeMs - createTimeMs;
    const virtualHrElapsedSinceCreation =
      (visualMsElapsedSinceCreation / 1000) *
        cursors.virtualHourElapsePerVisualSec.get();

    // A cell in bottom 20 gets to split between 18 and 22 hours since its
    // creation.
    if (_.contains(bottom20, path) &&
        virtualHrElapsedSinceCreation > durationHr) {

      // Lower number means higher position.
      mapCursor.set(`${path}.1`, {
        createTimeMs: now,
        durationHr: _.random(18, 22, true),
        height: height / 2,
        lastTouchedMs: now
      });

      mapCursor.set(`${path}.2`, {
        createTimeMs: now,
        durationHr: _.random(18, 22, true),
        height: height / 2,
        lastTouchedMs: now
      });

      mapCursor.unset(path);

    }
  }

}

module.exports = proceedCellsToNextFrame;

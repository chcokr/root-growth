const cursors = require('./stateCursors.jsx');

const _ = require('lodash');
const performanceNow = require('react/lib/performanceNow');

/**
 * Updates the value of `cellCreationPathToInfoMap` in the state tree to the
 * value it should be in the new frame.
 * Specifically, the following things happen.
 * - First off, every Cell in the Root (except, of course, the QuietCell) grows
 * in height, regardless of whether it is in the division zone or in the
 * elongation zone.
 * - The rate of height growth is the same across all Cells: 10 pixels per
 * *virtual* hour.
 * - If the Cell is one of the bottom 20 Cells in the Root (excluding the
 * QuietCell), then it *splits* a certain number of hours after its creation.
 * - This duration before splitting is defined at the time of the Cell's
 * creation.
 * It is defined to be a random floating number between `18.0` and `22.0`.
 * - What does *splitting* exactly mean?
 * When a Cell with creation path 1.1 and height 100 splits, it is being
 * replaced with two new Cells:
 *  - path 1.1**.1** / height **50**
 *  - path 1.1**.2** / height **50**
 *  - `.1` means a higher position within the Root than `.2`.
 * - This idea of defining creation paths as strings is particularly useful when
 * we need to tell which cells belong in the "bottom 20".
 * All we would have to do is just sort the strings!
 *
 * @param {number} nextFrameTimeMs The UTC timestamp (in *visual* milliseconds)
 * at which the next frame of the application starts being considered.
 * @returns {void}
 */
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

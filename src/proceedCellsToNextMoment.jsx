const cursors = require('./stateCursors.jsx');

const _ = require('./lodash.jsx');

/**
 * Updates the value of `cellCreationPathToInfoMap` in the state tree to the
 * value it should be at the new virtual moment.
 * Specifically, the following things happen.
 * - First off, every Cell in the RootColumn (except, of course, the QuietCell)
 * grows in height, regardless of whether it is in the division zone or in the
 * elongation zone.
 * - The rate of height growth is the same across all Cells: 10 pixels per
 * virtual hour.
 * - If the Cell is one of the bottom 20 Cells in the RootColumn (excluding the
 * QuietCell), then it *splits* a certain number of virtual hours after its
 * creation.
 * - This duration before splitting is defined at the time of the Cell's
 * creation.
 * It is defined to be a random floating number between `18.0` and `22.0`.
 * - What does *splitting* exactly mean?
 * When a Cell with creation path 1.1 and height 100 splits, it is being
 * replaced with two new Cells:
 *  - path 1.1**.1** / height **50**
 *  - path 1.1**.2** / height **50**
 *  - `.1` means a higher position within the RootColumn than `.2`.
 * - This idea of defining creation paths as strings is particularly useful when
 * we need to tell which cells belong in the "bottom 20".
 * All we would have to do is just sort the strings!
 *
 * @param {number} nextMomentVirtualHr The number of virtual hours that have
 * elapsed since the start of rendition.
 * @returns {void}
 */
function proceedCellsToNextMoment(nextMomentVirtualHr) {

  const infoMapCursor = cursors.cellCreationPathToInfoMap;
  const infoMap = infoMapCursor.get();

  const paths = Object.keys(infoMap);
  const pathsSorted = Object.keys(infoMap).sort();
  const bottom20 = _.takeRight(pathsSorted, 20);

  // Grow each cell's height.
  for (let path of paths) {

    const createTimeVirtualHr = infoMap[path].createTimeVirtualHr;
    const durationHr = infoMap[path].durationHr;
    const height = infoMap[path].height;
    const lastTouchedVirtualHr = infoMap[path].lastTouchedVirtualHr;

    const virtualHrElapsedSinceLastTouch =
      nextMomentVirtualHr - lastTouchedVirtualHr;

    infoMapCursor.set([path, 'height'],
      height + virtualHrElapsedSinceLastTouch * 10); // 10 = speed of growth
    cursors.cellCreationPathToInfoMap.set([path, 'lastTouchedVirtualHr'],
      nextMomentVirtualHr);

    const virtualHrElapsedSinceCellCreation =
      nextMomentVirtualHr - createTimeVirtualHr;

    // A cell in bottom 20 gets to split between 18 and 22 hours since its
    // creation.
    if (_.includes(bottom20, path) &&
        virtualHrElapsedSinceCellCreation > durationHr) {

      // Lower number means higher position.
      infoMapCursor.set(`${path}.1`, {
        createTimeVirtualHr: nextMomentVirtualHr,
        durationHr: _.random(18, 22, true),
        height: height / 2,
        lastTouchedVirtualHr: nextMomentVirtualHr
      });

      infoMapCursor.set(`${path}.2`, {
        createTimeVirtualHr: nextMomentVirtualHr,
        durationHr: _.random(18, 22, true),
        height: height / 2,
        lastTouchedVirtualHr: nextMomentVirtualHr
      });

      infoMapCursor.unset(path);

    }
  }

}

module.exports = proceedCellsToNextMoment;

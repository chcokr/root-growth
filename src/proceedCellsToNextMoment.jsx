const _ = require('./lodash.jsx');

/**
 * Computes and returns the new value of `cellCreationPathToInfoMap` to be
 * stored in the state tree at the the new virtual moment.
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
 * @param {object} curCellCreationPathToInfoMap The info map at the current
 * moment.
 * @param {number} nextMomentVirtualHr The number of virtual hours that have
 * elapsed since the start of rendition.
 * @returns {object} The next version of the info map.
 */
function proceedCellsToNextMoment(
  curCellCreationPathToInfoMap,
  nextMomentVirtualHr
) {

  const origInfoMap = curCellCreationPathToInfoMap;

  let newInfoMap = _.cloneDeep(origInfoMap);

  const paths = Object.keys(origInfoMap);
  const pathsSorted = Object.keys(origInfoMap).sort();
  const bottom20 = _.takeRight(pathsSorted, 20);

  // Grow each cell's height.
  for (let path of paths) {
    const createTimeVirtualHr = origInfoMap[path].createTimeVirtualHr;
    const durationHr = origInfoMap[path].durationHr;
    const height = origInfoMap[path].height;
    const lastTouchedVirtualHr = origInfoMap[path].lastTouchedVirtualHr;

    const virtualHrElapsedSinceLastTouch =
      nextMomentVirtualHr - lastTouchedVirtualHr;

    newInfoMap[path].height =
      height + virtualHrElapsedSinceLastTouch * 10; // 10 = speed of growth
    newInfoMap[path].lastTouchedVirtualHr = nextMomentVirtualHr;

    const virtualHrElapsedSinceCellCreation =
      nextMomentVirtualHr - createTimeVirtualHr;

    // A cell in bottom 20 gets to split between 18 and 22 hours since its
    // creation.
    if (_.includes(bottom20, path) &&
        virtualHrElapsedSinceCellCreation > durationHr) {

      // Lower number means higher position.
      newInfoMap[`${path}.1`] = {
        createTimeVirtualHr: nextMomentVirtualHr,
        durationHr: _.random(18, 22, true),
        height: height / 2,
        lastTouchedVirtualHr: nextMomentVirtualHr
      };

      newInfoMap[`${path}.2`] = {
        createTimeVirtualHr: nextMomentVirtualHr,
        durationHr: _.random(18, 22, true),
        height: height / 2,
        lastTouchedVirtualHr: nextMomentVirtualHr
      };

      delete newInfoMap[path];

    }
  }

  return newInfoMap;
}

module.exports = proceedCellsToNextMoment;

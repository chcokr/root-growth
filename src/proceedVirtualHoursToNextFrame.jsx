const cursors = require('./stateCursors.jsx');

// The fact that this value is initially negative is used inside
// proceedVirtualHoursToNextFrame().
let initialTimestamp = -1;

/**
 * Updates the value of `virtualHoursElapsed` in the state tree to the value it
 * should be in the new frame.
 *
 * @param {number} nextFrameTimeMs The UTC timestamp (in *visual* milliseconds)
 * at which the next frame of the application starts being considered.
 * @returns {void}
 */
function proceedVirtualHoursToNextFrame(nextFrameTimeMs) {
  if (initialTimestamp < 0) {
    initialTimestamp = nextFrameTimeMs;
  }
  const millisecondsElapsed = nextFrameTimeMs - initialTimestamp;
  const visualSecondsElapsed = millisecondsElapsed / 1000;
  const virtualHoursElapsed =
    visualSecondsElapsed * cursors.virtualHourElapsePerVisualSec.get();
  cursors.virtualHoursElapsed.set(virtualHoursElapsed);
}

module.exports = proceedVirtualHoursToNextFrame;

const cursors = require('./stateCursors.jsx');

let initialTimestamp = -1;

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

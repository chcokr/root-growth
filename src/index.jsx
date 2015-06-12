require('./index.scss');

const AppContainer = require('./smartComponents/AppContainer.jsx');
const cursors = require('./stateCursors.jsx');
const getRootHeight = require('./getRootHeight.jsx');
const proceedCellsToNextMoment = require('./proceedCellsToNextMoment.jsx');
const proceedConcensToNextMoment = require('./proceedConcensToNextMoment.jsx');

const Bluebird = require('bluebird');
const performanceNow = require('react/lib/performanceNow');
const React = require('react');

// Some files/modules in this project don't import React but do include JSX.
// Now, when Babel transpiles the JSX DOM tags, it seems to output stuff like
// React.createElement.
// In such a case React would be undefined and the consequent JS error would
// stop the entire application from continuing.
// Thus this hack of setting the global variable React is necessary.
// Other than the fact that the global scope is being polluted, not much harm is
// being done.
global.React = React;

React.render(<AppContainer />, document.getElementById('cwb-app'));

(async function () { // eslint-disable-line max-statements
  let renditionVirtualHrIntervalBeforeFirstAiCellAppears = 2;
  let renditionVirtualHrIntervalAfterFirstAiCellAppears = 0.1 / 60; // 0.1 min

  let lastState = {
    cellCreationPathToInfoMap: cursors.cellCreationPathToInfoMap.get(),
    diffeq: {
      concens: {
        act: cursors.diffeq.concens.act.get(),
        inh: cursors.diffeq.concens.inh.get()
      },
      hasFirstAiCellAppeared: false
    },
    virtualHrsElapsedSinceStart: cursors.virtualHoursElapsed.get()
  };

  while (lastState.virtualHrsElapsedSinceStart < 24 * 5) {

    let lastRenditionTimeMs = performanceNow();

    while (performanceNow() - lastRenditionTimeMs < 500) {
      console.time('cycle');

      let cellCreationPathToInfoMap = lastState.cellCreationPathToInfoMap;
      let virtualHrsElapsedSinceStart = lastState.virtualHrsElapsedSinceStart;

      const renditionVirtualHrInterval =
        lastState.diffeq.hasFirstAiCellAppeared ?
          renditionVirtualHrIntervalAfterFirstAiCellAppears :
          renditionVirtualHrIntervalBeforeFirstAiCellAppears;

      const nextMomentVirtualHr =
        virtualHrsElapsedSinceStart + renditionVirtualHrInterval;

      const nextCellCreationPathToInfoMap =
        proceedCellsToNextMoment(
          cellCreationPathToInfoMap,
          nextMomentVirtualHr
        );

      const nextRootHeight = getRootHeight(nextCellCreationPathToInfoMap);

      console.time('concens');
      const {nextActConcens, nextHasFirstAiCellAppeared, nextInhConcens} =
        proceedConcensToNextMoment({
          actConcens: lastState.diffeq.concens.act,
          inhConcens: lastState.diffeq.concens.inh,
          cellCreationPathToInfoMap: lastState.cellCreationPathToInfoMap,
          consts: {
            actDecayCoeff: cursors.diffeq.consts.actDecayCoeff.get(),
            actDiffuCoeff: cursors.diffeq.consts.actDiffuCoeff.get(),
            inhDecayCoeff: cursors.diffeq.consts.inhDecayCoeff.get(),
            inhDiffuCoeff: cursors.diffeq.consts.inhDiffuCoeff.get(),
            sourceDensity: cursors.diffeq.consts.sourceDensity.get()
          },
          hasFirstAiCellAppeared: lastState.diffeq.hasFirstAiCellAppeared,
          nextRootHeight,
          virtualHrSinceLastRendition: renditionVirtualHrInterval
        });
      console.timeEnd('concens');

      lastState.cellCreationPathToInfoMap = nextCellCreationPathToInfoMap;
      lastState.diffeq.concens.act = nextActConcens;
      lastState.diffeq.concens.inh = nextInhConcens;
      lastState.diffeq.hasFirstAiCellAppeared = nextHasFirstAiCellAppeared;
      lastState.virtualHrsElapsedSinceStart = nextMomentVirtualHr;

      console.timeEnd('cycle');
    }

    // Trigger UI update
    cursors.cellCreationPathToInfoMap.set(lastState.cellCreationPathToInfoMap);
    cursors.diffeq.concens.act.set(lastState.diffeq.concens.act);
    cursors.diffeq.concens.inh.set(lastState.diffeq.concens.inh);
    cursors.virtualHoursElapsed.set(lastState.virtualHrsElapsedSinceStart);

    await Promise.delay(0);

  }
})();

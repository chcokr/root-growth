require('./index.scss');

const AppContainer = require('./smartComponents/AppContainer.jsx');
const cursors = require('./stateCursors.jsx');
const getRootHeight = require('./getRootHeight.jsx');
const proceedCellsToNextMoment = require('./proceedCellsToNextMoment.jsx');
const proceedConcensToNextMoment = require('./proceedConcensToNextMoment.jsx');

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

(async function () {
  let renditionVirtualHrInterval = 2;

  let hasFirstAiCellAppeared = false;

  while (true) {

    let cellCreationPathToInfoMap = cursors.cellCreationPathToInfoMap.get();
    let virtualHrsElapsedSinceStart = cursors.virtualHoursElapsed.get();

    // Defines the delay between every rendered moment.
    await Promise.delay(50);

    const nextMomentVirtualHr =
      virtualHrsElapsedSinceStart + renditionVirtualHrInterval;

    const nextCellCreationPathToInfoMap =
      proceedCellsToNextMoment(
        cellCreationPathToInfoMap,
        nextMomentVirtualHr
      );

    const nextRootHeight = getRootHeight(nextCellCreationPathToInfoMap);

    const {nextActConcens, nextHasFirstAiCellAppeared, nextInhConcens} =
      proceedConcensToNextMoment({
        actConcens: cursors.diffeq.concens.act.get(),
        inhConcens: cursors.diffeq.concens.inh.get(),
        cellCreationPathToInfoMap,
        consts: {
          actDecayCoeff: cursors.diffeq.consts.actDecayCoeff.get(),
          actDiffuCoeff: cursors.diffeq.consts.actDiffuCoeff.get(),
          inhDecayCoeff: cursors.diffeq.consts.inhDecayCoeff.get(),
          inhDiffuCoeff: cursors.diffeq.consts.inhDiffuCoeff.get(),
          sourceDensity: cursors.diffeq.consts.sourceDensity.get()
        },
        hasFirstAiCellAppeared,
        nextRootHeight,
        virtualHrSinceLastRendition: renditionVirtualHrInterval
      });

    cursors.cellCreationPathToInfoMap.set(nextCellCreationPathToInfoMap);
    cursors.diffeq.concens.act.set(nextActConcens);
    cursors.diffeq.concens.inh.set(nextInhConcens);
    cursors.virtualHoursElapsed.set(nextMomentVirtualHr);

    hasFirstAiCellAppeared = nextHasFirstAiCellAppeared;

  }
})();

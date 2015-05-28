const DivisionZoneCell = require('../dumbComponents/DivisionZoneCell.jsx');
const ElongationZoneCell = require('../dumbComponents/ElongationZoneCell.jsx');
const cursors = require('../stateCursors.jsx');
const RootView = require('../dumbComponents/RootView.jsx');
const utils = require('../utils.jsx');

const _ = require('lodash');
const baobab = require('baobab-react/decorators');

/**
 * A wrapper around RootView, which contains the Cells defined in the state
 * cursor `cellCreationPathToInfoMap`.
 * The bottom twenty of the Cells (excluding the QuietCell) get converted into a
 * DivisionZoneCell, and the others are converted into an ElongationZoneCell.
 */
@baobab.branch({
  cursors: {
    cellCreationPathToInfoMap: cursors.cellCreationPathToInfoMap
  }
})
class RootViewContainer extends utils.PureRenderComponent {
  render() {
    const map = this.props.cellCreationPathToInfoMap;
    const paths = Object.keys(map);
    const pathsSorted = paths.sort();

    const divisionZoneCells =
      _(pathsSorted)
        .takeRight(20)
        .map((path, i) =>
          <DivisionZoneCell height={map[path].height} key={`div${i}`} />)
        .value();

    const elongationZoneCells =
      _(pathsSorted)
        .slice(0, Math.max(0, pathsSorted.length - 20))
        .map((path, i) =>
          <ElongationZoneCell height={map[path].height} key={`elong${i}`} />)
        .value();

    // Lower index means higher position in the root.
    const cells = [
      ...elongationZoneCells,
      ...divisionZoneCells
    ];

    return (
      <RootView cells={cells} />
    );
  }
}

module.exports = RootViewContainer;

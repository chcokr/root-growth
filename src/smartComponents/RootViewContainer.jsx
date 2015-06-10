const DivisionZoneCell = require('../dumbComponents/DivisionZoneCell.jsx');
const ElongationZoneCell = require('../dumbComponents/ElongationZoneCell.jsx');
const cursors = require('../stateCursors.jsx');
const RootView = require('../dumbComponents/RootView.jsx');
const utils = require('../utils.jsx');

const _ = require('../lodash.jsx');
const baobab = require('baobab-react/decorators');

/**
 * A wrapper around RootView, which contains the Cells defined in the state
 * cursor `cellCreationPathToInfoMap`.
 * The bottom twenty of the Cells (excluding the QuietCell) get converted into a
 * DivisionZoneCell, and the others are converted into an ElongationZoneCell.
 *
 * Also, any DivisionZoneCell or ElongationZoneCell, if its height is smaller
 * than 0.1% of the current height of the entire root, its border color is
 * switched to match its background color.
 * This is to assist visual perception.
 * When the border color stays black though the cells are extremely tiny, the
 * browser displays the cell as a black line.
 * So the bottommost area of the root just looks like a black slab.
 */
@baobab.branch({
  cursors: {
    cellCreationPathToInfoMap: cursors.cellCreationPathToInfoMap,
    inhConcens: cursors.diffeq.concens.inh
  },
  facets: {
    rootHeight: 'rootHeight'
  }
})
class RootViewContainer extends utils.PureRenderComponent {
  render() {
    const map = this.props.cellCreationPathToInfoMap;
    const paths = Object.keys(map);
    const pathsSorted = paths.sort();

    const divisionZoneCells =
      _.takeRight(pathsSorted, 20)
        .map((path, i) =>
          <DivisionZoneCell
            height={map[path].height}
            key={`div${i}`}
            sameBorderColor={map[path].height / this.props.rootHeight < 0.001}
          />);

    const elongationZoneCells =
      pathsSorted
        .slice(0, Math.max(0, pathsSorted.length - 20))
        .map((path, i) =>
          <ElongationZoneCell
            height={map[path].height}
            key={`elong${i}`}
            sameBorderColor={map[path].height / this.props.rootHeight < 0.001}
          />);

    // Lower index means higher position in the root.
    const cells = [
      ...elongationZoneCells,
      ...divisionZoneCells
    ];

    return (
      <RootView
        cells={cells}
        inhConcens={this.props.inhConcens}
        numConcenPositions={1000}
      />
    );
  }
}

module.exports = RootViewContainer;

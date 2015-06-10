require('./RootColumn.scss');

const QuietCell = require('./QuietCell.jsx');
const _ = require('../lodash.jsx');
const utils = require('../utils.jsx');

/**
 * A 100px-width column of vertically aligned Cells.
 * There is always one QuietCell at the bottom of the RootColumn.
 */
class RootColumn extends utils.PureRenderComponent {
  render() {
    const inhConcenVals = this.props.inhConcens;
    const numConcenPositions = this.props.numConcenPositions;

    const maxConcen = _.max(inhConcenVals);
    const minConcen = _.min(inhConcenVals);

    const includeEvery =
      (inhConcenVals.length / // eslint-disable-line no-bitwise
        numConcenPositions) | 0; // rounds off the number to an integer *fast*
    let inhConcenPosElems = [];
    for (let i = 0; i < inhConcenVals.length; i += 1) {
      if (i % includeEvery === 0) {
        inhConcenPosElems.push(
          <div
            className="concentration-pos-x094g0aa"
            key={i / includeEvery}
            style={{
              height: `calc(100% / ${numConcenPositions})`,
              opacity: (inhConcenVals[i] - minConcen) / (maxConcen - minConcen)
            }}
          />
        );
      }
    }

    return (
      <div className="root-column-vz0v23r">
        <div className="cell-boundaries-23nv0923f">
          {this.props.cells}
          <QuietCell />
        </div>
        <div className="concentrations-overlay-v09ajv">
          {inhConcenPosElems}
        </div>
      </div>
    );
  }
}

module.exports = RootColumn;

require('./RootColumn.scss');

const QuietCell = require('./QuietCell.jsx');
const _ = require('../lodash.jsx');
const utils = require('../utils.jsx');

const React = require('react');

function assertTopAndBottomOfConcensOverlayAlignWithCellBoundaries(
  firstPosDomNode,
  lastPosDomNode,
  rootColHeight
) {
  if (firstPosDomNode.offsetTop !== 0) {
    // The first position should align with the top tip of the
    // cell boundaries.
    throw new Error('The first concentration position should be' +
      ` at offset top 0, but it's at ${firstPosDomNode.offsetTop}`);
  }
  if ((lastPosDomNode.offsetTop + lastPosDomNode.offsetHeight) !==
      rootColHeight) {
    // The bottom of the last position should align with the
    // bottom tip of the cell boundaries.
    throw new Error('The bottom of the last concentration' +
      ` position should be at offset top ${rootColHeight}` +
      ` but it's at ${lastPosDomNode.offsetTop + lastPosDomNode.offsetHeight}`);
  }
}

/**
 * A 100px-width column of vertically aligned Cells.
 * There is always one QuietCell at the bottom of the RootColumn.
 */
class RootColumn extends utils.PureRenderComponent {
  componentDidMount() {
    const firstConcenPosDomNode = React.findDOMNode(this.refs.pos0);
    const lastConcenPosDomNode =
      React.findDOMNode(this.refs[`pos${this.props.numConcenPositions - 1}`]);
    assertTopAndBottomOfConcensOverlayAlignWithCellBoundaries(
      firstConcenPosDomNode,
      lastConcenPosDomNode,
      this.props.height
    );
  }
  componentDidUpdate() {
    const firstConcenPosDomNode = React.findDOMNode(this.refs.pos0);
    const lastConcenPosDomNode =
      React.findDOMNode(this.refs[`pos${this.props.numConcenPositions - 1}`]);
    assertTopAndBottomOfConcensOverlayAlignWithCellBoundaries(
      firstConcenPosDomNode,
      lastConcenPosDomNode,
      this.props.height
    );
  }
  render() {
    const inhConcenVals = this.props.inhConcens;
    const numConcenPositions = this.props.numConcenPositions;

    const maxConcen = _.max(inhConcenVals);
    const minConcen = _.min(inhConcenVals);

    const includeEvery = inhConcenVals.length / numConcenPositions;
    const inhConcenPosElems =
      _.range(numConcenPositions)
        .map(i => {
          /* eslint-disable no-bitwise */
          // The bitwise operation rounds off the floating-point number to an
          // integer, very fast.
          const nearestIntIndex = (includeEvery * i) | 0;
          /* eslint-enable no-bitwise */
          return (
            <div
              className="concentration-pos-x094g0aa"
              key={i}
              ref={`pos${i}`}
              style={{
                height: this.props.height / numConcenPositions,
                opacity: (inhConcenVals[nearestIntIndex] - minConcen) /
                  (maxConcen - minConcen)
              }}
            />
          );
        });

    return (
      <div
        className="root-column-vz0v23r"
        style={{height: this.props.height}}>
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

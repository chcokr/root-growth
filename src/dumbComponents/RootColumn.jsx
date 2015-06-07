require('./RootColumn.scss');

const QuietCell = require('./QuietCell.jsx');
const utils = require('../utils.jsx');

/**
 * A 100px-width column of vertically aligned Cells.
 * There is always one QuietCell at the bottom of the RootColumn.
 */
class RootColumn extends utils.PureRenderComponent {
  render() {
    const inhConcens = this.props.inhConcens.map((c, i) =>
      <div
        className="concentration-pos-x094g0aa"
        key={i}
        style={{
          opacity: c
        }}
      />);

    return (
      <div className="root-column-vz0v23r">
        <div className="cell-boundaries-23nv0923f">
          {this.props.cells}
          <QuietCell />
        </div>
        <div className="concentrations-overlay-v09ajv">
          {inhConcens}
        </div>
      </div>
    );
  }
}

module.exports = RootColumn;

require('./RootColumn.scss');

const QuietCell = require('./QuietCell.jsx');
const utils = require('../utils.jsx');

/**
 * A 100px-width column of vertically aligned Cells.
 * There is always one QuietCell at the bottom of the RootColumn.
 */
class RootColumn extends utils.PureRenderComponent {
  render() {
    return (
      <div className="root-vz0v23r">
        {this.props.cells}
        <QuietCell />
      </div>
    );
  }
}

module.exports = RootColumn;

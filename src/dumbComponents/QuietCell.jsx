require('./QuietCell.scss');

const Cell = require('./Cell.jsx');
const utils = require('../utils.jsx');

const React = require('react');

/**
 * A Cell with a bottom border.
 * This Cell always maintains a fixed height.
 * It is meant to be placed at the bottom of a RootColumn.
 */
class QuietCell extends utils.PureRenderComponent {
  static propTypes = {
    height: React.PropTypes.number
  };

  render() {
    return (
      <Cell
        showBottomBorder={true} />
    );
  }
}

module.exports = QuietCell;

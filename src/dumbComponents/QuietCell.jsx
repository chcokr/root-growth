require('./QuietCell.scss');

const Cell = require('./Cell.jsx');
const utils = require('../utils.jsx');

const React = require('react');

/**
 * A Cell with a bottom border.
 * This Cell always maintains a fixed height: 100px.
 * It is meant to be placed at the bottom of a RootColumn.
 */
class QuietCell extends utils.PureRenderComponent {
  render() {
    return (
      <Cell
        height={100}
        showBottomBorder={true}
      />
    );
  }
}

module.exports = QuietCell;

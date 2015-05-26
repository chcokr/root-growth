require('./QuietCell.scss');

const Cell = require('./Cell.jsx');
const utils = require('../utils.jsx');

const React = require('react');

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

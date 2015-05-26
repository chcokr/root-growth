require('./ElongationZoneCell.scss');

const Cell = require('./Cell.jsx');
const utils = require('../utils.jsx');

const React = require('react');

class ElongationZoneCell extends utils.PureRenderComponent {
  static propTypes = {
    height: React.PropTypes.number.isRequired
  };

  render() {
    return (
      <Cell
        backgroundColor="blue"
        height = {this.props.height}
        />
    );
  }
}

module.exports = ElongationZoneCell;

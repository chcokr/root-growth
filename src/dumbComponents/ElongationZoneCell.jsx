require('./ElongationZoneCell.scss');

const Cell = require('./Cell.jsx');
const utils = require('../utils.jsx');

const React = require('react');

/**
 * A Cell with a blue background-color.
 */
class ElongationZoneCell extends utils.PureRenderComponent {
  static propTypes = {
    height: React.PropTypes.number.isRequired,
    sameBorderColor: React.PropTypes.bool
  };

  static defaultPropTypes = {
    sameBorderColor: false
  };

  render() {
    return (
      <Cell
        backgroundColor="blue"
        borderColor={this.props.sameBorderColor ? 'blue' : 'black'}
        height = {this.props.height}
      />
    );
  }
}

module.exports = ElongationZoneCell;

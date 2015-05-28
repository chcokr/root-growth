require('./DivisionZoneCell.scss');

const Cell = require('./Cell.jsx');
const utils = require('../utils.jsx');

const React = require('react');

/**
 * A Cell with a red background-color.
 */
class DivisionZoneCell extends utils.PureRenderComponent {
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
        backgroundColor="red"
        borderColor={this.props.sameBorderColor ? 'red' : 'black'}
        height = {this.props.height}
      />
    );
  }
}

module.exports = DivisionZoneCell;

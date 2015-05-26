require('./Cell.scss');

const utils = require('../utils.jsx');

const React = require('react');

class Cell extends utils.PureRenderComponent {
  static propTypes = {
    height: React.PropTypes.number,
    showBottomBorder: React.PropTypes.bool,
    backgroundColor: React.PropTypes.string
  };

  static defaultProps = {
    backgroundColor: '#fff',
    height: 100,
    showBottomBorder: false
  };

  render() {
    return (
      <div
        className="cell-239f0j2f"
        style={{
          backgroundColor: this.props.backgroundColor,
          height: this.props.height,
          borderBottom: !this.props.showBottomBorder ? '' :
            '1px solid #000000'
        }}>
      </div>
    );
  }
}

module.exports = Cell;

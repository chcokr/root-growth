require('./Root.scss');

const QuietCell = require('./QuietCell.jsx');
const utils = require('../utils.jsx');

class Root extends utils.PureRenderComponent {
  render() {
    return (
      <div className="root-vz0v23r">
        {this.props.cells}
        <QuietCell />
      </div>
    );
  }
}

module.exports = Root;

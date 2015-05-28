require('./RootView.scss');

const RootColumn = require('./RootColumn.jsx');
const utils = require('../utils.jsx');

/**
 * A flex container of a 200px width and a 100vh height that creates and centers
 * a RootColumn with the given Cells.
 */
class RootView extends utils.PureRenderComponent {
  render() {
    return (
      <div className="root-view-aoviwha232fz">
        <RootColumn cells={this.props.cells} />
      </div>
    );
  }
}

module.exports = RootView;

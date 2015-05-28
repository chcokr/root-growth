require('./RootView.scss');

const Root = require('./Root.jsx');
const utils = require('../utils.jsx');

/**
 * A flex container of a 200px width and a 100vh height that creates and centers
 * a Root with the given Cells.
 */
class RootView extends utils.PureRenderComponent {
  render() {
    return (
      <div className="root-view-aoviwha232fz">
        <Root cells={this.props.cells} />
      </div>
    );
  }
}

module.exports = RootView;

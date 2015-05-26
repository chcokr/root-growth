require('./RootView.scss');

const Root = require('./Root.jsx');
const utils = require('../utils.jsx');

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

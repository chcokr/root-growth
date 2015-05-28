require('./App.scss');

const utils = require('../utils.jsx');

/**
 * A simple flex container of a 100vw width that centers children.
 */
class App extends utils.PureRenderComponent {
  render() {
    return (
      <div className="app-awv0a93f3f">
        {this.props.children}
      </div>
    );
  }
}

module.exports = App;

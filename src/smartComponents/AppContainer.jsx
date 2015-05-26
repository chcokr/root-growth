const App = require('../dumbComponents/App.jsx');
const RootViewContainer = require('./RootViewContainer.jsx');
const SidebarContainer = require('./SidebarContainer.jsx');
const stateTree = require('../stateTree.jsx');
const utils = require('../utils.jsx');

const baobab = require('baobab-react/decorators');

@baobab.root(stateTree)
class AppContainer extends utils.PureRenderComponent {
  render() {
    return (
      <App>
        <RootViewContainer />
        <SidebarContainer />
      </App>
    );
  }
}

module.exports = AppContainer;

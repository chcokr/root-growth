require('./RootView.scss');

const RootColumn = require('./RootColumn.jsx');
const utils = require('../utils.jsx');

/**
 * A container of a 200px width and a 100vh height that creates and centers
 * a RootColumn with the given Cells.
 */
class RootView extends utils.PureRenderComponent {
  render() {
    return (
      <div className="root-view-aoviwha232fz">
        <RootColumn
          cells={this.props.cells}
          height={this.props.height}
          inhConcens={this.props.inhConcens}
          numConcenPositions={this.props.numConcenPositions}
        />
      </div>
    );
  }
}

module.exports = RootView;

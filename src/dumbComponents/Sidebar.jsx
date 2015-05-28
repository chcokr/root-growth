require('./Sidebar.scss');

const utils = require('../utils.jsx');

/**
 * The side menu of the application.
 */
class Sidebar extends utils.PureRenderComponent {
  render() {
    const vals = this.props.configurableVals;
    const valNames = Object.keys(this.props.configurableVals);

    const listItems = valNames.map((name, i) =>
      <li key={i}>{name}: {vals[valNames]}</li>);

    const hoursElapsed = this.props.virtualHoursElapsed;

    return (
      <div className="sidebar-0vz9he023">
        <p>
          {hoursElapsed.toFixed(1)} hours
          ({(hoursElapsed / 24).toFixed(1)} days)
          elapsed
        </p>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

module.exports = Sidebar;

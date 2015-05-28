require('./Sidebar.scss');

const utils = require('../utils.jsx');

/**
 * The side menu of the application.
 */
class Sidebar extends utils.PureRenderComponent {
  render() {
    const hoursElapsed = this.props.virtualHoursElapsed;

    return (
      <div className="sidebar-0vz9he023">
        <p>
          {hoursElapsed.toFixed(1)} hours
          ({(hoursElapsed / 24).toFixed(1)} days)
          elapsed
        </p>
      </div>
    );
  }
}

module.exports = Sidebar;

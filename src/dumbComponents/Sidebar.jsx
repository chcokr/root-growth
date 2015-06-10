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
          {(hoursElapsed * 60 * 60).toFixed(1)} seconds <br />
          {(hoursElapsed * 60).toFixed(1)} minutes <br />
          {hoursElapsed.toFixed(1)} hours <br />
          {(hoursElapsed / 24).toFixed(1)} days have elapsed
        </p>
      </div>
    );
  }
}

module.exports = Sidebar;

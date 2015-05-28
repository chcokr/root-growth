const React = require('react');
const shallowEqual = require('react/lib/shallowEqual');

/**
 * A class extending `React.Component` with `shouldComponentUpdate()` replaced
 * with what `require('react/addons').addons.PureRenderMixin` would replace it
 * with.
 */
class PureRenderComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }
}

/**
 * Async version of requestAnimationFrame.
 *
 * @returns {number} The UTC timestamp (in *visual* milliseconds) at which the
 * next new frame starts being considered.
 */
async function rafAsync() {
  return await new Promise(resolve => {
    requestAnimationFrame(highResTimestamp => {
      resolve(highResTimestamp);
    });
  });
}

module.exports.PureRenderComponent = PureRenderComponent;
module.exports.rafAsync = rafAsync;

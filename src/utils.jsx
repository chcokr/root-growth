const React = require('react');
const shallowEqual = require('react/lib/shallowEqual');

class PureRenderComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }
}

async function rafAsync() {
  return await new Promise(resolve => {
    requestAnimationFrame(highResTimestamp => {
      resolve(highResTimestamp);
    });
  });
}

module.exports.PureRenderComponent = PureRenderComponent;
module.exports.rafAsync = rafAsync;

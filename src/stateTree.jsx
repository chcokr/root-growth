const _ = require('./lodash.jsx');
const Baobab = require('baobab');

// For a description of each property in the tree, see stateCursors.jsx.
module.exports = new Baobab({
  cellCreationPathToInfoMap: _.range(1, 6).reduce((map, i) => {
    map[i] = {
      createTimeVirtualHr: 0,
      durationHr: _.random(18, 22, true),
      height: 20,
      lastTouchedVirtualHr: 0
    };
    return map;
  }, {}),
  virtualHoursElapsed: 0
}, {
  facets: {
    rootHeight: {
      cursors: {
        cellCreationPathToInfoMap: ['cellCreationPathToInfoMap']
      },
      get(data) {
        const map = data.cellCreationPathToInfoMap;
        const paths = Object.keys(map);

        let totalHeight = 0;
        for (let path of paths) {
          // 1px for the top border of the Cell
          totalHeight += map[path].height + 1;
        }

        // 100px for the QuietCell height,
        // 2px for its top and bottom borders
        totalHeight += 100 + 2;

        return totalHeight;
      }
    }
  },
  syncwrite: true
});

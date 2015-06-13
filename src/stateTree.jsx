const _ = require('./lodash.jsx');
const getRootHeight = require('./getRootHeight.jsx');

const Baobab = require('baobab');

const initCellCreationPathToInfoMap =
  _.range(1, 6).reduce((map, i) => {
    map[i] = {
      createTimeVirtualHr: 0,
      durationHr: _.random(18, 22, true),
      height: 20,
      lastTouchedVirtualHr: 0
    };
    return map;
  }, {});

const actDiffuCoeff = 0.9375;

// For a description of each property in the tree, see stateCursors.jsx.
module.exports = new Baobab({
  cellCreationPathToInfoMap: initCellCreationPathToInfoMap,
  diffeq: {
    concens: {
      act: [],
      inh: []
    },
    consts: {
      // Note about units:
      // - The unit of length is pixel.
      // - The unit of length is virtual second.
      actDecayCoeff: 0.00019,
      actDiffuCoeff,
      aiCellThreshold: 10,
      inhDecayCoeff: 0.00025,
      inhDiffuCoeff: 250,
      sourceDensity: actDiffuCoeff * 0.99
    }
  },
  rootViewHeight: 500,
  virtualHoursElapsed: 0
}, {
  facets: {
    rootHeight: {
      cursors: {
        cellCreationPathToInfoMap: ['cellCreationPathToInfoMap']
      },
      get(data) {
        return getRootHeight(data.cellCreationPathToInfoMap);
      }
    }
  },
  asynchronous: false,
  syncwrite: true
});

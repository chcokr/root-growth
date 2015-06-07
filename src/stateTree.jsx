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

const actDiffuCoeff = 0.01;

// For a description of each property in the tree, see stateCursors.jsx.
module.exports = new Baobab({
  cellCreationPathToInfoMap: initCellCreationPathToInfoMap,
  diffeq: {
    concens: {
      act: [],
      inh: []
    },
    consts: {
      actDecayCoeff: 0.02,
      actDiffuCoeff,
      aiCellThreshold: 10,
      inhDecayCoeff: 0.03,
      inhDiffuCoeff: 0.4,
      sourceDensity: actDiffuCoeff * 0.99
    }
  },
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

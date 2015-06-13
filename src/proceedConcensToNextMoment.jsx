const _ = require('./lodash.jsx');

function getNextConcensAtPos({
  actConcen,
  actConcenOneBefore,
  actConcenOneNext,
  consts: {
    actDecayCoeff,
    actDiffuCoeff,
    inhDecayCoeff,
    inhDiffuCoeff,
    sourceDensity,
  },
  inhConcen,
  inhConcenOneBefore,
  inhConcenOneNext,
  virtualHrSinceLastRendition
}) {

  const actRateOfChangeWrtPos1 = (actConcen - actConcenOneBefore) / 1;
  const actRateOfChangeWrtPos2 = (actConcenOneNext - actConcen) / 1;
  const actSecondDerivWrtPos =
    (actRateOfChangeWrtPos2 - actRateOfChangeWrtPos1) / 1;

  const actRateOfchangeWrtTime =
    sourceDensity * actConcen * actConcen / inhConcen -
      actDecayCoeff * actConcen +
      actDiffuCoeff * actSecondDerivWrtPos;

  if (!isFinite(actRateOfchangeWrtTime)) {
    throw new Error('actRateOfchangeWrtTime turned out non-finite');
  }

  const nextActConcen =
    actConcen + actRateOfchangeWrtTime * virtualHrSinceLastRendition * 60 * 60;

  const inhRateOfChangeWrtPos1 = (inhConcen - inhConcenOneBefore) / 1;
  const inhRateOfChangeWrtPos2 = (inhConcenOneNext - inhConcen) / 1;
  const inhSecondDerivWrtPos =
    (inhRateOfChangeWrtPos2 - inhRateOfChangeWrtPos1) / 1;

  const inhRateOfchangeWrtTime =
    sourceDensity * actConcen * actConcen -
      inhDecayCoeff * inhConcen +
      inhDiffuCoeff * inhSecondDerivWrtPos;

  const nextInhConcen =
    inhConcen + inhRateOfchangeWrtTime * virtualHrSinceLastRendition * 60 * 60;

  return {nextActConcen, nextInhConcen};
}

function proceedConcensToNextMoment({
  actConcens,
  inhConcens,
  cellCreationPathToInfoMap,
  consts: {
    actDecayCoeff,
    actDiffuCoeff,
    inhDecayCoeff,
    inhDiffuCoeff,
    sourceDensity
  },
  hasFirstAiCellAppeared,
  nextRootHeight,
  virtualHrSinceLastRendition
}) {
  const infoMap = cellCreationPathToInfoMap;
  const cellPathsSortedTopToBottom = Object.keys(infoMap).sort();
  const cellCount = cellPathsSortedTopToBottom.length;

  if (cellCount < 1 + 20 + 10) { // 1 QuietCell, 20 DivisionZoneCells
    return {
      nextActConcens: [],
      nextHasFirstAiCellAppeared: false,
      nextInhConcens: []
    };
  }

  if (!hasFirstAiCellAppeared) {
    const topCellPath = cellPathsSortedTopToBottom.sort()[0];
    const topCellHeight = infoMap[topCellPath].height;
    return {
      // Initial concen for A-I cell is 1.
      nextActConcens: _.range(topCellHeight).map(() => 1),
      nextHasFirstAiCellAppeared: true,
      nextInhConcens: _.range(topCellHeight).map(() => 1)
    };
  }

  const nextRootHeightInt = Math.floor(nextRootHeight);

  let nextActConcens = [];
  let nextInhConcens = [];

  for (let i = 0; i < nextRootHeightInt; i += 1) {
    const actConcen = actConcens[i] || 0.001;
    const actConcenOneBefore = actConcens[i - 1] || 0.001;
    const actConcenOneNext = actConcens[i + 1] || 0.001;
    const inhConcen = inhConcens[i] || 0.001;
    const inhConcenOneBefore = inhConcens[i - 1] || 0.001;
    const inhConcenOneNext = inhConcens[i + 1] || 0.001;

    const {nextActConcen, nextInhConcen} =
      getNextConcensAtPos({
        actConcen,
        actConcenOneBefore,
        actConcenOneNext,
        consts: {
          actDecayCoeff,
          actDiffuCoeff,
          inhDecayCoeff,
          inhDiffuCoeff,
          sourceDensity
        },
        inhConcen,
        inhConcenOneBefore,
        inhConcenOneNext,
        virtualHrSinceLastRendition
      });

    nextActConcens[i] = nextActConcen;
    nextInhConcens[i] = nextInhConcen;
  }

  const randomIndexToInspect = _.random(nextRootHeightInt - 1);
  if (!isFinite(nextActConcens[randomIndexToInspect])) {
    throw new Error('nextActConcens contains a non-finite element' +
      ` (at index ${randomIndexToInspect} -` +
      ` value is ${nextActConcens[randomIndexToInspect]})`);
  }
  if (!isFinite(nextInhConcens[randomIndexToInspect])) {
    throw new Error('nextInhConcens contains a non-finite element' +
      ` (at index ${randomIndexToInspect} -` +
      ` value is ${nextInhConcens[randomIndexToInspect]})`);
  }

  return {
    nextActConcens,
    nextHasFirstAiCellAppeared: true,
    nextInhConcens
  };
}

module.exports = proceedConcensToNextMoment;

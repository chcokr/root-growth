function getRootHeight(cellCreationPathToInfoMap) {
  const map = cellCreationPathToInfoMap;
  const paths = Object.keys(map);

  let totalHeight = 0;
  for (let path of paths) {
    totalHeight += map[path].height;
  }

  // 100px for the QuietCell height.
  totalHeight += 100;

  return totalHeight;
}

module.exports = getRootHeight;

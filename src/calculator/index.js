const PACKS = require('./packs.js');

const calculatePickCounts = (packName, qty) => {
  const { counts } = PACKS[packName];

  const result = {};
  for (let pick in counts) { result[pick] = counts[pick] * qty; }

  return result;
};

// enter number of packs ordered. get back the number of picks
const calculateOrder = packQtys => {
  const totalsByPick = {};
  let totalPicks = 0;

  const order = [];

  for (let packName in packQtys) {
    const qty = packQtys[packName];
    const pickCounts = calculatePickCounts(packName, qty);

    let numPicks;

    for (let pick in pickCounts) {
      numPicks = pickCounts[pick];

      if (!totalsByPick.hasOwnProperty(pick)) { totalsByPick[pick] = 0; }
      totalsByPick[pick] += numPicks;
      totalPicks += numPicks;
    }

    const lineItem = { name: packName, qty, pickCounts };
    order.push(lineItem);
  }

  return { order, totalsByPick, totalPicks };
};

module.exports = { calculatePickCounts, calculateOrder };

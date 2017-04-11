const PICKS = require('./picks.js');

const PICK_SET = new Set(Object.keys(PICKS));
const PICK_ARR = Array.from(PICK_SET);

const validate = counts => {
  if (!Object.keys(counts).every(pick => PICK_SET.has(pick))) {
    throw new Error(`Each pick be a member of: ${PICK_ARR}`);
  } else {
    return true;
  }
};

/**
 * @param countsObj, {Object} Quantities of individual picks that make up each pack
 */
function Pack(name, countsObj) {
  validate(countsObj);
  this.name = name;
  this.counts = countsObj;
}

module.exports = {
  // mixes
  'P-Samp-M':  new Pack('P-Samp-M', {
    standard_14: 1, standard_09: 1,
    tri_09: 1, tri_14: 1,
    jazz_09: 1, jazz_14: 1
  }),
  'P-Stand-M': new Pack('P-Stand-M', { standard_09: 3, standard_14: 3 }),
  'P-Tri-M':   new Pack('P-Tri-M', { tri_09: 3, tri_14: 3 }),
  'P-Jazz-M':  new Pack('P-Jazz-M', { jazz_09: 3, jazz_14: 3 }),
  // 0.9mm only
  'P-Samp-9':  new Pack('P-Samp-9', { standard_09: 2, tri_09: 2, jazz_09: 2 }),
  'P-Stand-9': new Pack('P-Stand-9', { standard_09: 6 }),
  'P-Tri-9':   new Pack('P-Tri-9', { tri_09: 6 }),
  'P-Jazz-9':  new Pack('P-Jazz-9', { jazz_09: 6 }),
  // 1.4mm only
  'P-Samp-14':  new Pack('P-Samp-14', { standard_14: 2, tri_14: 2, jazz_14: 2 }),
  'P-Stand-14': new Pack('P-Stand-14', { standard_14: 6 }),
  'P-Tri-14':   new Pack('P-Tri-14', { tri_14: 6 }),
  'P-Jazz-14':  new Pack('P-Jazz-14', { jazz_14: 6 })
};

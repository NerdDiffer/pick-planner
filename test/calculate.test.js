const test = require('ava');
const { inspect } = require('util');
const { calculatePickCounts, calculateOrder } = require('../src/calculator');

test('calculatePickCounts', t => {
  const actual = calculatePickCounts('P-Samp-M', 5);
  const expected = {
    standard_14: 5, standard_09: 5,
    tri_09: 5, tri_14: 5,
    jazz_09: 5, jazz_14: 5
  };
  t.deepEqual(actual, expected);
});

test('#calculateOrder: calculate a small order', t => {
  const input = {
    'P-Samp-M': 5,
    'P-Stand-M': 4
  };

  const actual = calculateOrder(input);

  const expected = {
    order: [
      { name: 'P-Samp-M', qty: 5, pickCounts: {
        standard_14: 5, standard_09: 5,
        tri_09: 5, tri_14: 5,
        jazz_09: 5, jazz_14: 5
      } },
      { name: 'P-Stand-M', qty: 4, pickCounts: {
        standard_14: 12, standard_09: 12
      } }
    ],
    totalPicks: 54,
    totalsByPick: {
      standard_14: 17, standard_09: 17,
      tri_09: 5, tri_14: 5,
      jazz_09: 5, jazz_14: 5
    }
  };

  t.deepEqual(actual, expected)
});

test.skip('calculates order', t => {
  const input = {
    'P-Stand-M': 207,
    'P-Samp-M': 214,
    'P-Stand-9': 106,
    'P-Tri-M': 45,
    'P-Tri-14': 26,
    'P-Stand-14': 35,
    'P-Tri-9': 23,
    'P-Samp-9': 29,
    'P-Jazz-M': 22,
    'P-Jazz-14': 13,
    'P-Samp-14': 5
  };

  const actual = calculateOrder(input);
  console.log(inspect(actual, { depth: 5 }));
  t.pass('just loggin to console');
});

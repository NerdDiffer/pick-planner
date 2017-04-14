const findPackId = (packs, packId) => {
  const len = packs.length;

  for (let i = 0; i < len; i++) {
    if (packs[i].packId === packId) { return i; }
  }

  return -1;
};

const clone = arr => arr.map(obj => Object.assign({}, obj));

export { findPackId, clone }

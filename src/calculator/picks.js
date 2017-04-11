const MM = new Set([0.9, 1.4]);
const SHAPES = new Set(['Standard', 'Tri', 'Jazz']);
const MM_ARR = Array.from(MM);
const SHAPES_ARR = Array.from(SHAPES);

const validate = (mm, shape) => {
  if (!MM.has(mm)) {
    throw new Error(`thickness, ${mm}, must be one of ${MM_ARR}`);
  }
  if (!SHAPES.has(shape)) {
    throw new Error(`shape, ${shape}, must be one of ${SHAPES_ARR}`);
  }

  return true;
};

/**
 * @param mm, {Float} thickness of the pick in millimeters: 0.9mm or 1.4mm
 * @param shape, {String} 'Standard', 'Tri', 'Jazz'
 */
function Pick(mm, shape) {
  validate(mm, shape);

  //this.mm = mm;
  //this.shape = shape;

  Object.defineProperties(this, {
    mm: {
      value: mm,
      enumerable: true
    },
    shape: {
      value: shape,
      enumerable: true
    },
  });
}

module.exports = {
  standard_09: new Pick(0.9, 'Standard'),
  standard_14: new Pick(1.4, 'Standard'),
  tri_09:  new Pick(0.9, 'Tri'),
  tri_14:  new Pick(1.4, 'Tri'),
  jazz_09: new Pick(0.9, 'Jazz'),
  jazz_14: new Pick(1.4, 'Jazz')
};

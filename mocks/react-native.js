// @flow
const { createElement } = require('react');

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-param-reassign */

module.exports.StyleSheet = {
  create: body => body,
  flatten: styles => Object.assign({}, ...[].concat(styles)),
};

class Value {
  constructor() { this.isAnimatedValue = true; }

  interpolate(value) { // eslint-disable-line
    const nextValue = new Value();
    nextValue.interpolation = value;
    return nextValue;
  }

  setValue() { return this; }
}

module.exports.Animated = {
  timing: () => module.exports.Animated,
  parallel: () => module.exports.Animated,
  start: () => module.exports.Animated,
  Value,
};

module.exports.Easing = {
  linear: () => {},
  ease: () => {},
  in: () => {},
  out: () => {},
  inOut: () => {},
};

module.exports.View = props => createElement('view', props);

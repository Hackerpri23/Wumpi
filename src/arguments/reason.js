const { Argument } = require('klasa');

module.exports = class extends Argument {
  run(arg, possible, message) {
    return arg || 'Not specified.';
  }
};

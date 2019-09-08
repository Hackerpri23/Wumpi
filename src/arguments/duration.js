const { Argument } = require('klasa');
const ms = require('ms');

module.exports = class extends Argument {
  run(arg, possible, message) {
    if (ms(arg)) return ms(arg);
    else return ms('1 day');
  }
};

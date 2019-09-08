const { Argument } = require('klasa');
const ms = require('ms');

module.exports = class extends Argument {
  run(arg, possible, message) {
    if(message.content.split(message.command.usageDelim).length === 1)
      return ms('1 day');
    else
      return ms(message.content.split(message.command.usageDelim)[1]) || ms('1 day');
  }
};

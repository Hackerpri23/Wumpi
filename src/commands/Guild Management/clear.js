const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      usage: '<count:count>',
      usageDelim: ' ',
      aliases: ['clean', 'prune', 'purge'],
      runIn: ['text'],
      permissionLevel: 3,
      description: 'Cleans the specified number of messages in the channel.'
    });

    this.createCustomResolver(
      'count',
      /**
       *
       * @param {number|string} arg
       * @returns {number}
       */
      arg => {
        if (!isNaN(arg)) {
          let x = parseInt(arg);
          if (x > 0 && x < 101) return x;
          else throw 'The `count` must be between 0 and 100';
        } else throw 'The `count` must be a number!';
      }
    );
  }

  /**
   * @param message
   * @param {number} count
   */
  async run(message, [count]) {
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
      return await message.reply('I need the `MANAGE MESSAGES` permission to execute this command.');
    let deleted = await message.channel.bulkDelete(count);
    let m = await message.channel.send(`Deleted ${deleted.size} messages in ${message.channel}!`);
    await m.delete({ timeout: 5000 });
  }
};

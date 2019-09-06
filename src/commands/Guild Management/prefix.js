const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...props) {
    super(...props, {
      description: "Changes the bot's prefix for the guild.",
      runIn: ['text'],
      permissionLevel: 8,
      usage: '<prefix:string>',
      usageDelim: ' ',
      aliases: ['command-prefix'],
      autoAliases: true
    });
  }

  async run(msg, [prefix]) {
    await msg.guild.settings.update('prefix', prefix);
    return await msg.reply(`The bot's prefix in **${msg.guild.name.toUpperCase()}** has been changed to \`${prefix}\``);
  }
};

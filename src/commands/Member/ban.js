const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      autoAliases: true,
      aliases: ['🔨', 'ba', 'bann'],
      permissionLevel: 6,
      requiredPermissions: ['BAN_MEMBERS'],
      runIn: ['text'],
      description: 'Bans the mentioned user.',
      usage: '<User:member> [reason:string]',
      usageDelim: ' '
    });
    this.customizeResponse('User', 'You need to mention the user to be banned.');
  }

  async run(message, [member, reason]) {
    if (!message.guild.me.hasPermission('BAN_MEMBERS'))
      return message.sendMessage('Sorry, but I need the `BAN MEMBERS` permission to execute this command.');
    if (!reason) reason = 'Not specified.';
    await member['send'](
      `You were banned in **${message.guild.name} by \`${message.author.username}\` for the following reason:\`\`\`${reason}\`\`\``
    ).catch();
    await member['ban']({ reason });
    return message.sendMessage(
      new MessageEmbed({ footer: { icon_url: message.author.displayAvatarURL() } })
        .setTitle('MEMBER BANNED')
        .setTimestamp()
        .setColor('RED')
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField('USER', member['user'].username, true)
        .addField('MODERATOR', message.author, true)
        .addField('REASON', `*${reason}*`, true)
    );
  }
};

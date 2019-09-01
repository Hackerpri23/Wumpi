const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...props) {
    super(...props, {
      usage: '<user:member>',
      usageDelim: ' ',
      aliases: ['allow-chat'],
      autoAliases: true,
      description: 'Allows the user from speaking in voice and sending messages in text channels.',
      runIn: ['text']
    });
  }

  async run(msg, [user, reason]) {
    if (!msg.guild.me.hasPermission('MANAGE_ROLES'))
      return msg.sendMessage(`Sorry, but I need the \`MANAGE ROLES\` permission to execute this command`);
    if (!reason) reason = 'NOT SPECIFIED!';
    let muteRole = await msg.guild.roles.find(r => r.name.toLowerCase().indexOf('muted') > -1);

    if (!muteRole || !user['roles'].find(r => r.name.toLowerCase().includes('muted')))
      return msg.reply('The mentioned user was not muted in the first place!');

    user['roles'].remove(muteRole);

    return await msg.sendMessage(
      new MessageEmbed()
        .setTitle('MEMBER UN-MUTED')
        .setColor(0x228b22)
        .setTimestamp()
        .addField('NAME', user['displayName'], true)
        .addField('MODERATOR', `\`${msg.member.displayName}\``, true)
        .setThumbnail(this.client.user.displayAvatarURL())
    );
  }
};

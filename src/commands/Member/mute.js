const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...props) {
    super(...props, {
      usage: '<user:member> [reason:reason]',
      usageDelim: ' ',
      aliases: ['no-chat'],
      autoAliases: true,
      description: 'Prevents the user from speaking in voice and sending messages in text channels.',
      runIn: ['text']
    });
  }

  async run(msg, [user, reason]) {
    if (!msg.guild.me.hasPermission('MANAGE_ROLES'))
      return msg.sendMessage(`Sorry, but I need the \`MANAGE ROLES\` permission to execute this command`);
    let muteRole = await msg.guild.roles.find(r => r.name.toLowerCase().indexOf('muted') > -1);

    if (!muteRole) {
      let role = await msg.guild['createRole']({ name: 'Muted' });
      await msg.guild.channels.forEach(gc =>
        gc['overwritePermissions'](role, {
          SEND_MESSAGES: false,
          SPEAK: false,
          ADD_REACTIONS: false
        })
      );
      muteRole = role;
    }

    await user['roles'].add(muteRole);

    return await msg.sendMessage(
      new MessageEmbed()
        .setTitle('MEMBER MUTED')
        .setColor(0x228b22)
        .setTimestamp()
        .addField('NAME', user['displayName'], true)
        .addField('MODERATOR', `\`${msg.member.displayName}\``, true)
        .addField('REASON', reason)
        .setThumbnail(this.client.user.displayAvatarURL())
    );
  }
};

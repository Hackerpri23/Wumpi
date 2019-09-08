const ms = require('ms');
const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...params) {
    super(...params, {
      runIn: ['text'],
      aliases: ['maintenance'],
      description: 'Locks down the guild for maintenance.',
      permissionLevel: 8,
      usage: '(duration:duration) [reason:reason]',
      usageDelim: ' '
    });
  }

  /**
   * @param msg
   * @param {number|string} duration
   * @param reason
   */
  async run(msg, [duration, reason]) {
    console.log(msg.guildSettings['lockdown']);
    if (!msg.guild.me.hasPermission('ADMINISTRATOR'))
      return await msg.reply('I need the `ADMINISTRATOR` permission to execute this command.');
    if (msg.guildSettings['lock-down']) {
      await this.removeLockDown(msg);
      return await msg.reply('The lock-down has ended!');
    } else {
      await this.enterLockDown(msg, reason, ms(duration));
      return await msg.reply('The guild has entered lock-down mode!');
    }
  }

  async removeLockDown(guild) {
    await guild.channels.forEach(c => {
      c.overwritePermissions({
        permissionOverwrites: [
          {
            id: guild.id,
            allow: ['SEND_MESSAGES', 'SPEAK']
          }
        ],
        reason: 'Ending lock-down mode!'
      });
    });
    let lockChannel = await guild.channels.find(c => c.name.toLowerCase().includes('lockdown'));
    lockChannel ? await lockChannel.delete() : undefined;
    await guild.settings.update('lockdown', false);
  }

  async enterLockDown(msg, reason, duration) {
    await msg.guild.channels.forEach(c => {
      c.overwritePermissions({
        permissionOverwrites: [
          {
            id: msg.guild.id,
            deny: ['SEND_MESSAGES', 'SPEAK']
          }
        ],
        reason: 'Entering lock-down mode!'
      });
    });
    let lockChannel = await msg.guild.channels.create('lockdown', {
      position: 0,
      permissionOverwrites: [
        {
          id: msg.guild.id,
          deny: ['SEND_MESSAGES', 'SPEAK']
        }
      ]
    });
    let e = new MessageEmbed().setTitle('MAINTENANCE MODE')
      .setColor('BLUE')
      .setThumbnail(this.client.user.displayAvatarURL())
      .setTimestamp()
      .addField('REASON', reason)
      .addField('DURATION', duration);
    await lockChannel.send(e);
    await msg.guild.settings.update('lockdown', true);
  }
};

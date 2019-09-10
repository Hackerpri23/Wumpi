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
      usage: '[duration:duration] [reason:reason]',
      usageDelim: ' '
    });
  }

  /**
   * @param msg
   * @param {number|string} duration
   * @param reason
   */
  async run(msg, [duration, reason]) {
    console.log(duration.toString() + "\n");
    console.log(reason + "\n\n");
    // return msg.sendMessage(new MessageEmbed().addField('REASON', reason).addField('DURATION', duration));
    if (!msg.guild.me.hasPermission('ADMINISTRATOR'))
      return await msg.reply('I need the `ADMINISTRATOR` permission to execute this command.');
    if (msg.guildSettings.get('lockdown')) {
      await this.removeLockDown(msg.guild);
      await msg.reply('The lockdown has ended!');
      return await msg.delete({timeout: 5000});
    } else {
      await this.enterLockDown(msg, reason, ms(duration));
      await msg.reply('The guild has entered lockdown mode!');
      return await msg.delete({timeout: 5000});
    }
  }

  async removeLockDown(guild) {
    for (const c of guild.channels) {
      await c.updateOverwrite(guild.id, {
        SEND_MESSAGES: true,
        SPEAK: true
      });
    }
    let lockChannel = await guild.channels.find(c => c.name.toLowerCase().includes('lockdown'));
    lockChannel ? await lockChannel.delete() : undefined;
    await guild.settings.update('lockdown', false, {throwOnError: true});
    await guild.settings.update('locktime', 0, {throwOnError: true});
  }

  async enterLockDown(msg, reason, duration) {
    for (const c of msg.guild){
      await  c.updateOverwrite(msg.guild.id, {
        SEND_MESSAGES: false,
        SPEAK: false
      });
    }
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
    await msg.guild.settings.update('lockdown', true, {throwOnError: true});
    await msg.guild.settings.update('locktime', ms(duration), {throwOnError: true});
  }
};
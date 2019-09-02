const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Unbans all banned users from the guild.',
      runIn: ['text'],
      aliases: ['mass-unban', 'unban-all', 'unbanall'],
      permissionLevel: 6
    });
  }
  async run(msg, ...extras) {
    if (!msg.guild.me.hasPermission('BAN_MEMBERS'))
      return await msg.sendMessage(`Sorry, but I don't have the required permissions.`);
    try {
      let bans = await msg.guild.fetchBans();
      for (let ban of bans) {
        await msg.guild.members.unban(ban.user);
      }
      return await msg.sendMessage(`${bans.size} users unbanned!`);
    } catch (e) {
      console.error(e);
    }
  }
};

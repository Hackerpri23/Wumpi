const { Task } = require('klasa');

module.exports = class extends Task{
  constructor(...args){
    super(...args, {
      name: 'checkLock',
      enabled: true
    })
  }

  async run(meta) {
    const guildIds = this.client.guilds.map(g => g.id);
    for (const guildId of guildIds) {
      let guild = this.client.guilds.get(guildId);
      if(guild.settings.get('lockdown')){
        if(guild.settings.get('locktime') < Date.now()){
          for (const c of guild){
            await  c.updateOverwrite(guild.id, {
              SEND_MESSAGES: true,
              SPEAK: true
            });
          }
          let lockChannel = await guild.channels.find(c => c.name.toLowerCase().includes('lockdown'));
          lockChannel ? await lockChannel.delete() : undefined;
          await guild.settings.update('lockdown', false, {throwOnError: true});
          await guild.settings.update('locktime', 0, {throwOnError: true});
        }
      }
    }
  }
};
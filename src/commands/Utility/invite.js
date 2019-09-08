const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...params) {
    super(...params, {
      autoAliases: true,
      description: 'Allows you to invite the bot to your server!'
    });
  }

  async run(msg, ...args){
    let inv = "To invite the bot to your guild, click the link provided below and make sure you give the appropriate permissions.\n\n"
      + `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=8`;
    return msg.author.sendMessage(inv)
  }

};
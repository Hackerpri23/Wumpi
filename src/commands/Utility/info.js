const {Command} = require('klasa');
const {MessageEmbed} = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['details', 'about'],
      guarded: true,
      description: language => language.get('COMMAND_INFO_DESCRIPTION')
    });
  }

  async run(message, ...params) {
    let about = new MessageEmbed();
    about.addField(
      'About Me',
      `If you want to learn more about \`Wumpi\`, check out our [Discord](https://discord.gg/mPPBNty) or head over to its [Github](https://github.com/alex5219/Wumpi) to understand it better!`
    );
    about.addField(
      'A bit about me',
      `I always wanted to be more known than Wumpus, because he is just sitting around being cute and so I thought it would be great if I show up with some nice powers to show Wumpus who is actually the better one!`
    );
    about.setTimestamp(Date.now());
    about.setThumbnail(this.client.user.displayAvatarURL());
    about.setColor(0x02f2e6);
    return message.author.send(about);
  }
};

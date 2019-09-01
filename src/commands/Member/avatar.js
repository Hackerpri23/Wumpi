const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      autoAliases: true,
      aliases: ['ava', 'pfp', 'profile-picture'],
      description: 'Gets the profile picture of the mentioned member.',
      usage: '[user:member]',
      runIn: ['text']
    });
  }

  run(message, [member]) {
    if (member)
      return message.author
        .sendMessage(member['user'].displayAvatarURL({ size: 2048 }))
        .then(() => message.sendMessage(`Please check your DMs to see ${member['displayName']}'s avatar!`))
        .catch(() => message.sendMessage("Couldn't send you the DM. Make sure you allow me to send DMs."));
    else
      return message.author
        .sendMessage(message.author.displayAvatarURL({ size: 2048 }))
        .then(() => message.sendMessage(`Please check your DMs to see your avatar!`))
        .catch(() => message.sendMessage("Couldn't send you the DM. Make sure you allow me to send DMs."));
  }
};

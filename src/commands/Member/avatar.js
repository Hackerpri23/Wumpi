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
      return message
        .sendMessage(member['user'].displayAvatarURL({ size: 2048 }))
        .catch(() =>
          message.sendMessage("Couldn't send you the avatar!\nPlease report this to my developers.\n\nThank you!")
        );
    else
      return message.author
        .sendMessage(message.author.displayAvatarURL({ size: 2048 }))
        .catch(() =>
          message.sendMessage("Couldn't send you the avatar!\nPlease report this to my developers.\n\nThank you!")
        );
  }
};

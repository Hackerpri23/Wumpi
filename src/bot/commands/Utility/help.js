const {
  Command,
  util: {isFunction}
} = require('klasa');
const {MessageEmbed} = require('discord.js');
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['commands'],
      guarded: true,
      description: language => language.get('COMMAND_HELP_DESCRIPTION'),
      usage: '[Command:command]',
      extendedHelp:
        'The basic usage is *prefix* ( `-` ) followed by the command name followed by the arguments.\n\n' +
        'The part enclosed in *Square brackets* ( `[]` ) is **optional** and can be skipped.\n' +
        "The part enclosed in *Angular brackets* ( `<>` ) is **required** and can't be skipped.\n\n" +
        'You might also see a few `||` in some places. It just means **`or`** i.e. `Alpha || Bravo || Charlie` means ' +
        '`Alpha or Bravo or Charlie` meaning you have to provide one of the three values.'
    });

    this.createCustomResolver('command', (arg, possible, message) => {
      if (!arg || arg === '') return undefined;
      return this.client.arguments.get('command').run(arg, possible, message);
    });
  }

  async run(message, [command]) {
    if (command) {
      const helpEmbed = new MessageEmbed()
        .setTitle(`${command['name'].toUpperCase()} COMMAND`)
        .setColor('RANDOM')
        .setFooter(
          `Requested by ${message.member ? message.member.displayName : message.author.username}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp()
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField(
          'Description',
          isFunction(command['description']) ? command['description'](message.language) : command['description']
        )
        .addBlankField();
      if (command['aliases'].length > 0) {
        helpEmbed.addField('Aliases', `\`${command['aliases'].join('`,  `')}\``).addBlankField();
      }
      helpEmbed.addField(
        'Format',
        `\`\`\`${this.client.options['prefix'].toLowerCase() + command['name'].toLowerCase()} ${command[
          'usage'
          ].parsedUsage
          .map(
            tag =>
              (tag.required === 2 ? '<' : '[') +
              tag.possibles.map(v => v.name).join('||') +
              (tag.required === 2 ? '>' : ']')
          )
          .join(command['usageDelim'])}\`\`\``
      );
      if (!isFunction(command['extendedHelp']))
        helpEmbed.addBlankField().addField('More Info', command['extendedHelp']);
      return message.sendMessage(helpEmbed);
    }
    const help = await this.buildHelp(message);
    const categories = Object.keys(help);
    const helpMessage = [];
    for (let cat = 0; cat < categories.length; cat++) {
      helpMessage.push(`**${categories[cat]} Commands**:`, '```asciidoc');
      const subCategories = Object.keys(help[categories[cat]]);
      for (let subCat = 0; subCat < subCategories.length; subCat++)
        helpMessage.push(`${help[categories[cat]][subCategories[subCat]].join('\n')}\n`);
      helpMessage.push('```', '\u200b');
    }

    return message.author
      .send(helpMessage, {split: {char: '\u200b'}})
      .then(() => {
        if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_DM');
      })
      .catch(() => {
        if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_NODM');
      });
  }

  async buildHelp(message) {
    const help = {};

    const {prefix} = message.guildSettings;
    const commandNames = [...this.client.commands.keys()];
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    await Promise.all(
      this.client.commands.map(command =>
        this.client.inhibitors
          .run(message, command, true)
          .then(() => {
            if (!has(help, command.category)) help[command.category] = {};
            if (!has(help[command.category], command.subCategory)) help[command.category][command.subCategory] = [];
            const description = isFunction(command.description)
              ? command.description(message.language)
              : command.description;
            help[command.category][command.subCategory].push(
              `${prefix}${command.name.padEnd(longest)} :: ${description}`
            );
          })
          .catch(() => {
            // noop
          })
      )
    );

    return help;
  }
};

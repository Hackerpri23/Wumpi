const { TextPrompt, Extendable } = require('klasa');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @extends TextPrompt
 */
module.exports = class extends Extendable {
  constructor(...params){
    super(...params, {
      appliesTo: [TextPrompt],
      name: 'extendedPrompt',
      enabled: true
    });
  }

  async multiPossibles(index) {
    const possible = this._currentUsage.possibles[index];
    const custom = this.usage.customResolvers[possible.type];
    const resolver = this.client.arguments.get(custom ? 'custom' : possible.type);

    if (possible.name in this.flags) this.args.splice(this.params.length, 0, this.flags[possible.name]);
    if (!resolver) {
      this.client.emit('warn', `Unknown Argument Type encountered: ${possible.type}`);
      if (this._currentUsage.possibles.length === 1) return this.pushParam(undefined);
      return this.multiPossibles(++index);
    }

    try {
      const res = await resolver.run(this.args[this.params.length], possible, this.message, custom);
      if (typeof res === 'undefined' && this._required === 1) this.args.splice(this.params.length, 0, undefined);
      return this.pushParam(res);
    } catch (err) {
      if (index < this._currentUsage.possibles.length - 1) return this.multiPossibles(++index);
      if (!this._required) {
        this.args.splice(...this._repeat ? [this.params.length, 1] : [this.params.length, 0, undefined]);
        return this._repeat ? this.validateArgs() : this.pushParam(undefined);
      }

      const { response } = this._currentUsage;
      const error = typeof response === 'function' ? response(this.message, possible) : response;

      if (this._required === 1) return this.handleError(error || err);
      if (this._currentUsage.possibles.length === 1) {
        let e = new MessageEmbed().setTitle('INVALID SYNTAX')
          .setTimestamp()
          .setThumbnail(this.client.user.displayAvatarURL())
          .setColor('RED')
          .addField('Command used', `\`\`\`${this.message.content}\`\`\``)
          .addField('Missing Argument', `**\`${possible.name}\`**`)
          .addField('Proper Syntax', `\`\`\`${(this.message.guildSettings.get('prefix') ||
            this.client.options['prefix']) + this.message.command['name'].toLowerCase()} ${this.message.command['usage'].parsedUsage
            .map(
              tag =>
                (tag.required === 2 ? '<' : '[') +
                tag.possibles.map(v => v.name).join('||') +
                (tag.required === 2 ? '>' : ']')
            )
            .join(this.message.command['usageDelim'])}\`\`\``);
        return this.handleError(error || (this.args[this.params.length] === undefined ? e  : err));
      }
      return this.handleError(error || this.message.language.get('COMMANDMESSAGE_NOMATCH', this._currentUsage.possibles.map(poss => poss.name).join(', ')));
    }
  }
};
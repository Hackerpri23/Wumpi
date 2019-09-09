const { Task } = require('klasa');

module.exports = class extends Task {
  constructor(...args) {
    super(...args, {
      name: 'updatePresence',
      enabled: true
    });
  }

  async run(meta) {
    await this.client.user.setActivity(
      `${this.client.users.size} Users | @${this.client.user.username}#${
        this.client.user.discriminator
      } ${this.client.commands.filter(c => c.permissionLevel !== 10).randomKey()}`,
      { type: 'LISTENING' }
    );
  }
};

const {Event} = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false,
      event: 'klasaReady'
    });
  }

  run = async () => {
    setInterval(() => {
      this.client.user.setActivity(
        `${this.client.users.size} Users | ${
          this.client.options['prefix']
        }${this.client.commands
          .filter(c => c.permissionLevel !== 10)
          .randomKey()}`,
        {
          type: 'LISTENING'
        }
      );
    }, 30000);
  };
};

const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false,
      event: 'klasaReady'
    });
  }

  run = async () => {
    await this.client.schedule.clear();
    await this.client.schedule.create('updatePresence', '*/1 * * * *');
    await this.client.schedule.create('checkLock', '*/5 * * * *');
  };
};

const { KlasaClient, PermissionLevels } = require('klasa');
const { token } = require('../config');

KlasaClient.defaultGuildSchema.add('lockdown', 'boolean', {default: true, configurable: true});
KlasaClient.defaultGuildSchema.add('locktime', 'number', {configurable: true});

let Wumpi = new KlasaClient({
  fetchAllMembers: true,
  prefix: '-',
  createPiecesFolders: false,
  disabledCorePieces: ['languages', 'commands'],
  providers: {
    default: 'mongodb'
  },
  gateways: {
    guilds: { provider: 'mongodb' },
    clientStorage: { provider: 'mongodb' },
    users: { provider: 'mongodb' }
  },
  permissionLevels: new PermissionLevels()
    .add(0, () => true)
    .add(1, message => (message.guild ? message.member.hasPermission('KICK_MEMBERS') : false), { fetch: true })
    .add(2, message => (message.guild ? message.member.hasPermission('MANAGE_ROLES') : false), { fetch: true })
    .add(3, message => (message.guild ? message.member.hasPermission('MANAGE_MESSAGES') : false), { fetch: true })
    .add(4, message => (message.guild ? message.member.hasPermission('MANAGE_CHANNELS') : false), { fetch: true })
    .add(5, message => (message.guild ? message.member.hasPermission('MUTE_MEMBERS') : false), { fetch: true })
    .add(6, message => (message.guild ? message.member.hasPermission('BAN_MEMBERS') : false), { fetch: true })
    .add(7, message => (message.guild ? message.member.hasPermission('MANAGE_GUILD') : false), { fetch: true })
    .add(8, message => (message.guild ? message.member.hasPermission('ADMINISTRATOR') : false), { fetch: true })
    .add(9, ({ author, client }) => client.owners.has(author), { break: true })
    .add(10, ({ author, client }) => client.owners.has(author)),
  readyMessage: client =>
    `Logged in as ${client.user.username}#${client.user.discriminator}\n${client.guilds.size} Guilds`
});

module.exports = Wumpi;

Wumpi.login(token).then();

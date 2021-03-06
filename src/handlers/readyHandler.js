const {default_prefix} = require('../config.json');
const client = require('../wumpi.js');
const guildSettings = require('../lib/guilddb');

client.on('ready', async () => {
    await client.guilds.keyArray().forEach(id => {
        let name;
        client.guilds.forEach(g => {
            if (id === g.id) {
                name = g.name;
            }
        });

        guildSettings.findOne({
            id: id
        }, (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const newGuildSettings = new guildSettings({
                    id: id,
                    name: name,
                    variables: {
                        prefix: default_prefix,
                        timezone: 'UTC-5',
                        supportRoleID: String,
                        ticketGreetingMessage: '\n' +
                            'The support team will respond to your ticket soon! \n\n' +
                            'Make sure to write all of your questions and concerns here, so we can be as quick as possible!',
                        ticketMaxTicketCount: 3,
                        filtered_words: []
                    },
                    values: {
                        isAutoSlowdownEnabled: true,
                        isAutoModEnabled: true,
                        isAntiBotEnabled: true,
                        isBackUpEnabled: true,
                        isActionLogEnabled: true,
                        isMusicEnabled: false,
                        isInviteTrackerEnabled: true,
                        isSupportTicketsEnabled: true
                    },
                    channels: {
                        maintenanceCategoryID: null,
                        ticketCategoryID: null,
                        ticketLogChannelID: null,
                        welcomeChannelID: null,
                        imageOnlyChannelIDs: [],
                        botOnlyChannelIDs: [],
                        userOnlyChannelIDs: []
                    }
                });
                return newGuildSettings.save();
            }
        });
    });
    console.log('Bot is now receiving.');
    let count = 0;
    client.guilds.forEach(g => {
        count = count + g.memberCount;
    });
    client.user.setActivity(count + ' Users | ' + default_prefix + 'help', {type: 'LISTENING'}).catch();
});
/*
    For configuring the bot, you have 2 options!
    
    1. Modify this file.
        Change the values of the following things in the JSON object show below.

        "token": Holds your discord bot's token.
        "secret": Holds your discord application's client secret.
        "id": Holds your discord application's client id.
        "mongodb": Holds your mongodb database's connection string.

    2. Create a .env file in the format shown below

        botToken=<Discord Bot's token here>
        clientSecret=<Discord Application's client secret here>
        mongoString=<MongoDB connection string here>

    ---
*/

require('dotenv').config();

module.exports = {
  token: process.env.botToken,
  secret: process.env.clientSecret,
  id: '436805615797403649',
  mongodb: process.env.mongoString
};

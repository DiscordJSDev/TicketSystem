const { Client } = require('discord.js')
const disbut = require('discord-buttons')
const { readdir } = require('fs')

const bot = new Client()

disbut(bot)

const { token } = require('./data/config.json')


readdir("./core/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const module = require(`./core/${file}`);
      let moduleName = file.split(".")[0];
      bot.on(moduleName, module.bind(null, bot));
    });
});

console.log('[INFO] The bot is now loading...')
bot.login(token)
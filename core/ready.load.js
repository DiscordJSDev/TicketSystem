const { precense, precenseType, statusType } = require('../data/messages.json')

module.exports = (bot) => {
    if(bot.guilds.cache.size > 1) return console.warn('[ERROR] This bot is only for one guild. Guild Cache: ' + bot.guilds.cache.size)

    bot.user.setActivity(precense, {type: precenseType})
    bot.user.setStatus(statusType)

    setInterval(function(){
        bot.user.setActivity(precense, {type: precenseType})
    }, 10000)
    
    console.log('[INFO] ' + bot.user.username + ' logged in.')
}
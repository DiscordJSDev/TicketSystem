const { ticketchannel, ticketcatogory, teamRole } = require('../data/config.json')
const { createButtonEmoji, createButtonStyle, createButtonText, createEmbedColor, createEmbedTitle, createEmbedDescription, createEmbedFooter, ticketname, multipleTicketText, closeButtonStyle, closeButtonEmoji, closeButtonText, ticketEmbedColor, ticketEmbedTitle, ticketEmbedDescription, ticketEmbedFooter, closeticketEmbedColor, closeticketEmbedTitle, closeticketEmbedDescription, closeticketEmbedFooter, noPermissionsToClose } = require('../data/messages.json')
const { MessageEmbed } = require('discord.js')
const { MessageButton, ButtonCollector } = require('discord-buttons')

module.exports = async (bot) => {
    if(bot.guilds.cache.size > 1) return

    let ch = bot.channels.cache.get(ticketchannel)
        if(!ch) return console.warn('[WARN] The ID of the ticket channel is invalid. Please check this in the config.json.')
        ch.bulkDelete('100')

    let ticketbut = new MessageButton()
                    .setID('create')
                    .setStyle(createButtonStyle)
                    .setEmoji(createButtonEmoji)
                    .setLabel(createButtonText)
    
    let embed = new MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
                .setColor(createEmbedColor)
                .setTitle(createEmbedTitle)
                .setDescription(createEmbedDescription)
                .setFooter(createEmbedFooter)

    ch.send(embed, ticketbut).then(msg=>{
        let c = new ButtonCollector(msg, button=>button.clicker.id == button.clicker.id)
            c.on('collect', button => {
                if(button.id == 'create') {
                    button.reply.defer()

                    let rawusername = button.clicker.user.username.split("").slice(0);
                    let username = ""

                    for (i = 0; i < rawusername.length; i++) {
                        if (rawusername[i].toLowerCase() == "a"
                            || rawusername[i].toLowerCase() == "b"
                            || rawusername[i].toLowerCase() == "c"
                            || rawusername[i].toLowerCase() == "d"
                            || rawusername[i].toLowerCase() == "e"
                            || rawusername[i].toLowerCase() == "f"
                            || rawusername[i].toLowerCase() == "g"
                            || rawusername[i].toLowerCase() == "h"
                            || rawusername[i].toLowerCase() == "i"
                            || rawusername[i].toLowerCase() == "j"
                            || rawusername[i].toLowerCase() == "k"
                            || rawusername[i].toLowerCase() == "l"
                            || rawusername[i].toLowerCase() == "m"
                            || rawusername[i].toLowerCase() == "n"
                            || rawusername[i].toLowerCase() == "o"
                            || rawusername[i].toLowerCase() == "p"
                            || rawusername[i].toLowerCase() == "q"
                            || rawusername[i].toLowerCase() == "r"
                            || rawusername[i].toLowerCase() == "s"
                            || rawusername[i].toLowerCase() == "t"
                            || rawusername[i].toLowerCase() == "u"
                            || rawusername[i].toLowerCase() == "v"
                            || rawusername[i].toLowerCase() == "w"
                            || rawusername[i].toLowerCase() == "x"
                            || rawusername[i].toLowerCase() == "y"
                            || rawusername[i].toLowerCase() == "z"
                            || rawusername[i].toLowerCase() == "0"
                            || rawusername[i].toLowerCase() == "1"
                            || rawusername[i].toLowerCase() == "2"
                            || rawusername[i].toLowerCase() == "3"
                            || rawusername[i].toLowerCase() == "4"
                            || rawusername[i].toLowerCase() == "5"
                            || rawusername[i].toLowerCase() == "6"
                            || rawusername[i].toLowerCase() == "7"
                            || rawusername[i].toLowerCase() == "8"
                            || rawusername[i].toLowerCase() == "9") {
                            username += rawusername[i].toLowerCase();
                        }
                    }

                    let chname = button.guild.channels.cache.find(ch => ch.name === ticketname + username)
                        if(chname) {
                            button.channel.send(multipleTicketText).then(info=>{info.delete({timeout: 5000})})
                            return
                        }

                    let category = button.guild.channels.cache.find(ct=>ct.id === ticketcatogory && ct.type === "category");
                        if(!category) return console.warn('[WARN] The ID of the ticket category is invalid. Please check this in the config.json.')

                    button.guild.channels.create(ticketname + username, {type:"text"}).then(chan=>{
                        chan.setParent(category)

                        if(!teamRole) return console.warn('[WARN] The ID of the team role is invalid. Please check this in the config.json.')

                        chan.overwritePermissions([
                            {
                                id: button.guild.id,
                                deny : ['VIEW_CHANNEL'],
                                allow : ['SEND_MESSAGES']
                            },
                            {
                                id: button.clicker.id,
                                allow: ['VIEW_CHANNEL', 'ADD_REACTIONS', 'ATTACH_FILES']
                            },
                            {
                                id: teamRole,
                                allow : ['VIEW_CHANNEL', 'ADD_REACTIONS', 'ATTACH_FILES', 'MANAGE_MESSAGES']
                            }
                        ]).then(ticket=>{
                            let closebut = new MessageButton()
                                            .setID('close')
                                            .setStyle(closeButtonStyle)
                                            .setEmoji(closeButtonEmoji)
                                            .setLabel(closeButtonText)

                            let embed = new MessageEmbed()
                                        .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
                                        .setColor(ticketEmbedColor)
                                        .setTitle(ticketEmbedTitle)
                                        .setDescription(ticketEmbedDescription)
                                        .setFooter(ticketEmbedFooter)
           
                            ticket.send('||<@&' + teamRole + '> | <@!' + button.clicker.id + '>||').then(ping=>{ping.delete({timeout: 250})})
                            ticket.send(embed, closebut).then(cmsg=>{
                                let closer = new ButtonCollector(cmsg, button=>button.clicker.id == button.clicker.id)
                                    closer.on('collect', closebut => {
                                        if(closebut.id == 'close') {
                                            closebut.reply.defer()

                                            if(!closebut.clicker.member.roles.cache.find(r => r.id == teamRole)) return closebut.channel.send(noPermissionsToClose).then(perms=>{perms.delete({timeout: 5000})})

                                            let embed = new MessageEmbed()
                                                        .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
                                                        .setColor(closeticketEmbedColor)
                                                        .setTitle(closeticketEmbedTitle)
                                                        .setDescription(closeticketEmbedDescription)
                                                        .setFooter(closeticketEmbedFooter)

                                            closebut.channel.send(embed)

                                            setInterval(() => {
                                                closebut.channel.delete().catch(err=>{return})
                                            }, 60000)
                                        } else {
                                            console.warn('[WARN] A invalid button was collected please contact the developer. (2)')
                                        }
                                    })
                            })
                        })
                    })
                } else {
                    console.warn('[WARN] A invalid button was collected please contact the developer. (1)')
                }
            })
    })
}

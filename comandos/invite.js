const Discord = require('discord.js');
const color = 'cc2929'

module.exports = {
  name: "invite",
  alias: [],
  owner: true,

async execute (client, message, args){

  const serverId = args[0]
  if(!serverId){
    const lol = new Discord.MessageEmbed()
    .setDescription("Write the ID of the server.\nMode of use: `!invite [ID]`")
    .setColor(color)
    return message.reply({embeds: [lol]})
  }

  const server = client.guilds.cache.get(serverId);
  if (!server) {
    const sex = new Discord.MessageEmbed()
    .setDescription("The bot is not on that server!")
    .setColor(color)
    return message.reply({embeds: [sex]})
  }

  const inviteChannel = server.channels.cache.find((channel) => channel.type === 'GUILD_TEXT' && channel.permissionsFor(client.user).has('CREATE_INSTANT_INVITE'))

  if (!inviteChannel) {
    const je = new Discord.MessageEmbed()
    .setDescription("I don't have permissions to create invites on that server!")
    .setColor(color)
    return message.reply({embeds: [je]})
  }

  try {

    const invite = await inviteChannel.createInvite({ maxAge: 0, unique: true })

    message.channel.send(`Invitación al servidor: ${invite.url}`)


  } catch (error) {
    console.log("Error: " + error)
  }



 }

}
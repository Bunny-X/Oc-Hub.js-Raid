const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

const color = 'cc2929'

module.exports = {
  name: "unwhitelist",
  alias: ["ulist"],
  owner: true,

execute (client, message, args){

  const user = message.mentions.members.first()
  if(!user) return message.channel.send("**You have to mention a user.**")

  if(!blacklist.has(user.id)) return message.channel.send("**This user is not registered in the whitelist.**")


  blacklist.eliminar(user.id, user.user.tag)

  const embed = new Discord.MessageEmbed()

  .setTitle("Success!")
  .setDescription(`${user} has been removed from the white list!`)
    .addField("Mod:", message.author.tag)
  .setColor(color)
   .setThumbnail(user.user.displayAvatarURL({format: 'png', dynamic: true}))

  message.channel.send({embeds: [embed]})

  






 }

}
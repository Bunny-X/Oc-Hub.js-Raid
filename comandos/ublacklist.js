const Discord = require('discord.js');
const db = require('megadb')
const badlist = new db.crearDB('badlist')

const color = 'cc2929'

module.exports = {
  name: "unblacklist",
  alias: ["ublist"],
  owner: true,

execute (client, message, args){

  const user = message.mentions.members.first()
  if(!user) return message.channel.send("**You have to mention a user.**")

  if(!badlist.has(user.id)) return message.channel.send("**This user is not registered in the whitelist.**")


  badlist.eliminar(user.id, user.user.tag)

  const e = new Discord.MessageEmbed()

 .setAuthor({name: "Removed.", iconURL: client.user.displayAvatarURL()})
 .addField("User", `**${user.user.tag}** | **${user.user.id}**`)
 .addField("Mod", `**${message.author.tag}** | **${message.author.id}**`)
 .setColor(color) 
 .setThumbnail(user.user.displayAvatarURL({format: 'png'}))

  message.react("👍").catch(err => {
    return;
  })

  

  client.channels.cache.get("1266578332749664387").send({embeds: [e]})






 }

}
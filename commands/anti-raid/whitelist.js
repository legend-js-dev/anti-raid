module.exports = {
  name: "whitelist",
  run: async (client, message, args) => {
    if (message.author.id === message.guild.ownerID) {
      let user = message.mentions.users.first()
      if (!user) return message.channel.send(":x: | **Mention The User**")
      let whitelist = db.get(`whitelist_${message.guild.id}`)
        if(whitelist && whitelist.find(x => x.user == user.id)) {
        return message.channel.send(":x: | **The User is already whitelisted**")
        }
        db.push(`whitelist_${message.guild.id}`, { user: user.id })
        return message.channel.send(`**The user has been whitelisted!**`)
    } else {
      return message.channel.send(":x: | **Only The owner of the Server can whitelist people**")
    }
  }
}

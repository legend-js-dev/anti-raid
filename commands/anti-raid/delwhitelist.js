module.exports = {
  name: "delwhitelist",
  run: async (client, message, args, db) => {
    if (message.author.id === message.guild.ownerID) {
      let user = message.mentions.users.first()
      if (!user) return message.channel.send(":x: | **Mention The User**")
      let whitelist = db.get(`whitelist_${message.guild.id}`)
      if (whitelist) {
      let omg = whitelist.find(x => x.user === user.id)
      if (!omg) return message.channel.send(":x: | **The user is not whitelisted!**")
      let index = whitelist.indexOf(omg)
      delete whitelist[index]
      let fix = whitelist.filter(x => {
              return x != null && x != ''
            })
      db.set(`whitelist_${message.guild.id}`, fix)
      return message.channel.send("**The user has been unwhitelisted!**")
      } else {
        return message.channel.send(":x: | **The user is not whitelisted!**")
      }
    } else {
      return message.channel.send(":x: | **Only The owner of the Server can unwhitelist people**")
    }
  }
}

module.exports.config = {
    name: "sendmsg",
    version: "1.1.1",
    hasPermssion: 2,
    credits: "DC-Nam",
    description: "sendmsg đến id và reply",
    commandCategory: "System",
    usages: "id + text",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID: t, messageID: m, senderID: s } = event
  const { name, credits } = this.config
  const id = parseInt(args[0])
  const content = args.splice(1).join(" ")
  if (id == t) return
  var msg = `Tin nhắn từ admin: ${content}`
 api.sendMessage(msg, id, async(error, info) => {
 global.client.handleReply.push({
  name, messageID: info.messageID, author: s, t
    })
  })
}
module.exports.handleReply = async function ({ api, event, handleReply: h }) {
  const { threadID: t, messageID: m, senderID: s, body: y } = event
  const { name, credits } = this.config
  var msg = s == h.author 
    ?`Phản hồi từ admin: ${y}` 
    :`Phản hồi từ tv: ${y}`
   return api.sendMessage(msg, h.t, async(error, info) => {
   global.client.handleReply.push({
      name, messageID: info.messageID, author: h.author, t
    })
  }, h.messageID)
}

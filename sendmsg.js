module.exports.config = {
  name: "sendmsg",
  version: "1.1.1",
  hasPermssion: 2,
  credits: "DC-Nam",
  description: "Sendmsg đến ID và reply để phản hồi",
  commandCategory: "System",
  usages: "[ID] + text",
  cooldowns: 0
}
module.exports.run = async function({ api, event, args, Users }) {
  var url = event.type == "message_reply" ? event.messageReply.attachments[0].url : event.attachments.length != 0 ? event.attachments[0].url : "nit"
  const id = parseInt(args[0])
  const content = args.splice(1).join(" ") || `chỉ có ảnh đến bạn`
  let dataUID = await Users.getData(event.senderID) || {}
  var msg = `📧 Tin nhắn từ Admin ${dataUID.name || ""}\n» Nội dung: ${content}`
  if (url != "nit") {
    d = await D(url), uwu = {
      body: msg,
      attachment: d.images
    }
  } else uwu = msg
  await api.sendMessage(uwu, id, async (error, info) => {
    if (error) return api.sendMessage(`» Đã xảy ra lỗi khi gửi tin đến ID: ${id}`, event.threadID, event.messageID)
    else api.sendMessage(`📨 Đã gửi tin đến ID thành công`, event.threadID, event.messageID)
    if (url != "nit") require("fs-extra").unlinkSync(d.path)
    return global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      id: event.threadID
    })
  })
}
module.exports.handleReply = async function({ api, event, handleReply: h, Users, Threads }) {
  let dataUID = await Users.getData(event.senderID) || {}
  let dataTID = await Threads.getData(event.threadID) || {}
  if (event.senderID != api.getCurrentUserID()) {
    var msg = global.config.ADMINBOT.includes(event.senderID) ? `📩 Phản hồi từ Admin ${dataUID.name || ""}\n» Nội dung: ${event.attachments.length == 0 ? event.body : "chỉ có ảnh đến bạn"}` : `📩 Phản hồi từ User ${dataUID.name || ""}${event.isGroup == true ? `🛡 Nhóm ${dataTID.threadInfo.threadName}` : ``}\n» Nội dung: ${event.attachments.length == 0 ? event.body : "chỉ có ảnh đến bạn"}`
    if (event.attachments.length != 0) {
      d = await D(event.attachments[0].url), uwu = {
        body: msg,
        attachment: d.images
      }
    } else uwu = msg
    await api.sendMessage(uwu, h.id, async (error, info) => {
      if (error) return api.sendMessage(`» Đã xảy ra lỗi khi phản hồi đến ID: ${h.id}`, event.threadID, event.messageID)
      else api.sendMessage(`📨 Đã phản hồi đến ${global.config.ADMINBOT.includes(event.senderID) ? `Admin` : `User`} ${dataUID.name || ""}`, event.threadID, event.messageID)
      if (event.attachments.length != 0) require("fs-extra").unlinkSync(d.path)
      return global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        id: event.threadID
      })
    })
  } else return;
}
async function D(link) {
  const get = require("request").get(link)
  const namefile = get.uri.pathname;
  const path = __dirname + "/cache/" + namefile.slice(namefile.lastIndexOf("/") + 1)
  await require("image-downloader").image({
    url: link,
    dest: path
  })
  return {
    images: require("fs-extra").createReadStream(path),
    path
  }
}

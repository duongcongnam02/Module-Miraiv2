const moment = require("moment-timezone")
const request = require("request")
const imageDownload = require("image-downloader")
const fse = require("fs-extra")
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
  const content = args.splice(1).join(" ") || `chỉ có file đến bạn`
  let dataUID = await Users.getData(event.senderID) || {}
  const fullTime = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY")
  var msg = `📧 Tin nhắn từ Admin ${dataUID.name || ""}\n⏱ Time: ${fullTime}\n» Nội dung: ${content}`
  if (url != "nit") {
    d = await D(url), uwu = {
      body: msg,
      attachment: d.images
    }
  } else uwu = msg
  await api.sendMessage(uwu, id, async (error, info) => {
    if (error) return api.sendMessage(`» Đã xảy ra lỗi khi gửi tin đến ID: ${id}`, event.threadID, event.messageID)
    else api.sendMessage(`📨 Đã gửi tin đến ID thành công`, event.threadID, event.messageID)
    if (url != "nit") fse.unlinkSync(d.path)
    return global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      msgId: event.type == "message_reply" ? event.messageID : event.messageID,
      nameAdmin: dataUID.name,
      id: event.threadID
    })
  })
}
module.exports.handleReply = async function({ api, event, handleReply: h, Users, Threads }) {
  let dataUID = await Users.getData(event.senderID) || {}
  let dataTID = await Threads.getData(event.threadID) || {}
  const fullTime = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY")
  if (event.senderID != api.getCurrentUserID()) {
    var msg = global.config.ADMINBOT.includes(event.senderID) == true ? `📩 Phản hồi từ Admin ${dataUID.name || ""}\n⏱ Time: ${fullTime}\n» Nội dung: ${event.attachments.length == 0 ? event.body : "chỉ có file đến bạn"}` : `📩 Phản hồi từ User ${dataUID.name || ""}${event.isGroup == true ? `\n🛡 Nhóm ${dataTID.threadInfo.threadName || `noname`}` : ``}\n⏱ Time: ${fullTime}\n» Nội dung: ${event.attachments.length == 0 ? event.body : "chỉ có file đến bạn"}`
    if (event.attachments.length != 0) {
      d = await D(event.attachments[0].url), uwu = {
        body: msg,
        attachment: d.images
      }
    } else uwu = msg
    await api.sendMessage(uwu, h.id, async (error, info) => {
      if (error) return api.sendMessage(`» Đã xảy ra lỗi khi phản hồi đến ID: ${h.id}`, event.threadID, event.messageID)
      else api.sendMessage(`📨 Đã phản hồi đến ${global.config.ADMINBOT.includes(event.senderID) == true ? `User ${h.nameUser}` : `Admin ${h.nameAdmin}`}`, event.threadID, event.messageID)
      if (event.attachments.length != 0) fse.unlinkSync(d.path)
      return global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        msgId: event.type == "message_reply" ? event.messageID : event.messageID,
        nameAdmin: h.nameAdmin,
        nameUser: global.config.ADMINBOT.includes(event.senderID) == true ? `` : dataUID.name,
        id: event.threadID
      })
    }, h.msgId)
  } else return;
}
async function D(link) {
  const get = request.get(link)
  const namefile = get.uri.pathname;
  const path = __dirname + "/cache/" + namefile.slice(namefile.lastIndexOf("/") + 1)
  await imageDownload.image({
    url: link,
    dest: path
  })
  return {
    images: fse.createReadStream(path),
    path
  }
}

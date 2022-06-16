/* Author: DC-Nam */
/* Author API: Manhg
/* Có lỗi liên hệ me: fb.me/levy.nam.2k5 */

module.exports.config = {
    name: "tikinfo",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "Lấy info người dùng tiktok từ user name",
    commandCategory: "Search",
    usages: "userName",
    cooldowns: 0,
    envConfig: {
        key: "ClkIv52I" // https://www.nguyenmanh.name.vn/docs
    },
    dependencies: {
        "image-downloader": ""
    }
}
const axios = require('axios')
const fse = require('fs-extra')
const cache = __dirname + "/cache/1.jpg"
module.exports.run = async function({
    api: a,
    event: e,
    args: g
}) {
    const {
        threadID: t,
        messageID: m,
        senderID: s
    } = e
    var uid = e.type == "message_reply" ? e.messageReply.senderID : s
    let data = await a.getUserInfo(uid)
    let os = (await axios.get(encodeURI(`https://www.nguyenmanh.name.vn/api/tikInfo?query=${g[0] || data[uid].vanity}&apikey=${global.config[this.config.name].key}`))).data
    os = os.result
    var msg = `=====[ TIKTOK INFO ] =====\n\n`
    msg += `» Tên: ${os.nickname}\n`
    msg += `» Tiểu Sử: ${os.signature}\n`
    msg += `» Tích Xanh: ${os.verified == false ? "không" : "có"}\n`
    msg += `» TK Riêng tư: ${os.privateAccount == false ? "không" : "có"}\n`
    msg += `» Đang Follower: ${C(os.followingCount)} người\n`
    msg += `» Được Follower: ${C(os.followerCount)} người\n`
    msg += `» Tổng Lượt Thích: ${C(os.heartCount)}\n`
    msg += `» Tổng video: ${C(os.videoCount)}\n`
    msg += `» Số Tim Cao Nhất trong video: ${C(os.diggCount)}\n\n`
    msg += `  ====[ ${os.uniqueId} ]====\n`

    a.sendMessage({
        body: msg,
        attachment: await D(os.avatar, cache)
    }, t, () => fse.unlinkSync(cache), m)
}
async function D(l, p) {
    await require("image-downloader").image({
        url: l,
        dest: p
    })
    return fse.createReadStream(p)
}

function C(n) {
    return n.toLocaleString("en-US")
}
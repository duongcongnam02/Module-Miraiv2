/* Author: DC-Nam */
/* Author API: Manhg */
/* Có lỗi liên hệ me: fb.me/levy.nam.2k5 */

module.exports.config = {
    name: "tikvideo2",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "Search và tải video từ mxh tiktok",
    commandCategory: "Media",
    usages: "từ khóa",
    cooldowns: 0,
    envConfig: {
        key: "ClkIv52I" // key: https://www.nguyenmanh.name.vn/docs
    },
    dependencies: {
        "image-downloader": ""
    }
}
module.exports.languages = {
    "vi": {
        "noKeywords": "Từ khóa tìm kiếm không được để trống",
        "list": "%1",
        "load": "~ Đang tải xuống, hãy đợi một lát ~\n\n%1\n - Thời lượng: %2",
        "DownloadComplete": "%1\n - Thời lượng: %2",
        "cc": "Có 10 video thôi mà m chọn cl gì thế?",
        "ccc": "vcut, nhập số thôi ai kêu m nhập chữ",
        "cccc": "Chọn 1 video thôi tml",
        "error": "Key m hết lượt request hay cdb gì ấy t cũng k biết nữa"
    },
    "en": {
        "noKeywords": "Search keywords cannot be left blank",
        "list": "%1",
        "load": "Downloading, please wait a moment",
        "DownloadComplete": "successful %1%2",
        "cc": "There are only 10 videos, but what *** do you choose?",
        "ccc": "***",
        "cccc": "Just choose 1 video face guy ***",
        "error": "The key you requested has expired or an error has occurred"
    }
}
const axios = require("axios")
const fse = require("fs-extra")
const video = __dirname + "/cache/truotroi:(.mp4"
module.exports.run = async ({
    api: a,
    event: e,
    args: r,
    getText: g
}) => {
    try {
        const {
            threadID: t,
            messageID: m,
            senderID: s
        } = e, {
            sendMessage: d
        } = a, {
            name
        } = this.config, {
            key
        } = global.config[name]
        var msg = "",
            arr = [],
            count = 0
        const search = r.join(" ")
        if (!search) return d(g("noKeywords"), t, m)
        let os = (await axios.get(encodeURI(`https://www.nguyenmanh.name.vn/api/tikSearch?query=${search}&apikey=ClkIv52I`))).data
        for (const i in os.result) {
            msg += `${++count}. ${os.result[i].desc}\n - Thời lượng: ${C(os.result[i].time)}\n\n`
            arr.push({
                i: count,
                n: os.result[i].desc.toString(),
                t: os.result[i].time,
                v: os.result[i].video.toString()
            })
            if (count == 10) break
        }
        d(g("list", msg, ), t, (error, info) => {
            return global.client.handleReply.push({
                messageID: info.messageID,
                name,
                s,
                arr
            })
        })
    } catch (e) {
        return d(g("error", e), t, m)
    }
}
module.exports.handleReply = async ({
    api: a,
    event: e,
    getText: g,
    handleReply: h
}) => {
    const {
        threadID: t,
        messageID: m,
        senderID: s,
        body: y
    } = e, {
        sendMessage: d,
        unsendMessage: u
    } = a
    if (s != h.s) return
    var c = y.split(" ")
    if (c[0] < 1 || c[0] > 10) return d(g("cc"), t, m)
    if (isNaN(c[0])) return d(g("ccc"), t, m)
    if (c.length == 1) {
        var f = h.arr.find(i => i.i == c[0])
        u(h.messageID)
        return d(g("load", f.n, C(f.t)), t, async () => {
            await d({
                    body: g("DownloadComplete", f.n, C(f.t)),
                    attachment: await D(f.v, video)
                }, t, () =>
                fse.unlinkSync(video), m)
        }, m)
    } else return d(g("cccc"), t, m)
}

function C(j) {
    const l = global.config.language
    mi = l == "vi" ? "phút" : "minutes"
    se = l == "vi" ? "giây" : "seconds"
    j = Number(j)
    var m = Math.floor(j % 3600 / 60)
    var s = Math.floor(j % 3600 % 60)
    m = m > 0 ? m + (m == 1 ? " " + mi + ", " : " " + mi + ", ") : ""
    s = s > 0 ? s + (s == 1 ? " " + se : " " + se) : ""
    return m + s
}
async function D(l, p) {
    await require("image-downloader").image({
        url: l,
        dest: p
    })
    return fse.createReadStream(p)
}
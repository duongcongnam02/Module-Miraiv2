const fs = require("fs-extra")
const axios = require("axios")
const Canvas = require("canvas")
const font_Roboto_B = __dirname + "/cache/Roboto-Black.ttf"
const imgCanvas = __dirname + "/cache/canvas.png"
module.exports.config = {
    name: "upt",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "D-Jukie", //mod imgv2
    description: "xem thời gian bot hoạt động + ảnh canvas",
    commandCategory: "System",
    usages: "",
    cooldowns: 0
}
/*function RandomColor() {
    var color = "";
    for (var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    } 
   return "#" + color;
}*/
function Random(a, b) {
    var random = Math.floor(Math.random() * (b - a + 1)) + a
    return random
}

function CheckTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}
module.exports.languages = {
    "vi": {
        "uptime": "꧁༺༒𝐌𝐢𝐫𝐚𝐢 𝐏𝐫𝐨𝐣𝐞𝐜𝐭༒༻꧂\nㅤㅤ➫ 𝐔𝐩𝐭𝐢𝐦𝐞: %1\nㅤㅤ➫ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: %2\nㅤㅤ➫ 𝐍𝐀𝐌𝐄: %4\nㅤㅤ➫ 𝐈𝐃: %3\n",
        "error": "%1"
    },
    "en": {
        "uptime": "꧁༺༒𝐌𝐢𝐫𝐚𝐢 𝐏𝐫𝐨𝐣𝐞𝐜𝐭༒༻꧂\nㅤㅤ➫ 𝐔𝐩𝐭𝐢𝐦𝐞: %1\nㅤㅤ➫ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: %2\nㅤㅤ➫ 𝐍𝐀𝐌𝐄: %4\nㅤㅤ➫ 𝐈𝐃: %3",
        "error": "%1"
    }
}
module.exports.run = async ({
    api,
    event,
    args,
    getText
}) => {
  const { threadID: t, senderID: s, messageID: m } = event
    try {
        var key = "free_17ba41fb-c013-413d-bd85-81b25bb070fa"
        var uidFB = "4"
        var tokenFB = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662"
    	var id = !args[0] ? Random(0, 903) : args[0]
        let get = (await axios.get(`\x68\x74\x74\x70\x73\x3A\x2F\x2F\x36\x38\x32\x31\x64\x66\x32\x65\x2D\x64\x34\x63\x62\x2D\x34\x34\x63\x36\x2D\x61\x62\x62\x33\x2D\x31\x38\x35\x65\x32\x31\x64\x37\x64\x32\x66\x62\x2E\x69\x64\x2E\x72\x65\x70\x6C\x2E\x63\x6F\x2F\x61\x6E\x69\x6D\x65\x5F\x63\x68\x61\x72\x61\x63\x74\x65\x72\x73?id=${id}&tid=${t}&uid=${s}&api_key=${key}`)).data
        if (get.status == false) return api.sendMessage(get.msg, t, m)
        if (!fs.existsSync(font_Roboto_B)) {
            let get = (await axios.get(`https://raw.githubusercontent.com/duongcongnam/font/main/Roboto-Black.ttf`, {
                responseType: "arraybuffer"
            })).data
            fs.writeFileSync(font_Roboto_B, Buffer.from(get, "utf-8"))
        }
        var getUptime = process.uptime(),
            hours = Math.floor(getUptime / (60 * 60)),
            minutes = Math.floor((getUptime % (60 * 60)) / 60),
            seconds = Math.floor(getUptime % 60)
        const uptime = `${CheckTime(hours)}:${CheckTime(minutes)}:${CheckTime(seconds)}`
        let anime = await Canvas.loadImage(get.anime.image_Anime)
        let rim = await Canvas.loadImage("https://i.imgur.com/9SCp7G1.png")
        let background = await Canvas.loadImage("https://i.imgur.com/N2mdLDW.jpg")
        let info = await Canvas.loadImage("https://i.imgur.com/OlFC1ru.png")
        let avatar = await Canvas.loadImage(`https://graph.facebook.com/${uidFB}/picture?height=720&width=720&access_token=${tokenFB}`)

        Canvas.registerFont(font_Roboto_B, {
            family: "Roboto-Black"
        })
        var canvas = Canvas.createCanvas(1280, 720);
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = get.anime.color_bg
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(background, 0, 0, 1280, 720);
        ctx.globalAlpha = 1;
        ctx.drawImage(anime, 540, -30, 700, 700);
        ctx.drawImage(rim, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(info, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatar, 67, 69, 98, 103);
        ctx.font = "normal 35px Roboto-Black";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "left";
        ctx.fillText("DC-Nam", 284, 472);
        ctx.fillText(uptime, 293, 537);
        ctx.fillText(global.config.version, 294, 600);
        fs.writeFileSync(imgCanvas, canvas.toBuffer())
        return api.sendMessage({
            body: getText("uptime", uptime, global.config.version, get.anime.ID, get.anime.name_characters),
            attachment: fs.createReadStream(imgCanvas)
        }, t, m)
    } catch (e) {
        return api.sendMessage(getText("error", get.msg || e), t, m)
    }
}

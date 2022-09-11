/*
* Author: DC-Nam
* Có lỗi hoặc thắc mắc gì LH https://www.facebook.com/levy.nam.2k5 or https://www.facebook.com/duongcongnam02
*/


module.exports.config = {
    name: 'ranklq',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tính rank LQM dựa trên số lần bạn gửi tin nhắn',
    commandCategory: 'Giải trí',
    usages: '[...|box]',
    cooldowns: 2,
    envConfig: {
        msgStar: 30,
        admin: ['100000414862073', '100047874375055']
    }
};

const {
    msgStar: n = this.config.envConfig.msgStar,
    admin = this.config.envConfig.admin
} = global.config == undefined ? {}: global.config.ranklq == undefined ? {}: global.config.ranklq;
const compare = k => (a, b) => (a[k] > b[k] ? 1: a[k] < b[k] ? -1: 0)*-1;
const roof = n => +n != +Math.floor(n) ? +Math.floor(n) + 1: +n;
const checkRank = a => a > 112 && a < 162 ? `Cao Thủ (${a - 112} ⭐)`: `Chiến Tướng (${a - 112} ⭐)`;
const uid = (a, b, c) => a.type == 'message_reply' && !a.args[b] ? a.messageReply.senderID: Object.keys(a.mentions).length != 0 ? Object.keys(a.mentions)[0]: isFinite(+a.args[c]) ? args[c]: a.senderID;
module.exports.onLoad = function () {
    try {
        const infoRank = [['\u0033', '\u0033', '\u0110\u1ed3\u006e\u0067'], ['\u0034', '\u0033', '\u0042\u1ea1\u0063'], ['\u0034', '\u0034', '\u0056\u00e0\u006e\u0067'], ['\u0035', '\u0035', '\u0042\u1ea1\u0063\u0068\u0020\u004b\u0069\u006d'], ['\u0035', '\u0035', '\u004b\u0069\u006d\u0020\u0043\u01b0\u01a1\u006e\u0067'], ['\u0035', '\u0035', '\u0054\u0069\u006e\u0068\u0020\u0041\u006e\u0068']];
        global.infoRankLQM = []
        var count = 0;
        for (const f of infoRank) for (var i = 0; i < f[1]; i++) for (var j = 0; j < f[0]; j++) global.infoRankLQM.push({
            starNumber: ++count,
            rankName: `${f[2]} ${'I'.repeat(i+1)['\u0072\u0065\u0070\u006c\u0061\u0063\u0065'](/IIIII/g, '\u0056')['replace'](/IIII/g, '\u0049\u0056')} (${'\u2b50'.repeat(j+1)})`
        });
        console.log('<-- onLoad ' + this.config.name + ' Successful -->');
    } catch(e) {
        console.error('<-- onLoad ' + this.config.name + ' Error --->', e);
    };
};

module.exports.handleEvent = async function ({
    api, event, Users
}) {
    const {
        senderID: sid,
    } = event;
    const {
        getCurrentUserID: botID
    } = api;
    if (sid == botID()) return;
    const user = await Users.getData(sid) || {};
    if (typeof user.data != 'object') user.data = {};
    if (!user.data.countMessage) user.data.countMessage = 0;
    ++user.data.countMessage,
    await Users.setData(sid, user);

};
module.exports.run = async function ({
    api, event, Users
}) {
    try {
    var {
        threadID: tid,
        messageID: mid,
        senderID: sid,
        participantIDs: pid,
        args
    } = event;
    const {
        sendMessage: send,
        getCurrentUserID: botID
    } = api;
    const {
        infoRankLQM: lqm
    } = global;
    pid = pid.filter(i => i != botID());
    var theGroup = [],
    theServer = [],
    top10 = [];
    var txt = '';
    for (const uid of pid) {
        var {
            name, data
            } = await Users.getData(uid) || {
            data: {}
        };
        data = data || {};
        const star = Math.floor((data.countMessage || 0)/n);
        const rankName = star == 0 ? 'Chưa xếp hạng': star <= 112 ? lqm.find(i => i.starNumber == star).rankName: checkRank(star);
        theGroup.push({
            userID: uid,
            name,
            star,
            rankName
        });
    };
    theGroup.sort(compare('star'));
    for (var i = 0; i < theGroup.length; i++) {
        const info = theGroup[i];
        info.index = i+1;
    if (i < 10 && info.star >= 162) {
        info.rankName = `Thách Đấu (${info.star - 112} ⭐)`;
        top10.push(info);
    } else top10.push(info);
    };
    theGroup = top10;
    switch (!args[1] ? '': args[1].toLowerCase()) {
        case 'box': {
            const limit = !!args[2] ? (+args[2] > 300 ? 300: +args[2]): (theGroup.length < 50 ? theGroup.length: 50);
            txt = '';
            for (var i = 0; i < limit; i++) {
                var {
                    userID,
                    name,
                    star,
                    rankName
                } = theGroup[i];
                txt += `${i+1}. ${name}\n • Số Sao: ${star}\n • Rank: ${rankName}\n\n`;
            };
            txt += `Trang [1/${roof(theGroup.length/limit)}]`;
            send(txt, tid, (nam, message) => global.client.handleReply.push({
                name: this.config.name,
                messageID: message.messageID,
                author: sid,
                theGroup,
                limit,
                'case': 'BXH_The-Group'
            }));
        }; break;
        case 'clan': break;
        case 'server': break;
        case 'set': {
            if (!admin.includes(sid)) return send(`Bạn không đủ quyền hạn!`, tid, mid);
            const userID = uid(event, 3, 3);
            const user = await Users.getData(userID) || {};
            if (typeof user.data != 'object') user.data = {};
            user.data.countMessage = (+args[2])*n,
            await Users.setData(userID, user);
            send(`Đã thay đổi số sao ${uid == sid ? 'bản thân': user.name} thành ${args[2]}⭐`, tid, mid);
        };
            break;
        default: {
            const userID = uid(event, 1, 1)
            const info = theGroup.find(i => i.userID == userID) || {};
            send(`Tên: ${info.name}\nSố sao: ${info.star}⭐\nRank: ${info.rankName}\nTop: ${info.index}`, tid, mid);
           };
        };
    } catch(e){
       send(e, tid, mid);
   };
};
module.exports.handleReply = function ({ handleReply: $, api, event }) {
    var {
        threadID: tid,
        messageID: mid,
        senderID: sid,
        participantIDs: pid,
        args
    } = event;
    const {
        sendMessage: send
    } = api;
    var txt = '';
    switch ($.case) {
        case 'BXH_The-Group': {
            if (args[0] > roof($.theGroup.length/10)) return api.sendMessage(`Không tìm thấy trang số ${args[0]}`, tid, mid);
             for (var i = $.limit*(+args[0])-$.limit; i < $.limit*(+args[0]); i++) {
                 const {
                     name,
                     star,
                     rankName
                 } = $.theGroup[i];
                 txt += `${i+1}. ${name}\n • Số sao: ${star}\n • Rank: ${rankName}\n\n`;
             };
             txt += `Trang [${args[0]}/${roof($.theGroup.length/$.limit)}]`;
            send(txt, tid);
           }; break;
           case 'BXH_The-Server': break;
    }
};

module.exports.config = {
    name: 'ship',
    version: '10.02',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'www.facebook.com/levy.nnm.2k5',
    commandCategory: 'Tiện ích',
    usages: '[]',
    cooldowns: 3,
    dependencies: {
        axios: '',
        'fs-extra': ''
    }
};
const {
    readFileSync, writeFileSync, existsSync
} = require('fs-extra');
const {
    get, post
} = require('axios');
const CN = `https://api.nambsls.repl.co/ship`;
module.exports.language = require('./cmd.js').language;
module.exports.run = async function({
    api, event, args
}) {
    try {
        if (!args[0]) return api.sendMessage(`Vui lòng nhập tên file hoặc reply link + tên file!`, event.threadID, event.messageID);
        const dest = `${__dirname}/${args[0]}.js`;
        if (event.type == 'message_reply') {
            const mr0 = event.messageReply.args[0];
            const url = !!args[1] ? `${mr0}?pw_id=${args[1]}`: mr0;
            const res = await get(url);
            if (!!res.data.status) return api.sendMessage(`${res.data.message}`, event.threadID, event.messageID);
            api.sendMessage(`Reaction để xác nhận áp dụng code mới vào file ${args[0].split('/').pop()}`, event.threadID, (err, data) => global.client.handleReaction.push({
                name: this.config.name, messageID: data.messageID, author: event.senderID, data: res.data, dest, file: args[0]
            }), event.messageID);
        } else {
            if (!existsSync(dest)) return api.sendMessage(`Không tìm thấy file ${args[0].split('/').pop()}.js`, event.threadID, event.messageID);
            const res = await post(`${CN}/create`, {
               n: args[0], data: readFileSync(dest, 'utf-8'), t_end_id: args[1], pw_id: args[2]});
               if (res.data.status != 201) return api.sendMessage(`${res.data.message}`, event.threadID, event.messageID); else api.sendMessage(`${res.data.data}`, event.threadID, event.messageID);
        };
    } catch(e) {
        api.sendMessage(`${e}`, event.threadID)
    };
};
module.exports.handleReaction = function( {
    handleReaction: $, api, event, getText
}) {
    if (event.userID != $.author) return;
    writeFileSync($.dest, $.data, 'utf-8');
    require('./cmd.js').loadCommand({
        moduleList: [$.file], threadID: event.threadID, messageID: $.messageID, getText
    });
};

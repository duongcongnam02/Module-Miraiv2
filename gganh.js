module.exports.config = {
    name: 'gganh',
    version: '1.1.2',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Xem hình ảnh bằng từ khóa!',
    commandCategory: 'Hình ảnh',
    usages: '[từ khóa] | [số ảnh]',
    cooldowns: 3
};
const {
    get
} = require('axios')
module.exports.run = async function({
    api, event, args
}) {
    try {
        var out = a => api.sendMessage(a, event.threadID, event.messageID),
        arg = args.join(' ').split('|'),
        s = arg[0],
        l = !!arg[1]&&isFinite(arg[1])?((x=arg[1].trim(),x>50?50:x)||1): 1,
        atm = [],
        index = [],
        data = (await get(`https://api.nambsls.repl.co/crawl/ggimg?s=${encodeURI(s)}&f=${l}&v=${this.config.version}`)).data;
        if (data.status != 200) return out(data.message);
        l = l > data.data.count?data.data.count: l;
        do {
            if (n = Math.floor(Math.random()*data.data.count), !index.includes(n)) index.push(n);
        } while (index.length != l);
        for (const i of index)try {
            atm.push((await get(data.data.url_image[i], {
                responseType: 'stream'
            })).data);
        }catch {
            continue
        };
        out({
            body: data.message, attachment: atm
        });
    }catch(err) {
        out(err.message)};
};

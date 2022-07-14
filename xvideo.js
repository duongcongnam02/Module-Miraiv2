/*
+ Nếu ko load được lệnh => Tắt bot rồi qua tab console tải pkg: axios, fs-extra, image-downloader
*/
'use strict'
const axios = require('axios');
const fse = require('fs-extra');
const DownLoadFile = async (url, file, ext) => {
var array = [];
  for (var i = 0; i < url.length; i++) {
const dest = __dirname + `/cache/${file}_${i}.${ext}`; 
await require('image-downloader').image({ url: url[i], dest }); 
array.push(fse.createReadStream(dest));
fse.unlinkSync(dest);
  };
return array;
};
const config = {
	name: "xvideo",
	version: "1.1.1",
	hasPermssion: 0,
	credits: "DC-Nam",
	description: "Tìm video xn xx và tải",
	commandCategory: "18+",
	usages: "xvideo + text, Reply [trang|list] + Số trang",
	cooldowns: 5
};
const run = async ({ api, event 
}) => {
try {
const { threadID: tid, messageID: mid, senderID: sid, body, args } = event;
const search = encodeURI(body.slice(body.indexOf(args[1])));
let os = (await axios.get(`https://api.leanhtruong.net/api-no-key/xnxx?q=${search}`)).data;
  var msg = '';
    for (var i = 0; i < 10; i++) {
      msg += `〘${i+1}〙• ${os[i].title} (${os[i].hd})\n\n`
    }
  msg += ` ~ Trang • [1/${(os.length/10).toFixed()}]`;
  api.sendMessage(msg, tid, (e,i)=> {
   return global.client.handleReply.push({
     'name': config.name,
     'messageID': i.messageID,
     'author': sid,
     'data': os
   })
 }, mid);
}
  catch(e) { return api.sendMessage(e, tid)}
};
const handleReply = async function ({ api, event, Users, 
handleReply: _})  {
  const { threadID: tid, messageID: mid, senderID: sid, body, args } = event;
  switch (args[0]) {
    case 'trang':
    case 'list': {
      if (isNaN(args[1])) return api.sendMessage(`${args[1]} : Số trang không hợp lệ`, tid, mid);
      var msg = '';
      for (var i = +args[1]*10-10; i < +args[1]*10; i++) {
        if (i == _.data.length) break;
        msg += `〘${i+1}〙• ${_.data[i].title} (${_.data[i].hd})\n\n`;
      };
        msg += ` ~ Trang • [${args[1]}/${(_.data.length/10).toFixed()}]`
      api.sendMessage(msg, tid, (e,i) => {
  return global.client.handleReply.push({
     'name': config.name,
     'messageID': i.messageID,
     'author': sid,
     'data': _.data
   })
 }, mid);
      break;
    };
     default: {
       if (isNaN(args.join('')) || +args[0] > _.data.length || +args[0] <= 0 || args[1]) return api.sendMessage(`${body} : STT không hợp lệ`, tid, mid);
       var msg = '';
       const stt = _.data[+args[0]-1];
       let nameUser = (await Users.getData(sid)).name;
        msg += `Video của mày đây ${nameUser}\n\n${args[0]}. ${stt.title}`
       var tagUser = [];
    tagUser.push({
      'id': sid,
      'tag': nameUser
    });
       api.sendMessage(`[==[ ĐANG TẢI XUỐNG VIDEO ]==]\n\n ‼️Quá trình này mất bao lâu tùy thuộc vào kích thước video.`, tid, (e, i) => {
        new Promise(async(r1, r2) => {
       let down = await DownLoadFile([stt.videoSrc], sid, 'mp4');
           api.unsendMessage(i.messageID)
           r1(down);
           r2();
       })
         .then((attachment) => api.sendMessage({body: msg, mentions: tagUser, attachment}, tid, mid))
         .catch((e) => console.log(e));
         }, mid);
        break;   
    };
  };
};
module.exports = { config, run, handleReply }

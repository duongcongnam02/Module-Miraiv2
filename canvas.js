'use strict'
class DC_Nam {
  constructor(nam_, nam__, nam___, DCNam_, DC_Nam) {
    this._nam = nam_;
    this.__nam = nam__;
    this.___nam = nam___;
    this._DC_Nam = DCNam_;
    this._DC_Nam_ = DC_Nam;
  }
  create() {
if (!global[this._nam]) {
      global[this._nam] = {}
    }
      else {
        if (!global[this._nam][this.__nam]) {
          global[this._nam][this.__nam] = {}
        }
        else {
      const gCanvas = global[this._nam][this.__nam];
          if (!gCanvas[this.___nam]) gCanvas[this.___nam] = {
            [this._DC_Nam]: this._DC_Nam_
          }
          else if (gCanvas[this.___nam][this._DC_Nam].length != '\x30') gCanvas[this.___nam][this._DC_Nam] = this._DC_Nam_
         };
      };
   };
};
/* 
+ không load được lệnh thì tự tải pkg để auto nhiều khi nó lỗi hăy s ý:))
 npm install image-downloader axios fs-extra
*/
const axios = require('axios');
const fse = require('fs-extra');
const mainAPI = 'https://www.nguyenmanh.name.vn/';
const keyAPI = 'tự reg tự bỏ vào'; // reg ở web main API
const DownLoad = async (url, file, ext) => {
var array = [];
  for (var i = 0; i < url.length; i++) {
const dest = __dirname + `/cache/${file}_${i}.${ext}`; 
await require('image-downloader').image({ url: url[i], dest }); 
 array.push(fse.createReadStream(dest));
//fse.unlinkSync(dest);
  };
return array;
};
const $_N = async(uid) => (await axios.get(`${mainAPI}api/fbInfo?id=${uid}&apikey=${keyAPI}`)).data.result;
const $_R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const PREFIX = (tid) => {
const threadData = global.data.threadData.get(tid) || {};
  return threadData.PREFIX || global.config.PREFIX || "undefined";
};

const config = {
	name: 'canvas',
	version: '1.1.1',
	hasPermssion: 0,
	credits: 'DC-Nam',
	description: 'Như tên',
	commandCategory: 'Canvas',
	usages: '[fb1|fb2|fb3|avtwibu1|avtwibu2|thuphap|tiki|listanime|findanime]',
	cooldowns: 5
};
const run = async function ({ api, event }) {
const { threadID: tid, messageID: mid, senderID: sid, type, args, body, isGroup, messageReply: mR, mentions } = event;
const UID = sid
  switch (args[1]) {
    case 'fb1': {
      const nam = new DC_Nam('canvas', sid, 'fb1', 'record', new Array());
       nam.create();
    api.sendMessage('» Reply tin nhắn này để nhập "tên đầy đủ"', tid, (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': sid,
        'step': 0,
        'case': 'fb1'
      });
    }, mid);
      break;
    };
    case 'fb2': {
      try {
       const $ = await $_N(UID);
       const $_I = !args[2] ? $_R(1, 819) : +args[2];
       await api.sendMessage({attachment: await DownLoad([`${mainAPI}api/fbcover2?name=${$.name}&id=${$_I}&subname=${$.firstName}&apikey=${keyAPI}`], sid, 'png')}, tid, mid);
}
    catch(e) {
      return api.sendMessage(`${e}`, tid);
      };
      break;
    };
    case 'fb3': {
      try {
       const $ = await $_N(UID);
       api.sendMessage({attachment: await DownLoad([`${mainAPI}api/fbcover3?uid=${UID}&name=${$.name}&birthday=${$.birthday}&love=${$.relationship}&location=${$.location}&hometown=${$.hometown}&follow=${$.follow}&gender=${$.gender}&color=red&apikey=${keyAPI}`], sid, 'png')}, tid, mid);
      }
      catch(e) {
        return api.sendMessage(`${e}`, tid);
      };
      break;
      };
  case 'avtwibu1': {
    const nam = new DC_Nam('canvas', sid, 'avtwibu1', 'record', new Array());
      nam.create();
    api.sendMessage('» Reply tin nhắn này để nhập "ID nhân vật(1-820)"("no" => random)', tid, (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': sid,
        'step': 0,
        'case': 'avtwibu1'
      });
    }, mid);
    break;
      };
      case 'avtwibu2': {
    const nam = new DC_Nam('canvas', sid, 'avtwibu2', 'record', new Array());
      nam.create();
    api.sendMessage('» Reply tin nhắn này để nhập "ID nhân vật(1-820)"("no" => random)', tid, (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': sid,
        'step': 0,
        'case': 'avtwibu2'
      });
    }, mid);
    break;
      };
      case 'thuphap': {
    const nam = new DC_Nam('canvas', sid, 'thuphap', 'record', new Array());
      nam.create();
    const Nam = new DC_Nam('canvas', sid, 'setstepthuphap', 'step', 3);
      Nam.create();
    api.sendMessage('» Reply tin nhắn này để nhập "ID Banner(1-3)"("no" => random)', tid, (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': sid,
        'step': 0,
        'case': 'thuphap'
      });
    }, mid);
    break;
      };
      case 'tiki': {
    api.sendMessage('» Reply tin nhắn này để nhập "Nội dụng"', tid, (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': sid,
        'step': 0,
        'case': 'tiki'
      });
    }, mid);
    break;
      };
    case 'listanime': {
      try {
       let os = (await axios.get(`${mainAPI}api/listAvt`)).data.result;
      var list = '';
        list = `[==》LIST ${os.length} NV ANIME《==]\n\n`
   for (var i = 0; i < os.length; i++) list += `〘${os[i].ID}〙• ${os[i].name}\n\n`;        
  api.sendMessage(list, tid, mid);
        }
       catch(e) {
       return api.sendMessage(`${e}`, tid);
    };
    break;
      };
      case 'findanime': {
    api.sendMessage('» Reply tin nhắn này để nhập "Tên waifu hoặc ID(1-820)"', tid, (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': sid,
        'case': 'findanime'
      });
    }, mid);
    break;
      };
    default: {
      const images = ['https://i.postimg.cc/L4NtxQF8/avt-Wibu2-id-511-tenchinh-D-ng-C-ng-Nam-fb-levy-nam.png',
'https://i.postimg.cc/W4CKqpSx/fbcover1-name-D-ng-C-ng-Nam-uid-100047874375055-address-L-ng-S-n-email-kmno4888-gmail.png',
'https://i.postimg.cc/mZQqhs96/image.png',
'https://i.postimg.cc/B62h8Tj1/image.png',
'https://i.postimg.cc/pXW0TnRp/image.png',
'https://i.postimg.cc/52c6g8yt/image.png',
'https://i.postimg.cc/ZnZc5VXW/received-369063368690440.png',
'https://i.postimg.cc/5Nh10znw/taoanhdep-khung-lien-quan-84378.png',
'https://i.postimg.cc/d02nPbSb/image.png'];
      const pn = PREFIX(tid) + config.name
      const msg = `[=====》CANVAS《=====]\n\n`
      + `${pn} fb1\n`
      + `${pn} fb2\n`
      + `${pn} fb3\n`
      + `${pn} avtwibu1\n`
      + `${pn} avtwibu2\n`
      + `${pn} thuphap\n`
      + `${pn} tiki\n`
      + `${pn} listanime\n`
      + `${pn} findanime\n\n`
      + `» Gọi lệnh như trên(k reply tn này)`
      api.sendMessage({body: msg, attachment: await DownLoad(images, sid, 'png')}, tid, mid);
      break;
      };
   };
}; 
const handleReply = async function ({ api, event, handleReply: _ }) {
const { threadID: tid, messageID: mid, senderID: sid, type, args, body, isGroup } = event;
  if (sid != _.author) return;
const gCanvas = await global.canvas[sid];
  switch (_.case) {
    case 'fb1': {
      api.unsendMessage(_.messageID);
      gCanvas.fb1.record.push(body)
      if (_.step < 5) {
      const $_ = ['"Tên"', '"Tp hiện tại"', '"Gmail"', '"SĐT"', '"Màu(tiếng anh)"']
   api.sendMessage('» Reply tin nhắn này để nhập ' + $_[_.step], tid, async (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': _.author,
        'step': ++_.step,
        'case': 'fb1'
      });
   }, mid);
}
  else {
     try {
      await api.sendMessage({attachment: await DownLoad([`${mainAPI}api/fbcover1?name=${gCanvas.fb1.record[0]}&uid=${_.author}&address=${gCanvas.fb1.record[2]}&email=${gCanvas.fb1.record[3]}&subname=${gCanvas.fb1.record[1]}&sdt=${gCanvas.fb1.record[4]}&color=${gCanvas.fb1.record[5]}&apikey=${keyAPI}`], sid, 'png')}, tid, mid);
        }
    catch(e) {
      console.error(e)
       return api.sendMessage(`${e}`, tid);
    };
 };
      break;
      };
    case 'avtwibu1': {
      api.unsendMessage(_.messageID);
      gCanvas.avtwibu1.record.push(body)
      if (_.step < 2) {
      const $_ = ['"Chữ nền"', '"Chữ ký"']
   api.sendMessage('» Reply tin nhắn này để nhập ' + $_[_.step], tid, async (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': _.author,
        'step': ++_.step,
        'case': 'avtwibu1'
      });
   }, mid);
}
  else {
     try {
      await api.sendMessage({attachment: await DownLoad([`${mainAPI}api/avtWibu?id=${gCanvas.avtwibu1.record[0].toLowerCase() == 'no' ? $_R(1, 819) : gCanvas.avtwibu1.record[0]}&chunen=${gCanvas.avtwibu1.record[1]}&chuky=${gCanvas.avtwibu1.record[2]}&apikey=${keyAPI}`], sid, 'png')}, tid, mid);
        }
    catch(e) {
       console.error(e)
       return api.sendMessage(`${e}`, tid);
    };
 };
      break;
      };
      case 'avtwibu2': {
      api.unsendMessage(_.messageID);
      gCanvas.avtwibu2.record.push(body)
      if (_.step < 3) {
      const $_ = ['"User Facebook"', '"Tên chính"', '"Tên phụ"']
   api.sendMessage('» Reply tin nhắn này để nhập ' + $_[_.step], tid, async (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': _.author,
        'step': ++_.step,
        'case': 'avtwibu2'
      });
   }, mid);
}
  else {
     try {
      await api.sendMessage({attachment: await DownLoad([`${mainAPI}api/avtWibu2?id=${gCanvas.avtwibu2.record[0].toLowerCase() == 'no' ? $_R(1, 819) : gCanvas.avtwibu2.record[0]}&tenchinh=${gCanvas.avtwibu2.record[1]}&fb=${gCanvas.avtwibu2.record[2]}&tenphu=${gCanvas.avtwibu2.record[3]}&apikey=${keyAPI}`], sid, 'png')}, tid, mid);
        }
    catch(e) {
       console.error(e)
       return api.sendMessage(`${e}`, tid);
    };
 };
      break;
      };
      case 'thuphap': {
      if (_.step == 0 && +body[0] < 1 || +body[0] > 3) {
        return api.sendMessage(`» Not found ${body}`, tid, mid);
};
      if (_.step == 1 && +body[0] < 1 || +body[0] > 3) {
        return api.sendMessage(`» Not found ${body}`, tid, mid);
      }
      else if (_.step == 1) {
        gCanvas.setstepthuphap.step = +body+1;
};
      api.unsendMessage(_.messageID);
      gCanvas.thuphap.record.push(body)
      if (_.step < gCanvas.setstepthuphap.step) {
      const $_ = ['"Số dòng text"', '"Dòng 1"', '"Dòng 2"', '"Dòng 3"']
   api.sendMessage('» Reply tin nhắn này để nhập ' + $_[_.step], tid, async (e, i) => {
    global.client.handleReply.push({
        'name': config.name,
        'messageID': i.messageID,
        'author': _.author,
        'step': ++_.step,
        'case': 'thuphap'
      });
   }, mid);
}
  else {
     try {
      await api.sendMessage({attachment: await DownLoad([`${mainAPI}api/thuphap?id=${gCanvas.thuphap.record[0].toLowerCase() == 'no' ? $_R(1, 3) : gCanvas.thuphap.record[0]}&sodong=${gCanvas.thuphap.record[1]}&dong_1=${gCanvas.thuphap.record[2]}&dong_2=${gCanvas.thuphap.record[3]}&dong_3=${gCanvas.thuphap.record[4]}&apikey=${keyAPI}`], sid, 'png')}, tid, mid);
        }
    catch(e) {
       console.error(e)
       return api.sendMessage(`${e}`, tid);
    };
 };
      break;
      };
      case 'tiki': {
      api.unsendMessage(_.messageID);   
     try {
      await api.sendMessage({attachment: await DownLoad([`${mainAPI}api/tiki?text=${body}&apikey=${keyAPI}`], sid, 'png')}, tid, mid);
        }
    catch(e) {
       console.error(e)
       return api.sendMessage(`${e}`, tid);
    };
      break;
      };
      case 'findanime': {  
     try {
       const type = isNaN(body) ? 'api/searchAvt?key=' : isFinite(body) ? 'api/searchAvtID?id=' : 'undefined';
       let os = (await axios.get(`${mainAPI}${type}${body}`)).data.result;
       var msg = `[==》${os.name}《==]\n\n`
       + ` • ID Nhân Vật: ${os.ID}\n`
       + ` • Mã Màu: ${os.color}`
       api.sendMessage(msg, tid, mid);
        }
    catch(e) {
       console.error(e)
       return api.sendMessage(`${e}`, tid);
    };
      break;
      };
   };
};
module.exports = { config, run, handleReply }

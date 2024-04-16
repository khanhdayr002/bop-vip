module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const stringSimilarity = require('string-similarity'),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const axios = require('axios')
  const moment = require("moment-timezone");
  return async function ({ event }) {
    const dateNow = Date.now()
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode, adminOnly, keyAdminOnly, ndhOnly } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {}
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : PREFIX)})\\s*`);
    if (!prefixRegex.test(body)) return;
    const adminbot = require('./../../config.json');


    if (!ADMINBOT.includes(senderID) && adminbot.adminOnly == true) {
      const res = await axios.get(`https://scr-api.hungziczac.repl.co/raw/handle`);
      if (!ADMINBOT.includes(senderID) && adminbot.adminOnly == true && res.data.status == true) return api.sendMessage('[ MODE ] - Chỉ admin bot mới có thể sử dụng bot', threadID, messageID)
    }
    if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID) && adminbot.ndhOnly == true) {
      const res = await axios.get(`https://scr-api.hungziczac.repl.co/raw/handle`);
      if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID) && adminbot.ndhOnly == true && res.data.status == true) return api.sendMessage('[ MODE ] - Chỉ người hỗ trợ bot mới có thể sử dụng bot', threadID, messageID)
    }
    
    const dataAdbox = require('./../../modules/commands/cache/data.json');
    var threadInf = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const findd = threadInf.adminIDs.find(el => el.id == senderID);
    if (dataAdbox.adminbox.hasOwnProperty(threadID) && dataAdbox.adminbox[threadID] == true && !ADMINBOT.includes(senderID) && !findd && event.isGroup == true) return api.sendMessage('[ MODE ] - Chỉ admin nhóm mới được sử dụng bot!!', event.threadID, event.messageID)
    
    if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) {
      if (!ADMINBOT.includes(senderID.toString())) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(global.getText("handleCommand", "userBanned", reason, dateAdded), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        } else {
          if (threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            }, messageID);
          }
        }
      }
    }
    const [matchedPrefix] = body.match(prefixRegex),
      args = body.slice(matchedPrefix.length).trim().split(/ +/);
    commandName = args.shift().toLowerCase();
    var command = commands.get(commandName);
    if (!command) {
      var allCommandName = [];
      const commandValues = commands['keys']();
      for (const cmd of commandValues) allCommandName.push(cmd)
      const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var noleak = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
if (noleak == 'Sunday') noleak = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (noleak == 'Monday') noleak = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (noleak == 'Tuesday') noleak = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (noleak == 'Wednesday') noleak = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (noleak == "Thursday") noleak = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (noleak == 'Friday') noleak = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (noleak == 'Saturday') noleak = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
      const res = await axios.get(`https://living-stream-khaan.glitch.me/poem/cadao`); 
var tpk = res.data.url;
      const time = process.uptime(); 
      var anh = Math.floor(time / (60 * 60));
	var la = Math.floor((time % (60 * 60)) / 60);
	var vtoan = Math.floor(time % 60);  
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
      if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target);
      else return api.sendMessage({body: global.getText("handleCommand", "commandNotExist", checker.bestMatch.target,gio, noleak, tpk,anh,la,vtoan,),  attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://endurable-ambiguous-corleggy.glitch.me/vdcosplayv2')).data.url,
method: "GET",
responseType: "stream"
})).data
},event.threadID, event.messageID);
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000))
            return api.unsendMessage(info.messageID);
          }, messageID);
        if (banUsers.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
      }
    }
    if (command.config.commandCategory.toLowerCase() == 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !ADMINBOT.includes(senderID))
      return api.sendMessage({body: global.getText("handleCommand", "threadNotAllowNSFW"), attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://endurable-ambiguous-corleggy.glitch.me/vdcosplayv2')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID, async (err, info) => {

        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 = (threadInfo.get(threadID) || await Threads.getInfo(threadID))
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
    var permssion = 0;
    var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (NDH.includes(senderID.toString())) permssion = 2;
    if (ADMINBOT.includes(senderID.toString())) permssion = 3;
    else if (!ADMINBOT.includes(senderID) && !NDH.includes(senderID) && find) permssion = 1;
    if (command.config.hasPermssion > permssion) return api.sendMessage({body: global.getText("handleCommand", "permssionNotEnough", command.config.name), attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://endurable-ambiguous-corleggy.glitch.me/vdcosplayv2')).data.url,
method: "GET",
responseType: "stream"
})).data                                      },event.threadID, event.messageID);
     
       if (!client.cooldowns.has(command.config.name)) client.cooldowns.set(command.config.name, new Map());
        const timestamps = client.cooldowns.get(command.config.name);;
        const expirationTime = (command.config.cooldowns || 1) * 0;
        if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime) 
      return api.sendMessage({body: "=== 『 𝗦𝗨̛̉ 𝗗𝗨̣𝗡𝗚 𝗤𝗨𝗔́ 𝗡𝗛𝗔𝗡𝗛 』 ====\n━━━━━━━━━━━━━━━━━━\n\n→ 𝗕𝗮̣𝗻 đ𝗮𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝘁𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗰𝗵𝗼̛̀!\n→ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶 𝘀𝗮𝘂\n→ 𝗡𝗲̂́𝘂 𝗯𝗮̣𝗻 𝘃𝗮̂̃𝗻 𝗰𝗼̂́ 𝘁𝗶𝗲̂́𝗽 𝘁𝘂̣𝗰 𝘀𝗽𝗮𝗺 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝘀𝗲̃ 𝗯𝗮𝗻 𝗯𝗮̣𝗻! ", attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://endurable-ambiguous-corleggy.glitch.me/vdcosplayv2')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID, messageID);

    var getText2;
    if (command.languages && typeof command.languages == 'object' && command.languages.hasOwnProperty(global.config.language))
      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || '';
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp('%' + i, 'g');
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => { };
    try {
      const Obj = {};
      Obj.api = api
      Obj.event = event
      Obj.args = args
      Obj.models = models
      Obj.Users = Users
      Obj.Threads = Threads
      Obj.Currencies = Currencies
      Obj.permssion = permssion
      Obj.getText = getText2
      command.run(Obj);
      timestamps.set(senderID, dateNow);
      if (DeveloperMode == !![])
        logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" "), (Date.now()) - dateNow), "[ DEV MODE ]");
      return;
    } catch (e) {
      return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
    }
  };
};
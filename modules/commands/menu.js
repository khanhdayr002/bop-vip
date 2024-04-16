module.exports.config = {
  name: "menu",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "DC-Nam",//mod lại by táo táo
  description: "Xem danh sách lệnh!",
  commandCategory: "Người dùng",
  usages: ".../tên lệnh/all",
  cooldowns: 5
};
module.exports.languages = {
  "vi": {},
  "en": {}
}
function byte2mb(bytes) {
const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
let l = 0, n = parseInt(bytes, 10) || 0;
while (n >= 1024 && ++l) n = n / 1024;
return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async function({
  api,
  event,
  args,
Currencies,
__GLOBAL
}) {
const { events } = global.client;
const { cpu, osInfo } = global.nodemodule["systeminformation"];
const time = process.uptime(),
  hours = Math.floor(time / (60 * 60)),
  minutes = Math.floor((time % (60 * 60)) / 60),
  seconds = Math.floor(time % 60);
var z_1 = (hours < 10) ? '0' + hours : hours;
  var x_1 = (minutes < 10) ? '0' + minutes : minutes;
  var y_1 = (seconds < 10) ? '0' + seconds : seconds;
var { manufacturer, brand, speed, physicalCores, cores } = await cpu();
var { platform: OSPlatform } = await osInfo();
const xuly = Math.floor((Date.now() - global.client.timeStart)/4444)
var trinhtrang = xuly < 10 ? "Đẳng cấp vip pro":
xuly > 10 && xuly < 100 ? "Siêu Mượt" : "Mượt";
const pidusage = await global.nodemodule["pidusage"](process.pid);
const timeStart = Date.now();
const moment = require("moment-timezone");
var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY");
const admin = config.ADMINBOT
const NameBot = config.BOTNAME
const version = config.version 
const { commands } = global.client;
const {
      threadID: tid,
      messageID: mid,
      senderID: sid
  } = event
  var type = !args[0] ? "" : args[0].toLowerCase()
  var msg = "",
      array = [],
      i = 0
  const cmds = global.client.commands
  const TIDdata = global.data.threadData.get(tid) || {}
  var prefix = TIDdata.PREFIX || global.config.PREFIX
  if (type == "all") {
      for (const cmd of cmds.values()) {
          msg += `🌸 ${++i} | /${cmd.config.name}: ${cmd.config.description}\n\n`
      }
      return api.sendMessage(msg, tid, mid)
  }
  if (type == "all") return
  if (type) {
      for (const cmd of cmds.values()) {
          array.push(cmd.config.name.toString())
      }
      if (!array.find(n => n == args[0].toLowerCase())) {
          const stringSimilarity = require('string-similarity')
          commandName = args.shift().toLowerCase() || ""
          var allCommandName = [];
          const commandValues = cmds['keys']()
          for (const cmd of commandValues) allCommandName.push(cmd)
          const checker = stringSimilarity.findBestMatch(commandName, allCommandName)
          if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target)
          msg = `[ Hỗ Trợ Người Dùng Bot ]\n──────────────────\n⚡ Không tìm thấy lệnh: ${type} trong hệ thống\n📌 Lệnh gần giống được tìm thấy là: ${checker.bestMatch.target}`
          api.sendMessage(msg, tid, mid)
      }
      const cmd = cmds.get(type).config
      msg = `[ Cách Sử Dụng Lệnh Bot ]\n──────────────────\n✏️ Tên lệnh: ${cmd.name}\n🚫 Quyền hạn: ${TextPr(cmd.hasPermssion)}\n📝 Mô tả: ${cmd.description}\n📍 Cách sử dụng: ${cmd.usages}\n🌸 Nhóm lệnh: ${cmd.commandCategory}\n⏱️ Thời gian chờ: ${cmd.cooldowns}s`
      api.sendMessage(msg, tid, mid)
  } else {
      CmdCategory()
      array.sort(S("nameModule"))
      for (const cmd of array) {
        msg1 = `[ Menu Của Bot ]\n──────────────────\n`
          msg += `🌸 Nhóm lệnh: ${cmd.cmdCategory}\n📝 Tổng lệnh: ${cmd.nameModule.length}\n🚫 Quyền hạn: ${TextPr(cmd.permission)}\n🔎 Gồm có các lệnh: ${cmd.nameModule.join(" ,")}\n──────────────────\n`
      }
      msg += `🔥 Tổng lệnh là: ${global.client.commands.size}\n💧 Tồng events là: ${global.client.events.size}\n${prefix}menu all để xem tất cả lệnh hiện có\n${prefix} menu + tên lệnh để xem cách sử dụng lệnh\n📅 Hôm nay là: ${thu}\n⏰ Thời gian: ${timeNow}\n📍 Thả cảm xúc "❤️" để xem thông tin về bot`
      api.sendMessage({body: msg1 + msg, attachment: (await require('axios').get(`https://i.imgur.com/pi5Q0rS.jpeg`, {
      responseType: 'stream'
  })).data
},event.threadID, (err, info) => {
  global.client.handleReaction.push({
    name: this.config.name, 
    messageID: info.messageID,
    author: event.senderID,
  })
  },event.messageID);
  }
module.exports.handleReaction = async ({ event, api, handleReaction, Currencies, Users}) => {
const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const { threadID, messageID, userID } = event;
if (event.userID != handleReaction.author) return;
if (event.reaction != "❤") return; 
api.unsendMessage(handleReaction.messageID);
      var msg = `=== [ Thông Tin Của Bot ] ===\n──────────────────\n🤖 Tên bot: Bot • ${NameBot}\n📝 Phiên bản: ${version}\n👨‍💻 Tổng số admin: ${admin.length}\n💻 Người điều hành: Nguyễn Lê Quốc Huy\n🌐 Facebook: https://www.facebook.com/profile.php?id=100015647791389\n──────────────────\n⏳ Hiện tại bot đã online tổng cộng ${hours} giờ ${minutes} phút ${seconds} giây.\n📌 Tình trạng: ${trinhtrang}\n✏️ Dấu lệnh bot: ${prefix}\n🎒 Số lệnh: ${commands.size}\n📑 Tổng events: ${events.size}\n🗂️ Tổng: ${commands.size+events.size}\n🔰 Số nhóm dùng bot: ${global.data.allThreadID.length}\n👥 Số người dùng bot: ${global.data.allUserID.length}\n──────────────────` + "\n🧬 Chip CPU: " + manufacturer + brand + "\n⚙️ Tốc độ xử lí: " + speed + " GHz" + "\n⚔️ Số cores: " + physicalCores + "\n🏹 Số luồng: " + cores + "\n🛡️ Hệ điều hành: " + OSPlatform + `\n🧪 CPU: ${pidusage.cpu.toFixed(1)}%\n🧫 RAM: ${byte2mb(pidusage.memory)}\n🛠️ Độ trễ: ${Date.now() - timeStart}ms\n──────────────────\n[ ${timeNow} - ${thu} ]`
      return api.sendMessage({body: msg, attachment: (await require('axios').get(`https://i.imgur.com/pi5Q0rS.jpeg`, {
      responseType: 'stream'
  })).data
},event.threadID); 
}
  function CmdCategory() {
      for (const cmd of cmds.values()) {
          const {
              commandCategory,
              hasPermssion,
              name: nameModule
          } = cmd.config
          if (!array.find(i => i.cmdCategory == commandCategory)) {
              array.push({
                  cmdCategory: commandCategory,
                  permission: hasPermssion,
                  nameModule: [nameModule]
              })
          } else {
              const find = array.find(i => i.cmdCategory == commandCategory)
              find.nameModule.push(nameModule)
          }
      }
  }
}

function S(k) {
  return function(a, b) {
      let i = 0;
      if (a[k].length > b[k].length) {
          i = 1
      } else if (a[k].length < b[k].length) {
          i = -1
      }
      return i * -1
  }
}

function TextPr(permission) {
  p = permission
  return p == 0 ? "Thành viên" : p == 1 ? "Quản trị viên" : p = 2 ? "Admin bot" : "Toàn quyền"
    }
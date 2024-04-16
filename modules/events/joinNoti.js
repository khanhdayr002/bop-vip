module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "CatalizCS",
  description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "joinGif");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`『 ${global.config.PREFIX} 』➠ ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    const fs = require("fs");
        await api.sendMessage("Đang thực hiện kết nối...", event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.sendMessage("〖 This is Warthog-11 Centauri Feryquitous... 〗", event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.sendMessage("〖 𝐤𝐚𝐢 - Được Điều Hành Bởi Gia khanh 〗... ", event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.sendMessage("〖 MONSTER ➢ Tổng 3xx Lệnh 〗", event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.sendMessage("〖 Bắt đầu kết nối ……… 〗", event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.sendMessage("〖 35% …… 50% …… 75% …… 〗", event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.sendMessage("〖 Kết Nối Thành Công...100% 〗", event.threadID);
        await new Promise(resolve => setTimeout(resolve, 2000));
    return api.sendMessage("", event.threadID, () => api.sendMessage({body:`»KẾT NỐI THÀNH CÔNG«\n╔════════════╗
┣➣Name : ${global.config.BOTNAME}
┣➣Prefix : ${global.config.PREFIX}
┣➣Module : ${cmd.nameModule.join(", ")}
┣➣Admin : ${global.config.ADMIN}
┣➣Facebook : ${global.config.FBADMIN}
┣➣Thời Gian : ${timeNow}
┣➣Thứ : ${thu}
┣➣Tổng Lệnh : ${cmds.size} 
╚════════════╝`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/hello.gif")} ,threadID));
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
  var ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYYY');
  var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝗖𝗵𝘂̉ 𝗡𝗵𝗮̣̂𝘁'
  if (thu == 'Monday') thu = '𝗧𝗵𝘂̛́ 𝗛𝗮𝗶'
  if (thu == 'Tuesday') thu = '𝗧𝗵𝘂̛́ 𝗕𝗮'
  if (thu == 'Wednesday') thu = '𝗧𝗵𝘂̛́ 𝗧𝘂̛'
  if (thu == "Thursday") thu = '𝗧𝗵𝘂̛́ 𝗡𝗮̆𝗺'
  if (thu == 'Friday') thu = '𝗧𝗵𝘂̛́ 𝗦𝗮́𝘂'
  if (thu == 'Saturday') thu = '𝗧𝗵𝘂̛́ 𝗕𝗮̉𝘆'
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "joinGif");
      const pathGif = join(path, `${threadID}.gif`);

      var mentions = [], nameArray = [], memLength = [], i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = '[ Welcome ]\n╭─────────────⭓\n├─[💌] Xin chào bạn {name} tới với nhóm {threadName}\n├─[💤] {type} bạn là thành viên thứ {soThanhVien} của box chat\n├────────⭔\n├─[📿] Dưới là thông báo của Admin \n╰─────────────⭓' : msg = threadData.customJoin;
      msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  'Chúng mày' : 'Mày')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName)
      .replace(/\{thu}/g, thu)
      .replace(/\{ngay}/g, ngay)
      .replace(/\{gio}/g, gio);

      if (existsSync(path)) mkdirSync(path, { recursive: true });

      const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else if (randomPath.length != 0) {
        const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
      }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);
    } catch (e) { return console.log(e) };
  }
}
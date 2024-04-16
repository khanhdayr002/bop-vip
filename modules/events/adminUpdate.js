module.exports.config = {
	name: "adminUpdate",
	eventType: ["log:thread-admins","log:thread-name", "log:user-nickname", "log:thread-call","log:thread-icon", "log:thread-color", "log:link-status", "log:magic-words", "log:thread-approval-mode", "log:thread-poll"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads, Users }) { 
    const { author, threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;
  	const fs = require("fs");
	var iconPath = __dirname + "/emoji.json";
  var time = moment.tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY || HH:mm:ss'); 
	if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
  if (author == threadID) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            
            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
var id = logMessageData.TARGET_ID
                    api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n→ ĐÃ CẬP NHẬT NGƯỜI DÙNG ${Users.getNameUser(id)} TRỞ THÀNH QUẢN TRỊ VIÊN NHÓM`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID);
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n→ ĐÃ GỠ CHỨC DANH QUẢN TRỊ VIÊN CỦA NGƯỜI DÙNG ${logMessageData.TARGET_ID}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID);
                }
                break;
            }

            case "log:user-nickname": {
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n→ ${(logMessageData.nickname.length == 0) ? `${event.logMessageBody}` : `${event.logMessageBody}`}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID);
                break;
            }

            case "log:thread-name": {
                dataThread.threadName = event.logMessageData.name || null;
                api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n→ ${(dataThread.threadName) ? `${event.logMessageBody}` : 'ĐÃ XÓA TÊN NHÓM THÀNH CÔNG'}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID);
                break;
            }
            case "log:thread-icon": {
            	let preIcon = JSON.parse(fs.readFileSync(iconPath));
            	dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n»  ${event.logMessageBody.replace("biểu tượng cảm xúc", "icon")}\n→ Icon gốc: ${preIcon[threadID] || "không rõ"}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.url,
method: "GET",
responseType: "stream"
})).data                                      }, threadID, async (error, info) => {
                	preIcon[threadID] = dataThread.threadIcon;
                	fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
               }

            case "log:thread-call": {
                if (logMessageData.event == "group_call_started") {
                    const name = await Users.getNameUser(logMessageData.caller_id);
                    api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n→ ${name} đã bắt đầu ${(logMessageData.video) ? 'VIDEO ' : ''}CALL.`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.data,
method: "GET",
responseType: "stream"
})).data                                      }, threadID);
                }
                else if (logMessageData.event == "group_call_ended") {
                    const callDuration = logMessageData.call_duration;

                    //Transform seconds to hours, minutes and seconds
                    let hours = Math.floor(callDuration / 3600);
                    let minutes = Math.floor((callDuration - (hours * 3600)) / 60);
                    let seconds = callDuration - (hours * 3600) - (minutes * 60);

                    //Add 0 if less than 10
                    if (hours < 10) hours = "0" + hours;
                    if (minutes < 10) minutes = "0" + minutes;
                    if (seconds < 10) seconds = "0" + seconds;

                    const timeFormat = `${hours}:${minutes}:${seconds}`;

                    api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n» ${(logMessageData.video) ? 'VIDEO ' : ''}CUỘC GỌI ĐÃ KẾT THÚC.\n→ THỜI GIAN GỌI: ${timeFormat}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.data,
method: "GET",
responseType: "stream"
})).data                                      }, threadID);
                    
                }
                else if (logMessageData.joining_user) {
                    const name = await Users.getNameUser(logMessageData.joining_user);
                    api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n→ ${name} Tham gia ${(logMessageData.group_call_type == '1') ? 'VIDEO ' : ''}CALL.`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.data,
method: "GET",
responseType: "stream"
})).data                                      }, threadID);
                }
                break;
            }
        case "log:magic-words":
            {
                return api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time} Theme ${event.logMessageData.magic_word} đã thêm hiệu ứng: ${event.logMessageData.theme_name}\nEmoij: ${event.logMessageData.emoji_effect || "Không có emoji"}\nTổng ${event.logMessageData.new_magic_word_count} hiệu ứng từ ngữ được thêm vào`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.data,
method: "GET",
responseType: "stream"
})).data                                      }, threadID)
            }
        case "log:thread-poll":
            {
                var str = event.logMessageData.question_json
                var obj = JSON.parse(str);
                if (event.logMessageData.event_type == "question_creation") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID)
                }
                if (event.logMessageData.event_type == "update_vote") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID)
                }
            }
        case "log:thread-approval-mode":
            {
                return api.sendMessage(event.logMessageBody, threadID)
            }
             case "log:thread-color": {
            	dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage({body:`=== 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 ====\n━━━━━━━━━━━━━━━━━━\n\n➝ 𝗩𝗮̀𝗼 𝗟𝘂́𝗰: ${time}\n→  ${event.logMessageBody.replace("Chủ đề", "color")}`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://apirandom.nguyenquochungxyz.repl.co/images/phongcanh')).data.data,
method: "GET",
responseType: "stream"
})).data                                      }, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 5000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
  }
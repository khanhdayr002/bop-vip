const fs = require('fs');
module.exports.config = {
    "name": "unsendrt",
    "version": "1.0.0",
    "hasPermssion": 0,
    "credits": "DC-Nam",
    "description": "Bật tắt gỡ tin nhắn bot bằng cảm xúc",
    "commandCategory": "Box Chat",
    "usages": "[on/off]",
    "cooldowns": 5
};

module.exports.run = async({ api, event, args }) => {
    const { threadID, messageID } = event;
    let path = __dirname + "/cache/unsendReaction.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = { data: false };
   if (args.join() == "") { 
	  return api.sendMessage(`𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐜𝐡𝐨̣𝐧 [ 𝐨𝐧 / 𝐨𝐟𝐟 ]`, event.threadID, event.messageID)} 
    if(args[0] == "on") { 
        data[threadID].data = true; 
        api.sendMessage("» [ 𝐌𝐎𝐃𝐄 ] - 𝐁𝐚̣̂𝐭 𝐦𝐨𝐝𝐞 𝐮𝐧𝐬𝐞𝐧𝐝𝐑𝐞𝐚𝐜𝐭𝐢𝐨𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 🖤", threadID); 
    } else if(args[0] == "off") { 
        data[threadID].data = false; 
        api.sendMessage("» [ 𝐌𝐎𝐃𝐄 ] - 𝐓𝐚̆́𝐭 𝐦𝐨𝐝𝐞 𝐮𝐧𝐬𝐞𝐧𝐝𝐑𝐞𝐚𝐜𝐭𝐢𝐨𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 🖤", threadID);
    }
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}
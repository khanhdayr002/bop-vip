module.exports.config = {
    "name": "ad",
    "version": "1.0.0",
    "hasPermssion": 0,
    "credits": "DC-Nam",
    "description": "Kiểm tra thông tin admin .",
    "commandCategory": "Tiện ích",
    "usages": "adm",
    "cooldowns": 5,
    "dependencies": {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
var name = (await Users.getData(event.senderID)).name
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
var link = [
"https://i.imgur.com/xhAQLw3.mp4"
];
var callback = () => api.sendMessage({body:`=== [ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 ] ====\━━━━━━━━━━━━━━━━━━\\
🙈 𝐓𝐞̂𝐧: Nguyễn Quốc Hưng 
💮 𝐁𝐢𝐞̣̂𝐭 𝐃𝐚𝐧𝐡: hungnongu99
🛸 𝐓𝐮𝐨̂̉𝐢: 𝟏5 𝐓𝐮𝐨̂̉𝐢
👤 𝐆𝐢𝐨̛́𝐢 𝐍𝐚𝐦
💫 𝐂𝐡𝐢𝐞̂̀𝐮 𝐂𝐚𝐨: 20m
💘 𝐌𝐨̂́𝐢 𝐐𝐮𝐚𝐧 𝐇𝐞̣̂: Độc thân vui tính :)
🌎 𝐐𝐮𝐞̂ 𝐐𝐮𝐚́𝐧: Thái Nguyên 
👫 𝐆𝐮: Đẹp gái÷))
🌸 𝐓𝐢́𝐧𝐡 𝐂𝐚́𝐜𝐡: 𝐍𝐡𝐚̂𝐲 , 𝐕𝐮𝐢 𝐓𝐢́𝐧𝐡 , 𝐇𝐨̀𝐚 Đ𝐨̂̀𝐧𝐠
🌀 𝐒𝐨̛̉ 𝐓𝐡𝐢́𝐜𝐡: 𝐁𝐨́𝐧𝐠 Đ𝐚́ , 𝐂𝐡𝐨̛𝐢 𝐆𝐚𝐦𝐞
💻𝐂𝐨𝐧𝐭𝐚𝐜𝐭💻
☎ 𝐒đ𝐭&𝐙𝐚𝐥𝐨: 113
🌐𝐅𝐛: fb.me/hungnongu99
✉️ 𝐄𝐦𝐚𝐢𝐥: hungnongu99@gmail.com 
--------------------
🛸𝐃𝐨𝐧𝐚𝐭𝐞:
💳𝐕𝐂𝐁: 𝐂𝐡𝐮̛𝐚 𝐋𝐚̀𝐦:(
💳𝐌𝐁: 𝐂𝐡𝐮̛𝐚 𝐋𝐚̀𝐦:(
📲𝐌𝐎𝐌𝐎: 𝐂𝐡𝐮̛𝐚 𝐋𝐚̀𝐦:(`,attachment: fs.createReadStream(__dirname + "/cache/ad.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ad.mp4")); 
return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/ad.mp4")).on("close",() => callback());
};
//tự edit body nhá ...=thay thông tin 
//Sen code lại th nên bớt soi 
//cách lấy ảnh gắn ở trên 
//B1 Truy cập https://imgur.com chọn newpost
//B2 Gắn ảnh từ máy tính lên đó hay điện thoại cx đc tùyq //B3 Copy link như trên rồi thêm .jpg vào là done 
//Chúc thành công
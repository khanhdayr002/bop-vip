module.exports.config = {
  name: 'autotb',
  version: '10.02',
  hasPermssion: 0,
  credits: 'DC-Nam',
  description: 'Tự động gửi tin nhắn theo giờ đã cài!',
  commandCategory: 'auto',
  usages: '[]',
  cooldowns: 3
};
const nam = [{
  timer: '03:35:00 SA',
  message: ['𝗧𝗵𝘂̛́𝗰 𝗴𝗶̀ 𝗹𝗮̆́𝗺 𝘃𝗮̣̂𝘆 𝟯 𝗴𝗶𝗼̛̀ 𝘀𝗮́𝗻𝗴 𝗿𝗼̂̀𝗶 😴', '𝗡𝗴𝘂̉ đ𝗶 𝗺𝗮𝗶 𝗰𝗼𝗻 đ𝗶 𝗹𝗮̀𝗺 đ𝗶 𝗵𝗼̣𝗰 𝗰𝗵𝘂̛́ 😇']
},
{
  timer: '03:00:00 SA',
  message: ['𝗧𝗵𝘂̛́𝗰 𝗴𝗶̀ 𝗹𝗮̆́𝗺 𝘃𝗮̣̂𝘆 𝟯 𝗴𝗶𝗼̛̀ 𝘀𝗮́𝗻𝗴 𝗿𝗼̂̀𝗶 😴', '𝗡𝗴𝘂̉ đ𝗶 𝗺𝗮𝗶 𝗰𝗼𝗻 đ𝗶 𝗹𝗮̀𝗺 đ𝗶 𝗵𝗼̣𝗰 𝗰𝗵𝘂̛́ 😇']
},
{
  timer: '02:00:00 SA',
  message: ['𝗦𝗮́𝗻𝗴 𝗿𝗼̂̀𝗶 𝘁𝗵𝘂̛́𝗰 𝗰𝗵𝗼̛𝗶 𝗴𝗮𝗺𝗲 𝗹𝗮̆́𝗺 𝘃𝗮̣̂𝘆 😴', '𝐦𝐮𝐨̣̂𝐧 𝐥𝐚̆́𝐦 𝐫𝐨̂̀𝐢 đ𝐚̂́𝐲 đ𝐞́𝐨 𝐧𝐠𝐮̉ 𝐢𝐤 𝐚̀😇']
},
{
  timer: '01:00:00 SA',
  message: ['𝗦𝗮́𝗻𝗴 𝗿𝗼̂̀𝗶 𝘁𝗵𝘂̛́𝗰 𝗰𝗵𝗼̛𝗶 𝗴𝗮𝗺𝗲 𝗹𝗮̆́𝗺 𝘃𝗮̣̂𝘆 😴', '𝗡𝗴𝘂̉ 𝘁𝗵𝗶̀ 𝗸𝗵𝗼̂𝗻𝗴 𝗻𝗴𝘂̉ 𝘁𝗵𝘂̛́𝗰 đ𝗲̂́𝗻 𝘀𝗮́𝗻𝗴 𝘀𝘂̛𝗻𝗴 𝗺𝗮̆́𝘁 đ𝗼́ 𝐜𝐨𝐧 𝐥𝐨̂̀𝐧 😇']
},
{
  timer: '00:00:00 SA',
  message: ['𝗦𝗮́𝗻𝗴 đ𝗲̂́𝗻 𝗻𝗼̛𝗶 𝗿𝗼̂̀𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗻𝗴𝘂̉ 𝗮̀ 😴', '𝗠𝘂𝗼̣̂𝗻 𝗿𝗼̂̀𝗶 đ𝗼́ 𝗹𝗼 𝗺𝗮̀ đ𝗶 𝗻𝗴𝘂̉ 𝘀𝗼̛́𝗺 𝗺𝗮𝗶 𝗱𝗮̣̂𝘆 𝗺𝘂𝗼̣̂𝗻 đ𝗼́ 😇']
},
{
  timer: '11:00:00 PM',
  message: ['𝐭𝐡𝐮̛́𝐜 𝐜𝐚́𝐢 đ𝐢̣𝐭 𝐦𝐞̣ 𝐦𝐚̀𝐲 𝐚̀?😴', '𝗞𝗵𝘂𝘆𝗮 𝗿𝗼̂̀𝗶 𝗻𝗴𝘂̉ 𝗻𝗴𝗼𝗻 𝗻𝗵𝗲́ 𝗰𝗮́𝗰 𝗯𝗮̣𝗻😇']
},
{
  timer: '10:00:00 PM',
  message: ['𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗻𝗴𝘂̉ 𝗻𝗴𝗼𝗻😴', '𝗞𝗵𝘂𝘆𝗮 𝗿𝗼̂̀𝗶 𝐧𝐠𝐮̉ 𝐦𝐞̣ đ𝐢😇']
},
{
  timer: '09:00:00 PM',
  message: ['𝐁𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝟗𝐡 𝐧𝐡𝐞́ 𝐜𝐚́𝐜 𝐜𝐡𝐚́𝐮 🥰', '𝐧𝐠𝐮̉ đ𝐢 đ𝐢𝐞̣̂𝐧 𝐭𝐡𝐨𝐚̣𝐢 𝐜𝐨𝐧 𝐜𝐚̣̆𝐜 😇']
},
{
  timer: '1:00:00 PM',
  message: ['𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝗰𝗵𝗶𝗲̂̀𝘂 𝐤𝐨 𝐯𝐮𝐢 𝐯𝐞̉ 🙌', '𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝗰𝗵𝗶𝗲̂̀𝘂 𝐦𝐚̂́𝐭 𝐧𝐚̆𝐧𝐠 𝐥𝐮̛𝐨̛̣𝐧𝐠 😼']
},
{
  timer: '6:00:00 AM',
  message: ['𝐛𝐮𝐨̂̉𝐢 𝐬𝐚́𝐧𝐠 𝐧𝐡𝐮̛ 𝐥𝐨̂̀𝐧  😉', '𝗕𝘂𝗼̂̉𝗶 𝘀𝗮́𝗻𝗴 𝐦𝐞̣̂𝐭 𝐦𝐨̉𝐢 𝗻𝗵𝗮 𝗰𝗮́𝗰 𝗯𝗮̣𝗻 😙', '𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘀𝗮́𝗻𝗴 𝐧𝐡𝐮̛ 𝐜𝐨𝐧 𝐜𝐚̣̆𝐜 ❤️']
},
{
  timer: '12:00:00 PM',
  message: ['𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗿𝘂̛𝗮 𝐧𝐡𝐮̛ 𝐥𝐨̂̀𝐧 😋', '𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗿𝘂̛𝗮 𝗮̆𝗻 đ𝐞́𝐨 𝐧𝐠𝐨𝐧 𝐦𝐢𝐞̣̂𝐧𝐠 😋']
},           
{
  timer: '11:00:00 AM',
  message: ['𝐯𝐚̂̃𝐧 đ𝐞́𝐨 𝐜𝐨́ 𝐣 𝐜𝐚̉ 𝐯𝐚̀ 𝐛𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝐥𝐚̀ 𝟏𝟏𝐡 !!😴']
},               
{
  timer: '10:00:00 AM',
  message: ['𝐛𝐨̂́ 𝐱𝐢𝐧 𝐭𝐡𝐨̂𝐧𝐠 𝐛𝐚́𝐨 𝐯𝐨̛́𝐢 𝐜𝐡𝐮́𝐧𝐠 𝐦𝐚̀𝐲 𝐛𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝐥𝐚̀ 𝟏𝟎𝐡😙']
},          
{
  timer: '5:00:00 PM',
  message: ['𝐂𝐡𝐮́𝐜 𝐌𝐧 𝐁𝐮𝐨̂̉𝐢 𝐂𝐡𝐢𝐞̂̀𝐮 𝐧𝐡𝐮̛ 𝐥𝐨̂̀𝐧🥰']
}];
module.exports.onLoad = o => setInterval(() => {
  const r = a => a[Math.floor(Math.random()*a.length)];
  if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message), i));
}, 1000);
module.exports.run = o => {};
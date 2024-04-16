module.exports.config = {
  name: "capcut",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Vtuan",
  description: "down",
  commandCategory: "No prefix",
  usages: "",
  cooldowns: 5
};
const axios = require('axios');
const fs = require('fs');
const linkapi = "https://gaudev-api.onrender.com/capcut?url=";
const isCapCutVideoLink = url => /^(https?:\/\/(www\.)?capcut\.(net|com)\/(t|watch)\/[a-zA-Z0-9]+\/?).*/.test(url);
exports.handleEvent = async function({ api, event }) {
      const str = event.body;
      const send = msg => api.sendMessage(msg, event.threadID, event.messageID);
      const links = str.match(/(https?:\/\/[^)\s]+)/g) || [];
      for (const link of links) {
          if (isCapCutVideoLink(link)) {
              const res = await axios.get(`${linkapi}${link}`);
              const videoData = res.data;
              const stream = (await axios.get(videoData.video, { responseType: "arraybuffer" })).data;
              const path = __dirname + '/cache/1.mp4';
              fs.writeFileSync(path, Buffer.from(stream, "utf-8"));
              send({body:`📝 Title: ${videoData.title}\n✏️ Mô tả: ${videoData.description}\n📥 Lượt dùng: ${videoData.usage}`, attachment: fs.createReadStream(path) });
          }
      }
};
module.exports.run = async function ({ api }) {};
const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "randomtt",
  version: "1.0.0",
  hasPermission: 2,
  credits: "tnt", 
  description: "Random ngẫu nhiên",
  commandCategory: "tiện ích",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  try {
    const res = await axios.get("https://api-7izq.onrender.com/random?apikey=randomtnt");
    const { play, author, digg_count, comment_count, play_count, share_count, download_count, title, duration, region } = res.data.data;

    const callback = () => {
      api.sendMessage({
        body: `[ Random - Tiktok ]\n\nQuốc gia: ${region}\nTiêu đề: ${title}\nTên giả: ${author.nickname}\nID người dùng: ${author.unique_id}\nLượt tim: ${digg_count}\nLượt bình luận: ${comment_count}\nLượt xem: ${play_count}`,
        attachment: fs.createReadStream(__dirname + "/cache/tkvd.mp4")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tkvd.mp4"));
    };

    request(encodeURI(play)).pipe(fs.createWriteStream(__dirname + "/cache/tkvd.mp4")).on("close", callback);
  } catch (err) {
    console.log(err);
    api.sendMessage("Đã xảy ra lỗi...", event.threadID);
  }
};

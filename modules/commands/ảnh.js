const axios = require("axios");
const fs = require("fs-extra");
module.exports.config = {
    name: "ảnh",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "TanQuynh",
    description: "Xem ảnh",
    commandCategory: "Tiện Ích",
    usages: "reply số thứ tự",
    cooldowns: 5
}
module.exports.run = async ({ api, event, args }) => {
    return api.sendMessage(" ===== DANH SÁCH ======\n1 : ẢNH GÁI\n2 : ẢNH GÁI SEXY\n3 : ẢNH MÔNG/DÚ\n4 : ẢNH TRAI\n5 : ẢNH GÁI VIỆT NAM\n6 : ẢNH GÁI ÁO DÀI\n7 : ẢNH COSPLAY\n8 : ẢNH VSBG\n9 : ẢNH INSTAGRAM\n10 : ẢNH ANIME\n11 : ẢNH MEME\n12 : ẢNH ANIME MEME\n13 : ẢNH DOREMON\n14 : ẢNH ANIMES\n15 : ẢNH CONAN\n16 : ẢNH DRAGON \n====VIDEO====\n17 : VIDEO ANIME\n18 : VIDEO CHILL\n19 : VIDEO EDIT\n20 : VIDEO GÁI\n21 : VIDEO GOKU\n22 : VIDEO SOUND \n23 : VIDEO DOREMON\n(Reply tin nhắn + chọn số)\n================", event.threadID, async (err, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "img"
        })
    }, event.messageID)
}
module.exports.handleReply = async ({ api, event, handleReply }) => {
    const baseurl = "https://nguyenlienmanh.com";
    const Object = {
        1: "/girl?apikey=basilvip",
        2: "/gaisexy?apikey=basilvip",
        3: "/du?apikey=basilvip",
        4: "/trai?apikey=basilvip",
        5: "/gaivn?apikey=basilvip",
        6: "/gaiaodai?apikey=basilvip",
        7: "/cosplay?apikey=basilvip",
        8: "/vsbg?apikey=basilvip",
        9: "/ig?apikey=basilvip",
        10: "/anime?apikey=basilvip",
        11: "/meme?apikey=basilvip",
        12: "/memeanime?apikey=basilvip",
        13: "/doremon?apikey=basilvip",
        14: "/animes?apikey=basilvip",
        15: "/conan?apikey=basilvip",
        16: "/dragon?apikey=basilvip",
        17: "/videoan?apikey=basilvip",
        18: "/videochill?apikey=basilvip",
        19: "/edit?apikey=basilvip",
        20: "/videogaixinh?apikey=basilvip",
        21: "/guku?apikey=basilvip",
        22: "/soundcl?apikey=basilvip",
        23: "/vdmon?apikey=basilvip",
        24: "/test?apikey=basilvip",
        25: "/nhacytb",
      26: "/nhacmoingay",
      27: "/remix"
    }
    if (handleReply.type == "img") {
        axios.get(baseurl + Object[event.body]).then(({ data }) => {
            axios.get(data.data, {
                responseType: 'arraybuffer'
            }).then(res => {
                var ext = res.headers['content-type'].split('/')[1].replace('mpeg', 'mp3')
                var random = Date.now();
                fs.writeFileSync(__dirname + `/cache/${handleReply.author}_${random}.${ext}`, Buffer.from(res.data, 'utf-8'));
                api.sendMessage({
                    attachment: fs.createReadStream(__dirname + `/cache/${handleReply.author}_${random}.${ext}`)
                }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${handleReply.author}_${random}.${ext}`), event.messageID);
            })
        }).catch(err => console.log(err));
    }
}
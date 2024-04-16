const axios = require("axios");
const moment = require("moment-timezone");
const fs = require("fs");

const capCutLinkApi = "https://api-7izq.onrender.com/capcut";
const facebookLinkApi = "https://api-7izq.onrender.com/fbmp4";
const instagramLinkApi = "https://api-7izq.onrender.com/instagramdown";
const tikTokLinkApi = "https://api-7izq.onrender.com/tiktok/downloadvideo";

module.exports = {
    config: {
        name: "mediaDownloader",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "tnt",
        description: "Tải xuống Capcut, Facebook, Instagram, Tiktok",
        commandCategory: "Tiện ích",
        usages: "",
        cooldowns: 5
    },

    run: ({ api, event, args }) => {},    
    handleEvent: async ({ api, event }) => {
        const { body, senderID } = event;
        const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");

        if (!body || senderID === api.getCurrentUserID() || senderID === '') return;

        try {
            let response;
            let stream;
            let title = "Data trống";

            if (body.includes('https://www.capcut.com/template-detail/') || body.includes('https://www.capcut.com/t/')) {
                response = await axios.get(capCutLinkApi + "?url=" + body);
            } else if (body.includes('https://www.facebook.com/share/v/') || body.includes('https://www.facebook.com/share/') || body.includes('https://www.facebook.com/share/r/')) {
                response = await axios.get(facebookLinkApi + "?link=" + body);
            } else if (body.includes('https://www.instagram.com/reel/') || body.includes('https://www.instagram.com/p/')) {
                response = await axios.get(instagramLinkApi + "?link=" + body);
            } else if (body.includes('https://vt.tiktok.com/') || body.includes('https://vt.tiktok.com/')) {
                response = await axios.get(tikTokLinkApi + "?url=" + body);
                const { music, title: tikTokTitle } = response.data.data; 

                const audioUrl = music;

                const audioResponse = await axios.get(audioUrl, { responseType: "arraybuffer" });
                const audioData = Buffer.from(audioResponse.data, 'binary');

                const fileName = `${tikTokTitle}.mp3`;
                const filePath = `./${fileName}`;

                fs.writeFileSync(filePath, audioData);

                api.sendMessage({
                    body: `┣➤ Tiêu đề: ${tikTokTitle}`,
                    attachment: fs.createReadStream(filePath)
                }, event.threadID, event.messageID);

                fs.unlinkSync(filePath); 
                return;
            } else {
                return; 
            }

            const { sd, media, description, usage, video } = response.data;

            if (video) {
                stream = (await axios.get(video, { responseType: "stream" })).data;
            } else if (sd) {
                stream = (await axios.get(sd, { responseType: "stream" })).data;
            } else if (media) {
                stream = (await axios.get(media, { responseType: "stream" })).data;
            } else {
                return; 
            }

            api.sendMessage({
                body: `┏━━━━━━━━━━━━━━━━━━━━┓
┣➤📝 Tiêu đề: ${title} 
┣➤🗒 Mô tả: ${description || "Data trống"}
┣➤📸 Lượt dùng: ${usage || "Data trống"}
┣➤⏰ Thời gian: ${gio}
┣➤🌸 Tự động tải xuống
┗━━━━━━━━━━━━━━━━━━━━┛`,
                attachment: stream
            }, event.threadID, event.messageID);
        } catch (error) {
            console.error(error);
        }
    }
};

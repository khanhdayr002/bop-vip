module.exports.config = {
    name: "sendmail",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "ShinTHL09",
    description: "Send Mail",
    commandCategory: "Tiện ích",
    usages: "<mail người nhận> | <tiêu đề> | <nội dung>",
    cooldowns: 5,
    dependencies: { }
    //install nodemailer: npm install --save express nodemailer
}
module.exports.run = async function({ api, args, Users, event}) {
  const adminEmail = 'basilmailtd@gmail.com';// input mail
  const adminPassword = 'uzxtolejmfoyrzcd'; // input pass smtp
  const mailHost = 'smtp.gmail.com';
  const mailPort = 465;
    const { threadID, messageID } = event;
    const str = args.join(' '),
      arr = str.split('|'),
mail = arr[0].trim(),
tiêuĐề = arr[1].trim(),
nộiDung = arr[2].trim();
    if(!mail || !tiêuĐề || !nộiDung) return api.sendMessage(`Vui lòng nhập đúng định dạng: mail | tiêu đề | nội dung`, event.threadID, event.messageID);
    const subject = tiêuĐề.replace(/\\n/g, "<br>").replace(/\/n/g, "<br>").replace(/\-/g, "|");
    const content = nộiDung.replace(/\\n/g, "<br>").replace(/\/n/g, "<br>").replace(/\-/g, "|");
    const htmlContent = `<h1> ${content} </h1>`
    send(mail, subject, htmlContent, adminEmail, adminPassword, mailHost, mailPort);
    api.sendMessage(`====== [ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟 ] ======\n━━━━━━━━━━━━━━━━━━━━━\n┏ 👤 𝐹𝑅𝑂𝑀 \n┡ ${adminEmail}\n│\n┟👥 𝑇𝑂 \n┗ ${mail}\n━━━━━━━━━━━━━━━━━━━━━\n🗣️ 𝑇𝐼𝑇𝐿𝐸 ► ${subject}\n\n📃 𝑁𝑂̣̂𝐼 𝐷𝑈𝑁𝐺 ► ${content}\n⚙️ 𝐻𝑡𝑚𝑙 ► ${htmlContent}\n===========================`, threadID, messageID);
}
function send(to, subject, htmlContent, adminEmail, adminPassword, mailHost, mailPort) {
 const nodeMailer = require('nodemailer');
 const transporter = nodeMailer.createTransport({
     host: mailHost,
     port: mailPort,
     secure: true,
     auth: {
       user: adminEmail,
       pass: adminPassword
     }
   })
   const options = {
     from: adminEmail, 
     to: `${to}`, 
     subject: `${subject}`, 
     html: `${htmlContent}` 
   }
   return transporter.sendMail(options)
}
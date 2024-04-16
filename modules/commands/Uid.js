var Options = {
  name: 'id',
  version: '1.0.0',
  credits: 'Sam',
  description: 'Get ID User/Group',
  usages: '[@tags|reply|-t|url]',
  commandCategory: 'Helper',
  cooldowns: 5
}

function index({ api, event, args }) {
  var { threadID, senderID, messageReply, messageID, mentions } = event;
  var id = args.length > 0 && args[0].toLowerCase() == '-t' ? threadID : messageReply ? messageReply.senderID : mentions ? Object.keys(mentions)[0] : senderID;
  return api.sendMessage(String(id), threadID, messageID);
}

this.run = index;
this.config = Options;
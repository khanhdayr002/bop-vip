module.exports.config = {
    "name": "antijoin",
    "version": "1.0.0",
    "credits": "Haruna",
    "hasPermssion": 1,
    "description": "Cấm thành viên mới vào nhóm!",
    "usages": "...",
    "commandCategory": "Quản trị viên nhóm",
    "cooldowns": 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('⚡ Vui lòng thêm bot làm quản trị viên và thử lại!', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`⚡ Thực hiện ${(data.newMember == true) ? "bật" : "tắt"} thành công cấm thành viên mới vào nhóm!`, event.threadID, event.messageID);
}
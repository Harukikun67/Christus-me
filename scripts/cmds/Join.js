module.exports = {
 config: {
  name: "join",
  version: "1.0.0",
  author: "NTKhang",
  countDown: 5,
    role: 2,
  shortDescription: "add user to the group",
  usages: "Join <threadID>",
  category: "chat box",
},
langs: {
		en: {
			hello: "Hi this join command is still in development",
			helloWithName: ""
		},// English language
	},
  onStart: async function ({ api, event, args }) {
    const threadID = args.join(""); 
    const senderID = event.senderID;

    try {
      await api.addUserToGroup(senderID, threadID);
      api.sendMessage(`You have been added to the “${threadID}” group.🥰 If you don't see the group chat message try find it in message requests`, event.threadID);
    } catch (e) {
      api.sendMessage(`An error occurred while adding you to the “${threadID}” group. Please make sure that your a friend if this bot in facebook & make sure that the bot is at that group you have request to add you & if that group is admin approval it should pending in your requested group. Thank you for understanding👋😁`, event.threadID);
    }
  }
};

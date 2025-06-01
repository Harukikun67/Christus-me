module.exports = {
  config: {
    name: "banque",
    version: "1.2",
    description: "Deposit or withdraw money from the bank and earn interest",
    guide: {
      vi: "",
      en: "{pn}Bank:\nInteret - Balance\n - Retrait \n- Depot \n- Transfert \n- Richest"
    },
    category: "💰 Economy",
    countDown: 15,
    role: 0,
    author: ""
  },
  onStart: async function ({ args, message, event, api, usersData }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);

    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const info = await api.getUserInfo(user);
    const username = info[user].name;

 const bankDataPath = 'scripts/cmds/bankData.json';

if (!fs.existsSync(bankDataPath)) {
  const initialBankData = {};
  fs.writeFileSync(bankDataPath, JSON.stringify(initialBankData), "utf8");
}

const bankData = JSON.parse(fs.readFileSync(bankDataPath, "utf8"));

if (!bankData[user]) {
  bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
  fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");
}


  bankBalance = bankData[user].bank || 0;

  const command = args[0]?.toLowerCase();
  const amount = parseInt(args[1]);
  const recipientUID = parseInt(args[2]);

    switch (command) {
case "depot":
  if (isNaN(amount) || amount <= 0) {
    return message.reply("----------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n🧲 𝗏𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝗂𝗇𝗌𝖾𝗋𝖾𝗋 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 𝖽𝖾𝗉𝗈𝗍 𝗏𝖺𝗅𝗂𝖽𝖾😊•\n\n-----------------------");
  }


  if (bankBalance >= 1e104) {
    return message.reply("----------------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n🙅𝗍𝗎 𝗇𝖾 𝗉𝖾𝗎𝗑 𝗉𝖺𝗌 𝖿𝖺𝗂𝗋𝖾 𝗎𝗇 𝖽𝖾́𝗉𝗈̂𝗍 𝗍𝗎 𝖺𝗌 𝖽𝖾́𝗃𝖺̀ $1e104 💢𝗌𝗎𝗋 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 •\n\n-----------------------");
  }

  if (userMoney < amount) {
    return message.reply("--------------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n⛔𝖳𝗎 𝗇'𝖺𝗌 𝗉𝖺𝗌 𝗅𝖺 𝗌𝗈𝗆𝗆𝖾 𝖽𝖾 𝖽𝖾𝗉𝗈𝗍 𝖾𝗑𝗂𝗀𝖾́𝖾 🙅•\n\n------------------------");
  }

  bankData[user].bank += amount;
  await usersData.set(event.senderID, {
    money: userMoney - amount
  });
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");

  return message.reply(`-----------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n🧪𝖳𝗎 𝖺𝗌 𝖽𝖾́𝗉𝗈𝗌𝖾́ 𝖺𝗏𝖾𝖼 𝗌𝗎𝖼𝖼𝖾̀𝗌 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 $${amount} 𝗌𝗎𝗋 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾 ✅•\n\n--------------------------`);
break;


case "retrait":
  const balance = bankData[user].bank || 0;

  if (isNaN(amount) || amount <= 0) {
    return message.reply("-----------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n😶𝗏𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝖾𝗇𝗍𝗋𝖾𝗋 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 𝗋𝖾𝗍𝗋𝖺𝗂𝗍 𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝖾 🙄•\n\n--------------------------╝");
  }

  if (userMoney >= 1e104) {
    return message.reply("╔------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n🚫𝗍𝗎 𝗇𝖾 𝗉𝖾𝗎𝗑 𝗉𝖺𝗌 𝗋𝖾𝗍𝗂𝗋𝖾́ 𝖽𝖾 𝗅'𝖺𝗋𝗀𝖾𝗇𝗍 𝖽𝖾 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾 𝗅𝗈𝗋𝗌𝗊𝗎𝖾 𝗍𝗎 𝖺𝗌 𝖽𝖾𝗃𝖺 1e104 ✔𝗌𝗎𝗋 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝗉𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅•\n\n╚--------------------╝");
  }

  if (amount > balance) {
    return message.reply("╔----------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n💵𝖼𝖾𝗍𝗍𝖾 𝗌𝗈𝗆𝗆𝖾 𝖾𝗌𝗍 𝗌𝗎𝗉𝗉𝖾𝗋𝗂𝖾𝗎𝗋𝖾 𝖺𝗎 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾😐•\n\n╚-------------------------------╝");
  }

  // Continue with the withdrawal if the userMoney is not at 1e104
  bankData[user].bank = balance - amount;
  await usersData.set(event.senderID, {
    money: userMoney + amount
  });
fs.writeFileSync(bankDataPath, JSON.stringify(bankData), "utf8");
  return message.reply(`╔---------------------------╗\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n💲𝖳𝗎 𝖺𝗌 𝗋𝖾𝗍𝗂𝗋𝖾́ 𝖺𝗏𝖾𝖼 𝗌𝗎𝖼𝖼𝖾̀𝗌✔ 𝗎𝗇 𝗆𝗈𝗇𝗍𝖺𝗇𝗍 𝖽𝖾 $${amount} 𝖽𝖺𝗇𝗌 𝗍𝗈𝗇 𝖼𝗈𝗆𝗉𝗍𝖾 𝖻𝖺𝗇𝖼𝖺𝗂𝗋𝖾✴•\n\n╚----------------------------╝`);
  break;


case "solde":
  const formattedBankBalance = parseFloat(bankBalance);
  if (!isNaN(formattedBankBalance)) {
    return message.reply(`---------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n💦𝚃𝚄 𝙰𝚂: $${formatNumberWithFullForm(formattedBankBalance)} 𝙳𝙰𝙽𝚂 𝚃𝙰 𝙱𝙰𝙽𝚀𝚄𝙴💵\n\n----------------------`);
  } else {
    return message.reply("------------------------------\n\n[🏦 𝗕𝗔𝗡𝗤𝗨𝗘 𝗖𝗘𝗡𝗧𝗥𝗔𝗟𝗘 🏦]\n\n😕𝙴𝚁𝚁𝙴𝚄𝚁: 𝙻𝙴 𝚂𝙾𝙻𝙳𝙴 𝙳𝙴 𝚃𝙾𝙽 𝙲𝙾𝙼𝙿𝚃𝙴 𝙱𝙰𝙽𝙲𝙰𝙸𝚁𝙴 𝙽'𝙴𝚂𝚃 𝙿𝙰𝚂 𝚄𝙽 𝙽𝙾𝙼𝙱𝚁𝙴 𝚅𝙰𝙻𝙸𝙳𝙴 😪•\n\n-------------------------------");
  }
  break;



case "interet":
  const interestRate = 0.001; // 0.1% daily interest rate
  const lastInterestClaimed = bankData[user].lastInterestClaimed || 0;

  const currentTime = Date.now();
  const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;

  if (timeDiffInSecond

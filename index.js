// index.js
require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  ActivityType 
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// 現在のモードを保持するためのグローバル変数
// "plain" → 「しるだるch」表示
// "number" → 「X人がしるだるch」表示
let currentMode = "plain";

// ステータスメッセージ更新用のインデックス
let statusIndex = 0;

// 「人数」モードのときにリアルタイムな人数で更新する関数
function updateNumberPresence() {
  const allowedGuild = client.guilds.cache.get(process.env.ALLOWED_SERVER_ID);
  const totalMembers = allowedGuild ? allowedGuild.memberCount : 0;
  client.user.setPresence({
    activities: [{ name: `${totalMembers}人がしるだるch`, type: ActivityType.Playing }],
    status: "online"
  });
}

client.once('ready', async () => {
  console.log(`BOT logged in as: ${client.user.tag}`);

  // 5秒ごとにステータスメッセージを更新
  setInterval(() => {
    if (statusIndex % 2 === 0) {
      // 通常モード
      client.user.setPresence({
        activities: [{ name: "しるだるch", type: ActivityType.Playing }],
        status: "online"
      });
      currentMode = "plain";
    } else {
      // 人数表示モード
      const allowedGuild = client.guilds.cache.get(process.env.ALLOWED_SERVER_ID);
      const totalMembers = allowedGuild ? allowedGuild.memberCount : 0;
      client.user.setPresence({
        activities: [{ name: `${totalMembers}人がしるだるch`, type: ActivityType.Playing }],
        status: "online"
      });
      currentMode = "number";
    }
    statusIndex++;
  }, 5000);
});

// 専用サーバーでメンバーが参加した際、人数表示モードの場合は即更新
client.on('guildMemberAdd', (member) => {
  if (member.guild.id === process.env.ALLOWED_SERVER_ID && currentMode === "number") {
    updateNumberPresence();
  }
});

// 専用サーバーでメンバーが離脱した際も、人数表示モードの場合は即更新
client.on('guildMemberRemove', (member) => {
  if (member.guild.id === process.env.ALLOWED_SERVER_ID && currentMode === "number") {
    updateNumberPresence();
  }
});

// BOTが専用サーバー以外のギルドに参加した場合は速攻退出する処理
client.on('guildCreate', async (guild) => {
  const allowedId = process.env.ALLOWED_SERVER_ID;
  if (guild.id !== allowedId) {
    console.log(`Joined unauthorized guild "${guild.name}" (${guild.id}). Leaving immediately.`);
    try {
      await guild.leave();
      console.log(`Left guild "${guild.name}" successfully.`);
    } catch (err) {
      console.error(`Error leaving guild "${guild.name}":`, err);
    }
  } else {
    console.log(`Joined allowed guild: "${guild.name}"`);
  }
});

client.login(process.env.DISCORD_TOKEN);
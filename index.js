const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers
]
});

client.once("ready", () => {
console.log(`🌸 Bot online: ${client.user.tag}`);
});

require("./system/willkommen")(client);
require("./system/panel")(client);

client.login(process.env.TOKEN);

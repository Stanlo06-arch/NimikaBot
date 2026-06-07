const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers
]
});

client.once('ready', () => {
console.log(`🌸 Bot online: ${client.user.tag}`);
});

// Events laden
require('./events/guildMemberAdd')(client);

// Login
client.login(process.env.TOKEN);

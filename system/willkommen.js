const { welcomeChannel } = require("../config/ids");

module.exports = (client) => {
client.on("guildMemberAdd", async (member) => {
const channel = member.guild.channels.cache.get(welcomeChannel);

if (!channel) return;

await channel.send(`🌸 Willkommen ${member}!`);

});
};

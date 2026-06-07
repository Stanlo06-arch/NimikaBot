module.exports = (client) => {
client.on('guildMemberAdd', async (member) => {
const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

```
if (!channel) return;

await channel.send(`🌸 Willkommen ${member}!`);
```

});
};

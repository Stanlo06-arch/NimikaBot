module.exports = (client) => {
client.on('guildMemberAdd', async (member) => {
const channel = member.guild.channels.cache.get(
process.env.WELCOME_CHANNEL_ID
);

```
if (!channel) return;

await channel.send({
  content: `# 🌸 Willkommen auf meinem Server! ❤️
```

Hey ${member} 🫶

Schön, dass du den Weg auf unseren Server gefunden hast!

Hier erwartet dich eine freundliche Community,
Gaming, Animal Crossing, gemütliche Streams
und viele schöne Momente mit anderen Spielern. 🌷

Wir wünschen dir ganz viel Spaß und freuen uns,
dich bei uns begrüßen zu dürfen! ✨`
});
});
};

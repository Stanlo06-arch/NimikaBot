const { EmbedBuilder } = require("discord.js");
const { welcomeChannel } = require("../config/ids");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.cache.get(welcomeChannel);

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("#F8C8DC")
      .setAuthor({
        name: "🌸 Nimika's Cozy Community",
        iconURL: member.guild.iconURL({ dynamic: true })
      })
      .setTitle("❤️ Willkommen auf meinem Server! ❤️")
      .setDescription(
`Hey ${member} 🫶

Schön, dass du den Weg auf unseren Server gefunden hast!

Hier erwartet dich eine freundliche Community,
Gaming, Animal Crossing, gemütliche Streams
und viele schöne Momente mit anderen Spielern. 🌷

Wir wünschen dir ganz viel Spaß und freuen uns,
dich bei uns begrüßen zu dürfen! ✨`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setImage("https://cdn.discordapp.com/attachments/1510626895627288676/1521547336529219715/file_00000000d71c71f496a0ef5675ce39e3.png?ex=6a453ae2&is=6a43e962&hm=b7eed4cf1778e7a65b8c8bd7a4ab3092d6939cbf663d29285af96cafb0a7aa00&")
      .setFooter({
  text: "Hostet by 𝔖𝔱𝔞𝔫𝔩𝔢𝔶_𝔯𝔪𝔭.06 ♕",
  iconURL: "https://cdn.discordapp.com/attachments/1510626895627288676/1513151420835168347/123.png"
})
.setTimestamp();

    await channel.send({
  embeds: [embed]
});
  });
};

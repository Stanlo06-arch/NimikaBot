const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const PANEL_CHANNEL_ID = "1513199686171889744";

module.exports = (client) => {
  client.once("ready", async () => {
    try {
      const channel = await client.channels.fetch(PANEL_CHANNEL_ID);

      if (!channel) return;

      const messages = await channel.messages.fetch({ limit: 20 });

      const oldPanels = messages.filter(
        (msg) =>
          msg.author.id === client.user.id &&
          msg.embeds.length > 0 &&
          msg.embeds[0].title === "📋 KONTROLLPANEL"
      );

      for (const [, msg] of oldPanels) {
        await msg.delete().catch(() => {});
      }

      const embed = new EmbedBuilder()
        .setColor("#F8C8DC")
        .setAuthor({
          name: "🌸 Nimika's Cozy Community",
          iconURL: client.guilds.cache.first()?.iconURL()
        })
        .setTitle("📋 KONTROLLPANEL")
        .setDescription(
          "Wähle eine Aktion über die Schaltfläche unten."
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/1510626895627288676/1521547336529219715/file_00000000d71c71f496a0ef5675ce39e3.png?ex=6a453ae2&is=6a43e962&hm=b7eed4cf1778e7a65b8c8bd7a4ab3092d6939cbf663d29285af96cafb0a7aa00&"
        )
        .setFooter({
          text: "Hostet by 𝐈𝐭𝐬𝐅𝐥𝐮♕",
          iconURL:
            "https://cdn.discordapp.com/attachments/1510626895627288676/1513151420835168347/123.png"
        })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("embed_erstellen")
          .setLabel("📝 Einbettung erstellen")
          .setStyle(ButtonStyle.Primary)
      );

      await channel.send({
        embeds: [embed],
        components: [row]
      });

      console.log("📋 Kontrollpanel gesendet");
    } catch (err) {
      console.error(err);
    }
  });
};

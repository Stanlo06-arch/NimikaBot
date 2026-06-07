const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const PANEL_CHANNEL_ID = "1513124369050898513";

module.exports = (client) => {
  client.once("ready", async () => {
    try {
      const channel = await client.channels.fetch(PANEL_CHANNEL_ID);

      if (!channel) return;

      const messages = await channel.messages.fetch({ limit: 20 });

      const oldPanels = messages.filter(
        msg =>
          msg.author.id === client.user.id &&
          msg.embeds.length > 0 &&
          msg.embeds[0].title === "📋 KONTROLLPANEL"
      );

      for (const [, msg] of oldPanels) {
        await msg.delete().catch(() => {});
      }

      const embed = new EmbedBuilder()
        .setColor("#F8C8DC")
        .setTitle("📋 KONTROLLPANEL")
        .setDescription(
          "Wähle eine Aktion über die Schaltfläche unten."
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/1510626895627288676/1513141910791913533/NimikaBanner.png"
        )
        .setFooter({
          text: "Hostet by 𝔖𝔱𝔞𝔫𝔩𝔢𝔶_𝔯𝔪𝔭.06 ♕",
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

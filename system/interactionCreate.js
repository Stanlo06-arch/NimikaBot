const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ChannelSelectMenuBuilder,
  ChannelType,
  EmbedBuilder
} = require("discord.js");

const pendingEmbeds = new Map();

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {

    // Button
    if (interaction.isButton()) {
      if (interaction.customId === "embed_erstellen") {

        const modal = new ModalBuilder()
          .setCustomId("embed_modal")
          .setTitle("📝 Einbettung erstellen");

        const titleInput = new TextInputBuilder()
          .setCustomId("embed_title")
          .setLabel("Titel")
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(256);

        const textInput = new TextInputBuilder()
          .setCustomId("embed_text")
          .setLabel("Text")
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setMaxLength(2000);

        modal.addComponents(
          new ActionRowBuilder().addComponents(titleInput),
          new ActionRowBuilder().addComponents(textInput)
        );

        return interaction.showModal(modal);
      }
    }

    // Modal
    if (interaction.isModalSubmit()) {
      if (interaction.customId === "embed_modal") {

        const title =
          interaction.fields.getTextInputValue("embed_title");

        const text =
          interaction.fields.getTextInputValue("embed_text");

        pendingEmbeds.set(interaction.user.id, {
          title,
          text
        });

        const row = new ActionRowBuilder().addComponents(
          new ChannelSelectMenuBuilder()
            .setCustomId("embed_channel")
            .setPlaceholder("📍 Kanal auswählen")
            .setChannelTypes(ChannelType.GuildText)
        );

        return interaction.reply({
          content: "📍 Wähle nun einen Kanal aus.",
          components: [row],
          ephemeral: true
        });
      }
    }

    // Kanal Auswahl
    if (interaction.isChannelSelectMenu()) {
      if (interaction.customId === "embed_channel") {

        const data = pendingEmbeds.get(interaction.user.id);

        if (!data) {
          return interaction.reply({
            content: "❌ Keine Daten gefunden.",
            ephemeral: true
          });
        }

        const channelId = interaction.values[0];
        const channel = interaction.guild.channels.cache.get(channelId);

        if (!channel) {
          return interaction.reply({
            content: "❌ Kanal nicht gefunden.",
            ephemeral: true
          });
        }

        const embed = new EmbedBuilder()
          .setColor("#F8C8DC")
          .setAuthor({
            name: "🌸 Nimika's Cozy Community",
            iconURL: interaction.guild.iconURL()
          })
          .setThumbnail(interaction.guild.iconURL())
          .setTitle(data.title)
          .setDescription(data.text)
          .setImage(
            "https://cdn.discordapp.com/attachments/1510626895627288676/1513141910791913533/NimikaBanner.png"
          )
          .setFooter({
            text: "Hostet by 𝔖𝔱𝔞𝔫𝔩𝔢𝔶_𝔯𝔪𝔭.06 ♕",
            iconURL:
              "https://cdn.discordapp.com/attachments/1510626895627288676/1513151420835168347/123.png"
          })
          .setTimestamp();

        await channel.send({
          embeds: [embed]
        });

        pendingEmbeds.delete(interaction.user.id);

        return interaction.update({
          content: "✅ Einbettung erfolgreich gesendet.",
          components: []
        });
      }
    }
  });
};

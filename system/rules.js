const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const { RULES_CHANNEL_ID } = require("../config/ids");

module.exports = async (client) => {
    client.once("ready", async () => {

        const channel = await client.channels.fetch(RULES_CHANNEL_ID);

        if (!channel) return;

        const messages = await channel.messages.fetch({ limit: 20 });

        const botMessage = messages.find(
            m =>
                m.author.id === client.user.id &&
                m.components.length > 0
        );

        if (botMessage) return;

        const embed = new EmbedBuilder()
            .setColor("#F8C8DC")
            .setAuthor({
                name: "🌸 Nimika's Cozy Community",
                iconURL: client.user.displayAvatarURL()
            })
            .setTitle("📜 Regeln")
            .setDescription(
`Willkommen auf unserem Server!

Bitte lies unsere Regeln sorgfältig durch.

Mit einem Klick auf **„Regeln akzeptieren“** bestätigst du, dass du die Regeln gelesen hast.

Danach erhältst du automatisch Zugriff auf den gesamten Server.`
            )
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("accept_rules")
                .setLabel("✅ Regeln akzeptieren")
                .setStyle(ButtonStyle.Success)
        );

        await channel.send({
            embeds: [embed],
            components: [row]
        });

    });
};

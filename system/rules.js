const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const { RULES_CHANNEL_ID } = require("../config/ids");

module.exports = (client) => {

    client.once("ready", async () => {

        const channel = await client.channels.fetch(RULES_CHANNEL_ID);
        if (!channel) return;

        // Alte Regeln löschen
        const messages = await channel.messages.fetch({ limit: 20 });

        const oldMessage = messages.find(
            m => m.author.id === client.user.id
        );

        if (oldMessage) {
            await oldMessage.delete().catch(() => {});
        }

        const embed = new EmbedBuilder()
            .setColor("#F8C8DC")
            .setAuthor({
                name: "🌸 Nimika's Cozy Community",
                iconURL: client.guilds.cache.first().iconURL()
            })
            .setThumbnail(client.guilds.cache.first().iconURL())

            .setTitle("❗ Regeln")

            .setDescription(
`🍃 **Sei freundlich & respektvoll**
Behandle alle so, wie du selbst behandelt werden möchtest. Kein Hate, kein Drama oder toxisches Verhalten.

🌼 **Kein Mobbing oder Diskriminierung**
Egal ob Herkunft, Geschlecht oder Spielstil – hier ist jeder willkommen.

💬 **Achte auf einen angenehmen Umgangston**
Wir sind eine Cozy Community. Bitte keine Beleidigungen oder unnötigen Streit.

🚫 **Kein Spam oder Werbung**
Keine Eigenwerbung, Links oder Spam ohne Erlaubnis.

🎮 **Bleib thematisch passend**
Nutze die jeweiligen Channels für das passende Thema.

🛠️ **Das Team hat das letzte Wort**
Bitte respektiere Entscheidungen des Teams.

🌸 **Hab Spaß & fühl dich wie zuhause**
Dies ist ein Ort zum Abschalten, Austauschen und gemeinsamen Spielen. ✨

💌 **Klicke unten auf „💜 Regeln akzeptieren“, um Mitglied zu werden.**`
            )

            .setImage("DEIN_BANNER_LINK")

            .setFooter({
                text: "Hostet by Stanley_rmp.06 ♕",
                iconURL: "https://cdn.discordapp.com/attachments/1510626895627288676/1513151420835168347/123.png"
            })

            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("accept_rules")
                .setLabel("Regeln akzeptieren")
                .setEmoji("💜")
                .setStyle(ButtonStyle.Primary)
        );

        await channel.send({
            embeds: [embed],
            components: [row]
        });

    });

};

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

           .setImage("https://cdn.discordapp.com/attachments/1510626895627288676/1521547336529219715/file_00000000d71c71f496a0ef5675ce39e3.png?ex=6a68d362&is=6a6781e2&hm=4bf7aac85a56514e32fd655cf3623a9af4883f2cc10cecc5e9df6f1d8e02d7e7")

            .setFooter({
                text: "Hostet by 𝐈𝐭𝐬𝐅𝐥𝐮♕",
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

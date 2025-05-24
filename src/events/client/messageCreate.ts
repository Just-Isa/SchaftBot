import { ClientUser, Events, Message, TextChannel } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import { sendMessageToChannel, sendSchaftMessage } from "../../utils/SendMessage";
import { creepyLinks, regexes } from "../../utils/helpers";

export default class MessageCreate extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageCreate,
            description: "Creates Interactions",
            once: false
        });
    }

    async Execute(message: Message): Promise<void> {
        if (message.author.bot)
            return;

        if (message.mentions.has(this.client.user as ClientUser)) {
            this.handleUserSchaftWitchhunt(message);
            return;
        }

        const matches: (keyof typeof regexes)[] = [];
        for (const [key, pattern] of Object.entries(regexes)) {
            const regex = new RegExp(pattern);
            if (regex.test(message.content.toLowerCase())) {
                matches.push(key as keyof typeof regexes);
            }
        }
        if (matches.length === 0)
            return;

        sendSchaftMessage(this.client, message, matches);
    }

    async handleUserSchaftWitchhunt(message: Message<boolean>): Promise<void> {
        const otherMentions = message.mentions.users.filter(user => user.id !== this.client.user?.id);
        if (otherMentions.size > 4 || otherMentions.size < 1) {
            sendMessageToChannel(message.channel as TextChannel, "Too many/little users mentioned...");
            sendMessageToChannel(message.channel as TextChannel, "https://tenor.com/view/clankercore-low-tier-god-meme-gif-10327546507788970158");
        } else {
            const foundKey = Object.keys(regexes).find(key => message.content.toLowerCase().includes(key));
            const includesSchaft = message.content.toLowerCase().includes("gesagt");
            const includesHat = message.content.toLowerCase().includes("hat");
            const includesHaben = message.content.toLowerCase().includes("haben");
            if (foundKey && (includesHat || includesHaben) && includesSchaft) {
                otherMentions.forEach(user => {
                    user.send("\n\n 𝕋𝕙𝕖 𝕤𝕙𝕒𝕕𝕠𝕨𝕤 𝕨𝕙𝕚𝕤𝕡𝕖𝕣 𝕪𝕠𝕦𝕣 𝕟𝕒𝕞𝕖. \n\n 𝕋𝕙𝕖𝕪 𝕜𝕟𝕠𝕨 𝕨𝕙𝕒𝕥 𝕪𝕠𝕦 𝕕𝕚𝕕. \n\n")
                        .then(() => console.log(`DM sent to ${user.tag} from ${message.member}`))
                        .catch(err => {
                            console.error(`Could not DM ${user.tag}: `, err, "\n\n");
                        });

                    user.send(`# Du hast ${foundKey[0].toUpperCase() + foundKey.slice(1).toLowerCase()} gesagt.`)
                        .then(() => console.log(`DM sent to ${user.tag} from ${message.member}`))
                        .catch(err => {
                            console.error(`Could not DM ${user.tag}: `, err, "\n\n");
                        });

                    const randomIndex = Math.floor(Math.random() * creepyLinks.length);
                    const randomImageUrl = creepyLinks[randomIndex];
                    user.send({ files: [randomImageUrl] })
                        .then(() => console.log(`Image sent to ${user.tag} from ${message.member} \n\n`))
                        .catch(err => {
                            console.error(`Could not send image to ${user.tag}: `, err, "\n\n");
                        });
                });
            } else if (!includesHat && !includesHaben) {
                message.member?.user.send("Muss schon 'hat' oder 'haben' beinhalten").catch(() => console.log(`Couldnt send witchhunt warning to user ${message.member}`));
            } else {
                message.member?.user.send("Wrong text, which bad word did they say?").catch(() => console.log(`Couldnt send witchhunt warning to user ${message.member}`));
            }
        }
    }

}


import { Events, Message } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";
import { sendSchaftMessage } from "../../utils/SendMessage";
import regexes from "../../utils/helpers";

export default class MessageCreate extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.MessageCreate,
            description: "Creates Interactions",
            once: false
        });
    }

    async Execute(message: Message): Promise<void> {
        if (message.author.bot) return;
        const matches: (keyof typeof regexes)[] = [];
        for (const [key, pattern] of Object.entries(regexes)) {
            const regex = new RegExp(pattern);
            if (regex.test(message.content)) {
                matches.push(key as keyof typeof regexes);
            }
        }
        sendSchaftMessage(this.client, message, matches);
        if (message)
            console.log(message.content)
    }
}

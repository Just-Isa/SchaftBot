import { Message, TextChannel } from "discord.js";
import CustomClient from "../base/classes/CustomClient";
import regexes, { formatSchaftString } from "./helpers";

export function sendSchaftMessage(client: CustomClient, message: Message, matches: (keyof typeof regexes)[]) {
    let startString = `${message.author} HAT ***__${matches[0].toUpperCase()}__*** `;
    let endString = formatSchaftString(message.content, matches);
    matches.shift();
    matches.forEach((match: (keyof typeof regexes)) => {
        startString += `UND ***__${match.toUpperCase()}__*** `
    });
    startString += 'GESAGT'

    if (message.channel.isTextBased()) {
        (message.channel as TextChannel).send(`${startString}:\n\n${endString}`)
    }
}


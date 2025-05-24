import { Message, TextChannel } from "discord.js";
import CustomClient from "../base/classes/CustomClient";
import { formatSchaftString, regexes } from "./helpers";

const MAX_LENGTH = 1600;

export async function sendSchaftMessage(client: CustomClient, message: Message, matches: (keyof typeof regexes)[]) {
    const link = `https://discord.com/channels/${message.guildId}/${message.channel.id}/${message.id}`;
    let startString = `${message.author} HAT ***__${matches[0].toUpperCase()}__*** in :  ${link} `;
    let endString = formatSchaftString(message.content, matches);
    matches.shift();
    matches.forEach((match: (keyof typeof regexes)) => {
        startString += `UND ***__${match.toUpperCase()}__*** `
    });
    startString += 'GESAGT'
    const completeString = `${startString}:\n\n${endString}`;
    if (message.channel.isTextBased()) {

        const messageParts = splitMessage(completeString, MAX_LENGTH);

        for (const part of messageParts) {
            await sendMessageToChannel(client.channels.cache.get('1375942980032135252') as TextChannel, part);
        }
    }
}

function splitMessage(message: string, maxLength: number): string[] {
    const parts = [];
    for (let i = 0; i < message.length; i += maxLength) {
        parts.push(message.slice(i, i + maxLength));
    }
    return parts;
}

export async function sendMessageToChannel(channel: TextChannel, message: string) {
    channel.send(message);
}

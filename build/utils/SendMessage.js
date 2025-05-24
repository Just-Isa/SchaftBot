"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSchaftMessage = sendSchaftMessage;
exports.sendMessageToChannel = sendMessageToChannel;
const helpers_1 = require("./helpers");
const MAX_LENGTH = 1600;
function sendSchaftMessage(client, message, matches) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = `https://discord.com/channels/${message.guildId}/${message.channel.id}/${message.id}`;
        let startString = `${message.author} HAT ***__${matches[0].toUpperCase()}__*** in :  ${link}`;
        let endString = (0, helpers_1.formatSchaftString)(message.content, matches);
        matches.shift();
        matches.forEach((match) => {
            startString += `UND ***__${match.toUpperCase()}__*** `;
        });
        startString += 'GESAGT';
        const completeString = `${startString}:\n\n${endString}`;
        if (message.channel.isTextBased()) {
            const messageParts = splitMessage(completeString, MAX_LENGTH);
            for (const part of messageParts) {
                yield sendMessageToChannel(client.channels.cache.get('1375942980032135252'), part);
            }
        }
    });
}
function splitMessage(message, maxLength) {
    const parts = [];
    for (let i = 0; i < message.length; i += maxLength) {
        parts.push(message.slice(i, i + maxLength));
    }
    return parts;
}
function sendMessageToChannel(channel, message) {
    return __awaiter(this, void 0, void 0, function* () {
        channel.send(message);
    });
}

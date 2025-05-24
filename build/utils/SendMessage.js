"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSchaftMessage = sendSchaftMessage;
const helpers_1 = require("./helpers");
function sendSchaftMessage(client, message, matches) {
    let startString = `${message.author} HAT ***__${matches[0].toUpperCase()}__*** `;
    let endString = (0, helpers_1.formatSchaftString)(message.content, matches);
    matches.shift();
    matches.forEach((match) => {
        startString += `UND ***__${match.toUpperCase()}__*** `;
    });
    startString += 'GESAGT';
    if (message.channel.isTextBased()) {
        message.channel.send(`${startString}:\n\n${endString}`);
    }
}

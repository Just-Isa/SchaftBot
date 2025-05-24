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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = __importDefault(require("../../base/classes/Event"));
const SendMessage_1 = require("../../utils/SendMessage");
const helpers_1 = require("../../utils/helpers");
class MessageCreate extends Event_1.default {
    constructor(client) {
        super(client, {
            name: discord_js_1.Events.MessageCreate,
            description: "Creates Interactions",
            once: false
        });
    }
    Execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot)
                return;
            if (message.mentions.has(this.client.user)) {
                this.handleUserSchaftWitchhunt(message);
                return;
            }
            const matches = [];
            for (const [key, pattern] of Object.entries(helpers_1.regexes)) {
                const regex = new RegExp(pattern);
                if (regex.test(message.content.toLowerCase())) {
                    matches.push(key);
                }
            }
            if (matches.length === 0)
                return;
            (0, SendMessage_1.sendSchaftMessage)(this.client, message, matches);
        });
    }
    handleUserSchaftWitchhunt(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const otherMentions = message.mentions.users.filter(user => { var _a; return user.id !== ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id); });
            if (otherMentions.size > 4 || otherMentions.size < 1) {
                (0, SendMessage_1.sendMessageToChannel)(message.channel, "Too many/little users mentioned...");
                (0, SendMessage_1.sendMessageToChannel)(message.channel, "https://tenor.com/view/clankercore-low-tier-god-meme-gif-10327546507788970158");
            }
            else {
                const foundKey = Object.keys(helpers_1.regexes).find(key => message.content.toLowerCase().includes(key));
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
                        const randomIndex = Math.floor(Math.random() * helpers_1.creepyLinks.length);
                        const randomImageUrl = helpers_1.creepyLinks[randomIndex];
                        user.send({ files: [randomImageUrl] })
                            .then(() => console.log(`Image sent to ${user.tag} from ${message.member} \n\n`))
                            .catch(err => {
                            console.error(`Could not send image to ${user.tag}: `, err, "\n\n");
                        });
                    });
                }
                else if (!includesHat && !includesHaben) {
                    (_a = message.member) === null || _a === void 0 ? void 0 : _a.user.send("Muss schon 'hat' oder 'haben' beinhalten").catch(() => console.log(`Couldnt send witchhunt warning to user ${message.member}`));
                }
                else {
                    (_b = message.member) === null || _b === void 0 ? void 0 : _b.user.send("Wrong text, which bad word did they say?").catch(() => console.log(`Couldnt send witchhunt warning to user ${message.member}`));
                }
            }
        });
    }
}
exports.default = MessageCreate;

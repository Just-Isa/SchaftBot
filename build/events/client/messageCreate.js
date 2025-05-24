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
const helpers_1 = __importDefault(require("../../utils/helpers"));
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
            const matches = [];
            for (const [key, pattern] of Object.entries(helpers_1.default)) {
                const regex = new RegExp(pattern);
                if (regex.test(message.content)) {
                    matches.push(key);
                }
            }
            (0, SendMessage_1.sendSchaftMessage)(this.client, message, matches);
            if (message)
                console.log(message.content);
        });
    }
}
exports.default = MessageCreate;

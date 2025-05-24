"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = __importDefault(require("../../base/classes/Event"));
class ReadyEvent extends Event_1.default {
    constructor(client) {
        super(client, {
            name: discord_js_1.Events.ClientReady,
            description: "Client is ready",
            once: true
        });
    }
    Execute() {
        var _a;
        console.log(`${(_a = this.client.user) === null || _a === void 0 ? void 0 : _a.tag} is now ready!`);
    }
}
exports.default = ReadyEvent;

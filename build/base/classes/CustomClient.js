"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Handler_1 = __importDefault(require("./Handler"));
class CustomClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
            ]
        });
        // if (!process.env.DISCORD_TOKEN) {
        //     throw new Error('DISCORD_TOKEN environment variable is not set');
        // }
        this.config = {
            token: "MTM3NTc4MTk1MDk0NTc1NTE3Nw.GDRw56.VxmJ-fkPWwxA96G0pffSjR7cJyvCbZrNEeJiUs"
        };
        this.handler = new Handler_1.default(this);
    }
    Init() {
        this.LoadHandlers();
        this.login(this.config.token)
            .catch((e) => { console.log("Login Error: ", e); });
    }
    LoadHandlers() {
        this.handler.LoadEvents();
    }
}
exports.default = CustomClient;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Handler_1 = __importDefault(require("./Handler"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
class CustomClient extends discord_js_1.Client {
    constructor() {
        var _a;
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
            ]
        });
        // Load config and token
        this.config = require(`${process.cwd()}/data/config.json`);
        this.handler = new Handler_1.default(this);
        this.token = (_a = process.env.DISCORD_TOKEN) !== null && _a !== void 0 ? _a : '';
    }
    Init() {
        if (this.token) {
            this.LoadHandlers();
            this.login(this.token)
                .catch((e) => { console.log("Login Error: ", e); });
        }
        else {
            throw new Error('DISCORD_TOKEN is missing in environment variables');
        }
    }
    LoadHandlers() {
        this.handler.LoadEvents();
    }
}
exports.default = CustomClient;

import { Client, GatewayIntentBits } from "discord.js";
import ICustomClient from "../interfaces/ICustomClient";
import IConfig from "../interfaces/IConfig";
import Handler from "./Handler";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default class CustomClient extends Client implements ICustomClient {

    config: IConfig;
    handler: Handler;
    token: string;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ]
        });

        // Load config and token
        this.config = require(`${process.cwd()}/data/config.json`);
        this.handler = new Handler(this);
        this.token = process.env.DISCORD_TOKEN ?? '';
    }

    Init(): void {
        if (this.token) {
            this.LoadHandlers();
            this.login(this.token)
                .catch((e) => { console.log("Login Error: ", e) });
        } else {
            throw new Error('DISCORD_TOKEN is missing in environment variables');
        }
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
    }
}

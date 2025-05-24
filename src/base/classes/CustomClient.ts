import { Client, GatewayIntentBits } from "discord.js";
import ICustomClient from "../interfaces/ICustomClient";
import IConfig from "../interfaces/IConfig";
import Handler from "./Handler";

export default class CustomClient extends Client implements ICustomClient {

    config: IConfig;
    handler: Handler;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ]
        });
        if (!process.env.DISCORD_TOKEN) {
            throw new Error('DISCORD_TOKEN environment variable is not set');
        }
        this.config = {
            token: process.env.DISCORD_TOKEN
        };
        this.handler = new Handler(this);

    }
    Init(): void {
        this.LoadHandlers();
        this.login(this.config.token)
            .catch((e) => { console.log("Login Error: ", e) });
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
    }
}

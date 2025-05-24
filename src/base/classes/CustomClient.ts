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
        this.config = require(`${process.cwd()}/data/config.json`)
        this.handler = new Handler(this);
        this.token = process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN : '';

    }
    Init(): void {
        if (this.token) {
            this.LoadHandlers();
            this.login(this.config.token)
                .catch((e) => { console.log("Login Error: ", e) });
        } else {
            throw new Error('DISCORD TOKEN MISSING')
        }
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
    }
}

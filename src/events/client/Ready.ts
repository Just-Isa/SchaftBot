import { Events } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event";

export default class ReadyEvent extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: "Client is ready",
            once: true
        });
    }

    Execute() {
        console.log(`${this.client.user?.tag} is now ready!`);
    }
}

import IHandler from "../interfaces/IHandler";
import path from "path";
import { glob } from "glob";
import CustomClient from "./CustomClient";
import Event from "./Event";

export default class Handler implements IHandler {
    client: CustomClient;

    constructor(client: CustomClient) {
        this.client = client;
    }

    async LoadEvents() {
        const files = (await glob(`build/events/**/*.js`)).map(filePath => path.resolve(filePath));

        files.map(async (file: string) => {
            const event: Event = new (await import(file)).default(this.client);

            if (!event.name)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a name.`)

            const execute = (...args: any) => event.Execute(...args);

            if (event.once) {
                //@ts-ignore
                this.client.once(event.name, execute);
            } else {
                //@ts-ignore
                this.client.on(event.name, execute);
            }
            console.log(`Loading event: ${event.name} from ${file}`);
            return delete require.cache[require.resolve(file)];
        });
    }
}

import { ICommandDefinition } from "@zowe/imperative";
import { join } from "path";


const definition: ICommandDefinition = {
    name: 'hey',
    aliases: ['hw'],
    type: "command",
    summary: 'say hello world',
    description: 'hello world command to get familiar with the project, its architecture and working',
    handler: join(__dirname, "./Hey.handler"),
    positionals: [
        {
            name: 'name' ,
            description: "test",
            type:"string",
        }
    ]
};

export =  definition;

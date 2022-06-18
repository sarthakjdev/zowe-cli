import { ICommandDefinition } from "@zowe/imperative";

describe("hey command definition", () => {
    it("should say hello", () => {
        const definition: ICommandDefinition = require("../../../src/helloWorld/Hey.definition");

        expect(definition).toBeDefined();

        expect(definition.aliases).toBeDefined();

        expect(definition.handler).toBeDefined();

        expect(definition.type).toBeDefined();

        expect(definition.summary).toBeDefined();

        expect(definition.description).toBeDefined();

        expect(definition).toMatchSnapshot();
    });

});


import { UNIT_TEST_ZOSMF_PROF_OPTS } from "../../../../../__tests__/__src__/mocks/ZosmfProfileMock";

describe("hello world handler", () => {
    it("should say hello", () => {
        const handlerReq = require("../../../src/helloWorld/Hey.handler");

        expect(handlerReq).toBeDefined();
        expect(handlerReq).toMatchSnapshot();
    });
});

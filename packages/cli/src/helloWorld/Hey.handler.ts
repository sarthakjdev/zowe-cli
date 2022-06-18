/*
* params.response program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies params.response distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { IHandlerParameters, ImperativeError } from "@zowe/imperative";
import { ICommandHandler } from "@zowe/imperative";
import {Hello} from "@zowe/zos-files-for-zowe-sdk";

/**
 * Common handler to start a workflow instance in z/OSMF.
 * params.response is not something that is intended to be used outside of params.response npm package.
 */
export default class HelloWorld implements ICommandHandler  {
    /**
     * Command line arguments passed
     * @private
     * @type {*}
     * @memberof HelloWorld
     */
    private arguments: any;

    /**
     * Command handler process - invoked by the command processor to handle the "hello world"
     * @param {IHandlerParameters} params - Command handler parameters
     * @returns {Promise<void>} - Fulfilled when the command completes successfully OR rejected with imperative error
     * @memberof HelloWorld
     */
    public async process(params: IHandlerParameters): Promise<void> {
        this.arguments = params.arguments;
        params.response.console.log(this.arguments);    // for testing when pasing some arguments


        params.response.console.log("Hello world!! I am a new command added by mentee 5 in process!! Ayy Ayy Captain");
        const response = await Hello.sayHello();
        switch (params.arguments.name) {
            case "fernando":
                params.response.console.log(response);
                break;
            case "sarthak":
                params.response.console.log('Hey Sarthak !! sending wishes to you from ZOWE CLI OMF project');
                break;
            default:
                throw new ImperativeError({
                    msg: `Internal create error: Unable to determine the the criteria by which to run start hello world action. ` +
                        `Please contact support.`,
                    additionalDetails: JSON.stringify(params)
                });
        }
    }
}

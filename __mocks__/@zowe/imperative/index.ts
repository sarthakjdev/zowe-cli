/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

/**
 * Mocks all imperative classes specified under __mocks__/__imperative__
 * @returns mocked version of the @zowe/imperative module
 */
const __imperative__get = function () {
  const fs = require.requireActual("fs");
  const imperativePath = require("path").resolve(__dirname, "..", "..", "__imperative__");
  const extraClasses: any = {};
  fs.readdirSync(imperativePath).forEach((file: string) => {
    extraClasses[file.split(".")[0]] = require(`${imperativePath}/${file}`);
  });
  return {
    ...require.requireActual("@zowe/imperative"),
    // Note: Comment out the line below if you do not want to mock
    //       the classes in __mocks__/__imperative__/ for local testing purposes
    ...extraClasses
    // Note: You can still use Imperative.console.info("debug") in your test
  };
}

module.exports = __imperative__get();

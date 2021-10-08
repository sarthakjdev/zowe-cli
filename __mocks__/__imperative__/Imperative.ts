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
 * This class is affected by the `-_` option and will hide all imperative logs
 */

if (process.argv.indexOf("-_") != -1) {
  module.exports = {
    ...require.requireActual("@zowe/imperative").Imperative,
    console: require("./Logger"),
  };
} else {
  module.exports = require.requireActual("@zowe/imperative").Imperative;
}

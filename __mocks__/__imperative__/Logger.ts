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

const __imperative__logger = {
  simple: jest.fn(),
  fatal: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  trace: jest.fn(),
  error: jest.fn(),
  logError: jest.fn(),
};

const __imperative__loggerMethods = {
  getLoggerCategory: jest.fn().mockReturnValue(__imperative__logger),
  getConsoleLogger: jest.fn().mockReturnValue(__imperative__logger),
  getImperativeLogger: jest.fn().mockReturnValue(__imperative__logger),
  getAppLogger: jest.fn().mockReturnValue(__imperative__logger),
  initLogger: jest.fn().mockReturnValue(__imperative__logger),
};

console.log(process.argv)
if (process.argv.indexOf('"-_"') != -1 || process.argv.indexOf("-_") != -1 || process.argv.indexOf("_") != -1) {
  module.exports = { ...__imperative__logger, ...__imperative__loggerMethods };
} else {
  module.exports = require.requireActual("@zowe/imperative").Logger;
}

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

const __mocks__path = require("path");

let __mocks__fs = jest.genMockFromModule("fs") as any;
const __mocks__oldReadFileSync = require.requireActual("fs").readFileSync;

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let __mocks__mockFiles = Object.create(null);
function __mocks__fs____setMockFiles(newMockFiles: { [key: string]: string }) {
    __mocks__mockFiles = Object.create(null);
    for (const file in newMockFiles) {
        const dir = __mocks__path.dirname(file);
        if (!__mocks__mockFiles[dir]) {
            __mocks__mockFiles[dir] = {};
        }
        __mocks__mockFiles[dir][__mocks__path.basename(file)] = newMockFiles[file];
    }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function __mocks__fs__readdirSync(filePath: string) {
    return __mocks__mockFiles[filePath] || {};
}

// A custom version of `existsSync` that reads from the special mocked out
// file list set via __setMockFiles
function __mocks__fs__existsSync(filePath: string) {
    const fileContents = __mocks__fs__readdirSync(__mocks__path.dirname(filePath))[__mocks__path.basename(filePath)];
    if (typeof fileContents === "undefined") {
        return false;
    }
    return true;
}

// A custom version of `readFileSync` that reads from the special mocked out
// file list set via __setMockFiles
function __mocks__fs__readFileSync(filePath: string, encoding?: string) {
    // Don't mock if yargs is trying to load a locale json file
    if (filePath.match(/node_modules.yargs/)) {
        return __mocks__oldReadFileSync(filePath, encoding);
    }

    if (!__mocks__fs__existsSync(filePath)) {
        throw new Error("File not found");
    }
    return __mocks__fs__readdirSync(__mocks__path.dirname(filePath))[__mocks__path.basename(filePath)];
}

// A custom version of `lstatSync` that reads from the special mocked out
// file list set via __setMockFiles
function __mocks__fs__lstatSync(filePath: string) {
    return {
        isFile: () => false
    };
}

__mocks__fs.__setMockFiles = __mocks__fs____setMockFiles;
__mocks__fs.existsSync = __mocks__fs__existsSync;
__mocks__fs.readFileSync = __mocks__fs__readFileSync;
__mocks__fs.readdirSync = __mocks__fs__readdirSync;
__mocks__fs.lstatSync = __mocks__fs__lstatSync;

module.exports = __mocks__fs;

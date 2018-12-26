//We cannot directly require inbox.sol because the compiler will execute inbox.sol as Javascript and will throw up an error
//So we need to require the inbox.sol file from the harddrive

const path = require('path'); //For cross compatbility of paths on both Windows and MacOS
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8'); //contains the source code

module.exports = solc.compile(source, 1).contracts[':Inbox']; // 1 is the number of contracts we want to compile

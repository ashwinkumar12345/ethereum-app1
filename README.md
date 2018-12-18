# ethereum-app1

## Interacting with Ethereum

#### Contract Deployment 

- Create a custom node project from scratch
- This project is used for contract creation, local testing, and deployment to the Rinkeby N/W

#### Boilerplate Design Goals

- Need to write Solidity code in a Javascript project: Setup a Solidity compiler to output the ABI
- Need to rapidly test contracts in an automated way: Setup Mocha test runner 
- Need to deploy the contract to a public N/W (Rinkeby) - Setup a deploy script to compile the contract and take the compiled bytecode and deploy it to the Rinkeby N/W

#### Create a new project

- Open your terminal
- Create a new directory:

      mkdir inbox
      
- Change into that directory:

      cd inbox
      
- Initialize a node project:

      npm init
      {Hit enter a few times to accept the defaults}
      
- You should see a new 'package.json' file:

      ls
      {package.json}

#### Project File Walkthrough

- Open Atom code editor in the Inbox directory:

      atom .
      
- Create the following directory structure:

      contracts 
        Inbox.sol {Copy the Inbox.sol code from Remix here}
      test
        Inbox.test.js
      package.json {Already exists}
      compile.js
      deploy.js
     
- contracts - contains the contract source
- test - contains a file with Mocha code to test out the contract
- package.json - records all dependencies in the project
- compile.js - small script that compiles the contract in the contracts folder
- deploy.js - small script that takes the compiled code and deploys it to the Rinkeby N/W

#### Syntax Highlighting in Atom

- Install the 'language-ethereum' plugin in Atom

#### Compile script

- First start with the compile script because both deploying and testing require a compiled contract
- Pass the contract source to the compiler to output the ABI and bytecode
- Install the Solidity compiler:

      npm install --save solc
      
- To access the Inbox.sol file from compile.js, read the contents of the Inbox.sol file from the harddrive
- For OS cross compatibility, build a directory path from compile.js to Inbox.sol using the 'path' module

      const path = require('path');
      const fs = require('fs');
      const solc = require('solc');
      
      const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
      const source = fs.readFileSync(inboxpath, 'utf-8');
      
      console.log(solc.compile(source, 1)); //This logs the compiled output
      
 - Open the terminal inside the inbox directory and run:
 
       node compile.js
       
 - You will see a console log on the screen
 - The return value from the compiler is an object
 - Scroll all the way to the top 
  
       { contracts:
         {  ':Inbox':
           { assembly:[Object],
             bytecode: '....'
             ..
             interface: '[{...}]'
            
- bytecode is the actual raw machine code to deploy to the Rinkeby N/W
- interface is the contract ABI (communication layer between Solidity and Javascript)
- ABI lists all the different functions that can be called by the contract
- You can remove 'console.log' from the 'compile.js' file
- To make the compile output available to other files in our project, change the compile line to:
 
       module.exports = solc.compile(source, 1).contracts[':Inbox'];
       
       

 
 
      
 

            
      

            













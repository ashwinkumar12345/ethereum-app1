# ethereum-app1

## Interacting with Ethereum

> ## Contract Deployment 

- Create a custom node project from scratch
- This project is used for contract creation, local testing, and deployment to the Rinkeby N/W

> ## Boilerplate Design Goals

- Need to write Solidity code in a Javascript project: Setup a Solidity compiler to output the ABI
- Need to rapidly test contracts in an automated way: Setup Mocha test runner 
- Need to deploy the contract to a public N/W (Rinkeby): Setup a deploy script to compile the contract and take the compiled bytecode and deploy it to the Rinkeby N/W

> ## Create a new project

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

> ## Project File Walkthrough

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

> ## Syntax Highlighting in Atom

- Install the 'language-ethereum' plugin in Atom

> ## Compile script

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
       
> ## Testing Architecture

- Take the bytecode from the Solidity compiler and deploy it to a local test Ethereum N/W
- The local test N/W is created by a library called Ganache
- Take the ABI and feed it to web3
- web3 is the portal into the test Ethereum N/W

> ## Installing Testing Modules

- Open your terminal in the Inbox directory
 
       npm install --save mocha ganache-cli web3@1.0.0-beta.35

- Open the Inbox.test.js file and import the following:
 
       const assert = require('assert');
       const ganache = require('ganache-cli');
       const Web3 = require('web3'); //Web3 is a constructor function so it's uppercase

> ## Web3 Providers

- Web3 is the constructor function
- Use Web3 to create an instance 'web3'
- Setup the provider
- Provider is the communication layer between the web3 library and Ethereum N/W (Ganache)
- Provider has a specific set of methods that allow the web3 library to send a request to a local N/W and recieve a request from the N/W
- web3 will always communicate to an Ethereum N/W through a provider
- web3 will always expect you to provide a 'provider'
- Without a provider, web3 will have no idea what N/W to connect to
- Open the Inbox.test.js file and add the provider
- The provider is connecting to the ganache (local) N/W
- To connect to the Rinkeby test N/W, replace the ganache provider with the Rinkeby provider
 
       const web3 = new Web3(ganache.provider());

> ## Testing With Mocha

- Mocha is a general-purpose test running framework
- Mocha has 3 main functions
     - it - Run one individual assertion 
     - describe - Group together 'it' functions (testing the same class)
     - beforeEach - Execute some general setup code
- Sample class
 
       class Car {
         park(){
            return 'stopped';
            }
         drive(){
            return 'vroom';
            }
       }
       
- Sample Mocha test code
 
       describe('Car', () => {
        it('can park', () => {
            const car = new Car();
            assert.equal(car.park(), 'stopped');
        });
       })
 
- Open package.json file
 
       "scripts":{
        "test":"mocha"
        }
        
 - Open your terminal and run
  
       npm run test
       
 - You can see the sample test pass
 - Create a second 'it' statement
 
         it('can drive', () => {
            const car = new Car();
            assert.equal(car.drive(), 'vroom');
        });
        
 - Open your terminal and run
  
       npm run test
       
 - You can see both the sample tests pass 
 - To avoid duplication, use the beforeEach call
  
         let car;
         beforeEach(() => {
           car = new Car(); 
        });
      
 - Remove 'const car = new Car();' from the 'it' statements



 
 
      
 

            
      

            













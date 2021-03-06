# ethereum-app1

> ## Contents

**[Contract Deployment](#contractdeployment)**<br>
**[Boilerplate Design Goals](#contractdeployment)**<br>
**[Create a new project](#createanewproject)**<br>
**[Project File Walkthrough](#projectfilewalkthrough)**<br>
**[Syntax Highlighting in Atom](#syntaxhighlighting)**<br>
**[Compile Script](#compilescript)**<br>
**[Testing Architecture](#testingarchitecture)**<br>
**[Web3 Providers](#web3providers)**<br>
**[Intro to Mocha](#introtomocha)**<br>
**[Mocha Structure](#mochastructure)**<br>
**[Fetching Accounts from Ganache](#fetchingaccountsfromganache)**<br>
**[Refactor to Async Await](#asyncawait)**<br>
**[Use one of the Accounts to Deploy to Ganache](#useonetheofaccountstodeploytoganache)**<br>
**[Asserting Deployment](#assertingdeployment)**<br>
**[Verifying the Initial Message](#verifyingtheinitialmessage)**<br>
**[Testing Message Updates](#testingmessageupdates)**<br>
**[Deployment to Rinkeby](#deploymenttorinkeby)**<br>
**[Infura Signup](#infurasignup)**<br>
**[Wallet Provider Setup](#walletprovidersetup)**<br>
**[Observing Deployment on Etherscan](#observingdeploymentonetherscan)**<br>
**[Deployed Contracts in Remix](#deployedcontractsinremix)**<br>

<a name="contractdeployment"></a>
> ## Contract Deployment 

Create a custom node project from scratch. You can use this project for contract creation, local testing, and deployment to the Rinkeby network.

<a name="boilerplate"></a>
> ## Boilerplate Design Goals

Need to write Solidity code in a Javascript project: set up a Solidity compiler to output the ABI.
Need to rapidly test contracts in an automated way: set up Mocha test runner. 
Need to deploy the contract to a public network (Rinkeby): set up a deploy script to compile the contract and take the compiled bytecode and deploy it to the Rinkeby network.

<a name="createanewproject"></a>
> ## Create a new project

- Open your terminal
- Create a new directory:

      mkdir inbox
      
- Change into that directory:

      cd inbox
      
- Initialize a node project:

      npm init
      {Hit enter a few times to accept the defaults}
      
- You should see a new `package.json` file:

      ls
      {package.json}

<a name="projectfilewalkthrough"></a>
> ## Project File Walkthrough

Open Atom code editor in the Inbox directory:

      atom .
      
Create the following directory structure:

      contracts 
        Inbox.sol {Copy the Inbox.sol code from Remix here}
      test
        Inbox.test.js
      package.json {Already exists}
      compile.js
      deploy.js
     
  - `contracts` - contains the contract source
  - `test` - contains a file with Mocha code to test out the contract
  - `package.json` - records all dependencies in the project
  - `compile.js` - a small script that compiles the contract in the contracts folder
  - `deploy.js` - a small script that takes the compiled code and deploys it to the Rinkeby N/W

<a name="syntaxhighlighting"></a>
> ## Syntax Highlighting in Atom

Install `language-ethereum` plugin in Atom.

<a name="compilescript"></a>
> ## Compile Script

You need to first start with the compile script because both deploying and testing require a compiled contract. In the compile script, pass the contract source to the Solidity compiler to output the ABI and bytecode.

- Install the Solidity compiler:

      npm install --save solc
      
- To access the `Inbox.sol` file from `compile.js`, you would need to read the contents of the `Inbox.sol` file from the harddrive
- For OS cross compatibility, build a directory path from `compile.js` to `Inbox.sol` using the `path` module:

      const path = require('path');
      const fs = require('fs');
      const solc = require('solc');
      
      const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
      const source = fs.readFileSync(inboxpath, 'utf-8');
      
      console.log(solc.compile(source, 1)); //This logs the compiled output
      
 - Open your terminal inside the inbox directory and run:
 
       node compile.js
       
 - You will see a console log on the screen
 - The return value from the compiler is an object
 - Scroll all the way to the top, you will see: 
  
       { contracts:
         {  ':Inbox':
           { assembly:[Object],
             bytecode: '....'
             ..
             interface: '[{...}]'
            
      - `bytecode` is the actual raw machine code to deploy to the Rinkeby N/W
      - `interface` is the contract ABI (communication layer between Solidity and Javascript)
      - `ABI` lists all the different functions that can be called by the contract
      
- You can remove `console.log` from the `compile.js` file
- To make the compile output available to other files in our project, change the compile line to:
 
       module.exports = solc.compile(source, 1).contracts[':Inbox'];

<a name="testingarchitecture"></a>
> ## Testing architecture

You need to now take the bytecode from the Solidity compiler and deploy it to a local test Ethereum network.
The local test network is created by a library called Ganache.
You need to take the ABI and feed it to web3.
web3 is the portal into the test Ethereum network.

<a name="installingtestingmodules"></a>
> ## Installing Testing Modules

Open your terminal in the Inbox directory:
 
       npm install --save mocha ganache-cli web3@1.0.0-beta.35

Open the `Inbox.test.js` file and import the following:
 
       const assert = require('assert');
       const ganache = require('ganache-cli');
       const Web3 = require('web3'); //Web3 is a constructor function so it's uppercase

<a name="web3providers"></a>
> ## Web3 Providers

- Web3 is the constructor function
- Use Web3 to create an instance `web3`
- Setup the provider
- Provider is the communication layer between the web3 library and Ethereum N/W (Ganache)
- Provider has a specific set of methods that allow the web3 library to send a request to a local N/W and recieve a request from the N/W
- web3 always communicates with an Ethereum N/W through a provider
- web3 will always expect you to provide a 'provider'
- Without a provider, web3 will have no idea what N/W to connect to
- Open the `Inbox.test.js` file and add the provider
- The provider is connecting to the Ganache (local) N/W
- To connect to the Rinkeby test N/W, replace the ganache provider with the Rinkeby provider
 
       const provider = ganache.provider();
       const web3 = new Web3(provider);

<a name="introtomocha"></a>
> ## Intro to Mocha

- Mocha is a general-purpose test running framework
- Mocha has three main functions:
     - it - Run one individual assertion 
     - describe - Group together `it` functions (testing the same class)
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
      
 - Remove `const car = new Car();` from the `it` statements
 - Delete the code for this section before proceeding

<a name="mochastructure"></a>
> ## Mocha Structure

- Mocha Starts (executes `Inbox.test.js`)
- In the test code, you need to take the contract bytecode and deploy it to the local test N/W (Ganache) - `beforeEach`
- Write some code to manipulate the contract, for example, change the message - `it`
- Write an assertion to make sure the updated message is persisted in the contract - `it`
- Deploy a fresh new contract and manipulate the contract and assert repeatedly for all test cases
- The ganache module automatically creates a set of accounts that we can use (in an unlocked state)

<a name="fetchingaccountsfromganache"></a>
> ## Fetching Accounts from Ganache

- Freely send or receive ether from unlocked accounts
- Open your `Inbox.test.js` file:
  
      beforeEach(() => {
         
      //Get a list of all accounts
         
      web3.eth.getAccounts().then(fetchedAccounts => {
             console.log(fetchedAccounts);
         });
         
      //Use one of those accounts to deploy the contract
         
      });
         
      describe('Inbox', () => {
         
         it('deploys a contract', () => {
            });
      });
         
- Save the file and run it from the terminal 
- Inside the `Inbox` directory, run:
  
      npm run test
    
- You will see a listing of 10 accouunts
- These accounts are all unlocked so we can use any of them to deploy contracts, send ether, call a function in a contract, and so on

<a name="asyncawait"></a>
> ## Refactor to Async Await

- Rather than using .then (promises), we can use `async await` syntax to clean up the code
  
      let accounts;
      beforeEach(async () => {
             accounts = await web3.eth.getAccounts();
      });

<a name="useonetheofaccountstodeploytoganache"></a>
> ## Use one of the Accounts to Deploy to Ganache

- Require in the ABI and bytecode from the `compile.js` script
  
      const { interface, bytecode } = require('../compile.js');

- Deploy the contract with one of the accounts:
  
      let inbox;
      beforeEach(async () => {
          accounts = await web3.eth.getAccounts();
             
          //Use one of the accounts to deploy to Ganache
             
          inbox = await new web3.eth.Contract(JSON.parse(interface)) //tells web3 that there is a contract with this interface (ABI)
                  .deploy({data: byetcode, arguments: ['Hi there!'] }) //tells web3 we want to deploy this contract with this argument
                  .send({ from: accounts[0], gas: '1000000' }) 
                  //tells web3 to send this transaction to deploy this contract from the specified account 
                  //inbox is the Javascript representation of the contract
                  //we can use it as an object and call functions it that correspond to the original source of the contract
                  
          inbox.setProvider(provider);
      });
      describe('Inbox', () => {
         
       it('deploys a contract', () => {
         console.log('inbox');
            });
      });

- Open your terminal and run:
  
      npm run test

- You will see the deployed contract

<a name="assertingdeployment"></a>
> ## Asserting Deployment

- The inbox object should be assigned an address for us to know that the inbox contract has been deployed successfully to Ganache

      describe('Inbox', () => {
         
       it('deploys a contract', () => {
         assert.ok(inbox.options.address); //If address exists the contract is deployed
            });
      });
      
- Open your terminal and run:
  
      npm run test
 
 - Make sure deployment test passes correctly
 
 <a name="verifyingtheinitialmessage"></a>
> ## Verifying the Initial Message

- You need to make sure that when you create a contract, it is initialized with a message

      describe('Inbox', () => {
         
       it('has a default message', async () => {
            const message = await inbox.methods.message().call() 
            //methods contains all public functions in our contract, we are referencing the message function, the message function does               not require any arguments, the call() is only retrieving the message and not modifying the data
            assert.equal(message, 'Hi there!');
            });
      });
      
- Open your terminal and run:
  
      npm run test
 
 - Make sure the inital message test passes successfully
 
  <a name="testingmessageupdates"></a>
 > ## Testing Message Updates

- You need to test the setMessage function to make sure the message changes correctly
- For this you need to first create a new instance of the contract (this is already being done in the beforeEach section)
- Modify the message by calling setMessage
- Retrieve the message again and make sure it's the new one
         
       it('can change message', async () => {
       
            await inbox.methods.setMessage('bye').send({ from:accounts[0] })
            //send is used for sending a transaction to the N/W and so we have to specify the account to be used 
            //when we send a transaction we get back the transaction hash
            
            const message = await inbox.methods.message().call();
            assert.equal(message, 'bye');
            });
      });
      
- Open your terminal and run:
  
      npm run test
 
 - Make sure the set message test passes successfully
 
  <a name="deploymenttorinkeby"></a>
  > ## Deployment to Rinkeby

- You want to now deploy the inbox contract to a real network (rinkeby) as opposed to a local test network
- To deploy the contract to the Rinkeby network, you need to have an account with some amount of ether on the Rinkeby network
- You'll use your 12-word account mnemonic that you created earlier 
- You also need to connect to some node on the Rinkeby network, for this you can either host an Ethereum Now or use the Infura public API

<a name="infurasignup"></a>
> ## Infura Signup

- Go to infura.io
- Click the Get Started for Free button
- Create a new account
- Verify your email
- Go to your dashboard
- Click Create a New Project with any name - 'Rinkeby API'
- Go to Endpoint and select Rinkeby in the dropdown
- Copy the endpoint link

<a name="walletprovidersetup"></a>
> ## Wallet Provider Setup

- Open your terminal inside your Inbox directory:
  
      npm install --save truffle-hdwallet-provider@0.0.3
      
- The provider is how the web3 instance talks to a specific network
- Under the root directory, create a new file called deploy.js with the following code:
  
      const HDWalletProvider = require('truffle-hdwallet-provider');
      const Web3 = require('web3');
      const { interface, bytecode } = require('./compile');
      
      const provider = new HDWalletProvider(
            '//type in your 12-word mnemonic here',
            '//copy your infura endpoint link'
            );
      
      const web3 = new Web3(provider); 
      
      const deploy = async() => {
            const accounts = await web3.eth.getAccounts();
            
            console.log('Attempting to deploy contract from account', accounts[0]);
            
            const result = await new web3.eth.Contract(JSON.parse(interface))
                  .deploy({ data: bytecode, arguments: ['Hi there'] });
                  .send({ gas: '1000000', from: accounts[0] }); 
                  
            console.log('Contract deployed to', result.options.address);
      };
      deploy();
      
- Open your terminal inside your Inbox directory:
  
      node deploy.js
      //It will take some time for deployment to any real network
      ...
      
      Attempting to deploy from account XXX
      Contract deployed to XXX
      
 <a name="observingdeploymentonetherscan"></a>
> ## Observing Deployment on Etherscan

- Go to rinkeby.etherscan.io
- Copy paste the deployed address from your terminal into the search bar
- Click Go
- Observe your contract details

 <a name="deployedcontractsinremix"></a>
> ## Deployed Contracts in Remix

- Open your browser and open Remix code editor
- In the Environment tab, select Injected Web3
- Your account is automatically selected
- Paste in the address where your contract is deployed and click At Address
- Add in a new message and click setMessage
- You will see a browser pop up from metamask to confirm the transaction as this costs ether
- Click Submit
- It will take 15 to 20 sec to change data in a real network
- You can see the message update by clicking message
- The contents of the message variable is now changed on the blockchain


      
 

            
      

            













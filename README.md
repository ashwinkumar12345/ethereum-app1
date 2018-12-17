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
- Create a new directory

      mkdir inbox
      
- Change into the directory

      cd inbox
      
- Initialize a node project

      npm init
      {Hit enter a few times to accept the defaults}
      
- You should see a new 'package.json' file

      ls
      {package.json}

#### Project File Walkthrough

- Open Atom code editor in the Inbox directory

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













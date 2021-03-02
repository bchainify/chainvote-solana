# Bchainify Chainvote Dev Work for Solana Blockchain

# Project Video

[Bchainify Chainvote on Solana](https://www.youtube.com/watch?v=KT5GeZ5lXjU)

#[Project Demo](https://www.youtube.com/watch?v=3HgVMl-DlsQ)

Try the Live App Demo: https://bchainify-chainvote-solana.netlify.app/login

[Project Github Frontend](https://github.com/bchainify/chainvote-sol-frontend) and [Project Github SOL Smart Contract](https://github.com/bchainify/chainvote-solana-contract)

# Project Wiki
[Bchainify Chainvote on Solana Project Site](https://github.com/bchainify/chainvote-solana/wiki)

# Chainvote Corporate Governance on Solana

> DAOs are the new form of Corporate Governance.   Our project is to build an environment of trust, transparency, and accountability on Solana’s fast, secure, and censorship-resistant blockchain platform. Using a Solana smart contract the Corporate Secretary is able to publish an agenda with proposals to bring before the board and voting members.  When publishing the proposal the smart contract will send voting members the SOL voting token(s) to their wallet, automating notification for new items to review for voting. Using the Chainvote Dapp Voting members can see the proposals and use SOL token to cast their vote, (1) SOL token = (1) vote.

# Overview

Our project is to build an environment of trust, transparency, and accountability on Solana’s fast, secure, and censorship-resistant blockchain platform. Using a Solana smart contract the Corporate Secretary is able to publish an agenda with proposals to bring before the board and voting members. When publishing the proposal the smart contract will send voting members the SOL voting token(s) to their wallet, automating notification for new items to review for voting. Using the Chainvote Dapp Voting members can see the proposals and use SOL token to cast their vote, (1) SOL token = (1) vote.  We are looking for a [Solana Project Grant](https://github.com/bchainify/chainvote-solana/blob/main/mktg/Bchainify_Chainvote_Solana_LeanCanvas_2021.pdf) to continue building **[#Solana-Foundation-x-Serum-DeFi-Hackathon-2021](https://github.com/solana-labs/defi-hackathon).**


#### INTERACTIVE: Corporate Governance Dapp frontend design that interacts with Solona's fast, low-fee,  scalable, and censorship-resistant blockchain

#### IMMUTABLE: Strong identity management, secure and private data management stored on-chain with a transparent, immutable audit trail

#### INNOVATIVE: Replacement for antiquated procedures, increased participation, and significant cost savings

******
# Product Whiteboard Design

<img src="https://github.com/bchainify/chainvote-solana/blob/main/mktg/bchainify-chainvote-cg-product-roadmap.png" width="100%" height="100%">

# Challenges we ran into

Solana error handling and debugging on Windows platform.  This was resolved by using Linux.  Also, first time using Solana rust smart contract.

# Technologies we used

* [Figma Wireframes UI/UX Design](https://www.figma.com/file/R7kt20BSByK42YVQi0cL3E/Chainvote-Browser-Application?node-id=0%3A1)
* Microsoft Whiteboard for User Story Flowchart UML activity diagrams
* Visual Studio Code
* NodeJS
* Yarn (DappStarter uses Yarn Workspaces)
* Solana CLI Tools
* Rust  
* Decentology Dapp Builder
* Project Github - https://github.com/bchainify/chainvote-solana 

# Screenshots

[Design content](https://github.com/bchainify/chainvote-solana/tree/main/mktg)

# Team Members

* Abhir Elandasserry - abhir1234@bchainify.org
* Prasad Kumkar - prasad@bchainify.org
* Kristine Mallari - kristine@bchainify.org
* Hakeem Oréwọlé - yorewole@bchainify.org
* Tevo Saks - tevo@bchainify.org
* Marlene Veum - marlene@bchainify.org

# Development Work Pre-requisites

In order to develop and build "My Dapp," the following pre-requisites must be installed:

* [Visual Studio Code](https://code.visualstudio.com/download) (or any IDE for editing Javascript)
* [NodeJS](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install) (DappStarter uses [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces))
* [Solana CLI Tools](https://docs.solana.com/cli/install-solana-cli-tools)
* Rust (see "Dependency Guides" at the end for help installing) 

### Dependency Checklist 
```bash
$ node --version
$ npm --version
$ rustup --version
$ rustc --version
$ cargo --version
$ solana --version
```

# Installation

Using a terminal (or command prompt), change to the folder containing the project files and type: `yarn` This will fetch all required dependencies. The process will take 1-3 minutes and while it is in progress you can move on to the next step.

# Yarn Errors

You might see failures related to the `node-gyp` package when Yarn installs dependencies.
These failures occur because the node-gyp package requires certain additional build tools
to be installed on your computer. Follow the [instructions](https://www.npmjs.com/package/node-gyp) for adding build tools and then try running `yarn` again.

# Build, Deploy and Test
Using a terminal (or command prompt), change to the folder containing the project files and type: `yarn start` This will run all the dev scripts in each project package.json.

The first time you run `yarn start` there are a fair number of Rust libraries that are
downloaded and pre-compiled. As a result, it may be take from 5-10 mins. before the
dapp is compiled and launched the first time. On subsequent compilations, the build
time will only be a few seconds.

## File Locations
Here are the locations of some important files:
* Program Code: [packages/dapplib/programs/src/lib.rs](packages/dapplib/programs/src/lib.rs)
* Dapp Library: [packages/dapplib/src/lib/dapp-lib.js](packages/dapplib/src/lib/dapp-lib.js)
* Solana Wrapper: [packages/dapplib/src/lib/solana.js](packages/dapplib/src/lib/solana.js) 
* Blockchain Interactions: [packages/dapplib/src/lib/blockchain.js](packages/dapplib/src/lib/blockchain.js)
* Data Layouts: [packages/dapplib/src/scripts/layouts.js](packages/dapplib/src/scripts/layouts.js)
* Migration Script: [packages/dapplib/src/scripts/migrate.js](packages/dapplib/src/scripts/migrate.js)

To view your dapp, open your browser to http://localhost:5000 for the DappStarter Workspace.

We ♥️ developers and want you to have an awesome experience. You should be experiencing Dappiness at this point. If not, let us know and we will help. Visit [https://support.decentology.com](https://support.decentology.com) or hit us up on Twitter @decentology.

## Dependency Guides

This section contains installation guides for common dev environments. 

### Rust

(Source: Solana)
We suggest that you install Rust using the 'rustup' tool. Rustup will install
the latest version of Rust, Cargo, and the other binaries.

Follow the instructions at [Installing Rust](https://www.rust-lang.org/tools/install).

For Mac users, Homebrew is also an option.  The Mac Homebrew command is `brew install rustup` and then
`rustup-init`. See [Mac Setup](https://sourabhbajaj.com/mac-setup/Rust/) &
[Installing Rust](https://www.rust-lang.org/tools/install) for more details.

After installation, you should have `rustc`, `cargo`, & `rustup`. You should
also have `~/.cargo/bin` in your PATH environment variable.



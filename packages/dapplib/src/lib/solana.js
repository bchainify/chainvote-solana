const {
    Account,
    Connection,
    BpfLoader,
    BPF_LOADER_PROGRAM_ID,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
  } = require('@solana/web3.js');
const bs58 = require('bs58');
const DataLayouts = require('../scripts/layouts');

class Solana {

    constructor(config) {
        this.serviceUri = config.httpUri;
        this.connection = new Connection(this.serviceUri, 'singleGossip');
    }

    static getPublicKey(publicKey) {
        return typeof publicKey === 'string' ? new PublicKey(publicKey) : publicKey;
    }

    static getSigningAccount(privateKey) {
        return new Account(privateKey);
    }

    async getAccountInfo(publicKey) {
        return await this.connection.getAccountInfo(Solana.getPublicKey(publicKey));
    }

    static getDataLayouts() {
        return DataLayouts.get();
    }

    async getAccountBalance(publicKey) {
        return await this.connection.getBalance(Solana.getPublicKey(publicKey));
    }

    async airDrop(account, lamports) {
        await this.connection.requestAirdrop(Solana.getPublicKey(account), lamports);
    }

    async createSystemAccount() {

        let self = this;
        let lamports = 1;
        let account = new Account();
        
        console.log(`🤖 Account ${account.publicKey} created. Requesting Airdrop...`);
        await self.airDrop(Solana.getPublicKey(account.publicKey), lamports);
        return account;
    }

    /**
     * Creates an account and adds lamports
     * 
     * @param options   lamports: Number of lamports to add
     *                  entropy:  Secret key used to generate account keypair Buffer | Uint8Array | Array<number>
     * @returns Account that was created
     */    
    async createAccount(options) {

        let self = this;
        let lamports = options.lamports || 1000000;
        let account = options.entropy ? new Account(options.entropy) : new Account();
        
        let retries = 10;

        console.log(`🤖 Account ${account.publicKey} created. Requesting Airdrop...`);
        await self.airDrop(Solana.getPublicKey(account.publicKey), lamports);
        for (;;) {
            await Solana._sleep(500);
            if (lamports == (await self.getAccountBalance(Solana.getPublicKey(account.publicKey)))) {
                console.log(`🪂 Airdrop success for ${account.publicKey} (balance: ${lamports})`);
                return account;
            }
            if (--retries <= 0) {
                break;
            }
            console.log(`--- Airdrop retry #${retries} for ${account.publicKey}`);
        }
        throw new Error(`Airdrop of ${lamports} failed for ${account.publicKey}`);
    }


    async createPayerAccount(program) {
        let self = this;
        let dataLayouts = Solana.getDataLayouts();
        let fees = 0;
        const {feeCalculator} = await self.connection.getRecentBlockhash();
    
        // Calculate the cost to load the program
        const NUM_RETRIES = 500;
        fees +=
          feeCalculator.lamportsPerSignature *
            (BpfLoader.getMinNumSignatures(program.length) + NUM_RETRIES) +
          (await self.connection.getMinimumBalanceForRentExemption(program.length));
    
        // Calculate the cost to fund all state accounts
        for(let l=0; l<dataLayouts.length; l++) {
            fees += await self.connection.getMinimumBalanceForRentExemption(
                dataLayouts[l].span,
              );      
        }
    
        // Calculate the cost of sending the transactions
        fees += feeCalculator.lamportsPerSignature * 100; // wag
    
        // Fund a new payer via airdrop
        return await self.createAccount({ lamports: fees });
    }

    async deployProgram(program){

        let self = this;
        let dataLayouts = Solana.getDataLayouts();

        let payerAccount = await self.createPayerAccount(program);
        let deployAccounts = {
            "payer": {
                publicKey: payerAccount.publicKey.toBase58(),
                privateKey: bs58.encode(payerAccount.secretKey),
                lamports: await self.getAccountBalance(payerAccount.publicKey)
            }
        };

        let programAccount = new Account();
        await BpfLoader.load(
                                self.connection,
                                payerAccount,
                                programAccount,
                                program,
                                BPF_LOADER_PROGRAM_ID,
                            );
        let programId = programAccount.publicKey;

        // Create all the state accounts
        let transactionAccounts = [ payerAccount ];
        let transaction = new Transaction();
        for(let l=0; l<dataLayouts.length; l++) {
            let stateAccount = new Account();
            transactionAccounts.push(stateAccount);
            let space = dataLayouts[l].layout.span;
            let lamports = await self.connection.getMinimumBalanceForRentExemption(
              dataLayouts[l].layout.span,
            );
            transaction.add(
                            SystemProgram.createAccount({
                                fromPubkey: payerAccount.publicKey,
                                newAccountPubkey: stateAccount.publicKey,
                                lamports,
                                space,
                                programId,
                            }),
                        );

            deployAccounts[dataLayouts[l].name] = {
                            publicKey: stateAccount.publicKey.toBase58(),
                            privateKey: bs58.encode(stateAccount.secretKey),
                            lamports
            }          
        }

        await sendAndConfirmTransaction(
            self.connection,
            transaction,
            transactionAccounts,
            {
              commitment: 'singleGossip',
              preflightCommitment: 'singleGossip',
            },
          );

        return {
            programId:  programAccount.publicKey.toBase58(),
            programAccounts: deployAccounts
        }
    }
   
    async submitTransaction(options) {
        let self = this;
        let instruction =  new TransactionInstruction({
                                            keys: options.keys,
                                            programId: options.programId,
                                            data: options.data
                                        });

        return await sendAndConfirmTransaction(
            self.connection,
            new Transaction().add(instruction),
            [ options.payer ],
            {
                commitment: 'singleGossip',
                preflightCommitment: 'singleGossip',
            },
            );
    }

    static async _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = {
    Solana
}
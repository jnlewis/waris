import StellarSdk, { FastSigning } from "stellar-sdk";
import StorageService from './storageService';

const DEFAULT_TX_TIMEOUT_SEC = 180;
const TX_FEE = "1000"; //default is 100

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

export const isAccountExists = async (account) => {
  return new Promise((resolve, reject) => {
    server
      .loadAccount(account)
      .catch(function (error) {
        if (error instanceof StellarSdk.NotFoundError) {
          resolve(false);
        } else {
          reject(error);
        }
      })
      .then(function () {
        resolve(true);
      });
  });
};

export const createKeyPair = () => {
  // create a completely new and unique pair of keys
  // see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html
  const keypair = StellarSdk.Keypair.random();
  return keypair;
};

export const getKeyPair = (secretKey) => {
  try {
    return StellarSdk.Keypair.fromSecret(secretKey);
  } catch {
    return null;
  }
};

export const generateKeyAndCreateAccount = async () => {
  return new Promise((resolve, reject) => {
    const keypair = createKeyPair();
    createAccount(keypair)
      .then((result) => {
        resolve(keypair.secret());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createAccount = async (keypair) => {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        keypair.publicKey()
      )}`
    );
    const responseJSON = await response.json();
    return true;
  } catch (error) {
    throw error;
  }
};

export const getBalance = async (accountPublicKey) => {
  return new Promise((resolve, reject) => {
    let result = [];
    server
      .loadAccount(accountPublicKey)
      .then((account) => {
        account.balances.forEach(function (balance) {
          if (balance.asset_type === 'native') {
            result.push({
              assetType: 'XLM',
              balance: balance.balance,
            });
          } else {
            result.push({
              assetType: balance.asset_type,
              balance: balance.balance,
            });
          }
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAssetByName = (assetName) => {
  if (assetName.toLowerCase() == "native") {
    return StellarSdk.Asset.native();
  }
  if (assetName.toLowerCase() == "usd") {
    return new StellarSdk.Asset(
      "USD",
      "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7"
    );
  }

  return StellarSdk.Asset.native();
};

export const makePayment = (
  senderKeypair,
  recipientAccount,
  asset,
  amount,
  memo
) => {
  // Transaction will hold a built transaction we can resubmit if the result is unknown.
  var transaction;

  // Check to make sure that the destination account exists.
  server
    .loadAccount(recipientAccount)
    .catch(function (error) {
      if (error instanceof StellarSdk.NotFoundError) {
        throw new Error("The recipient account does not exist.");
      } else return error;
    })
    .then(function () {
      return server.loadAccount(senderKeypair.publicKey());
    })
    .then(function (senderAccount) {
      transaction = new StellarSdk.TransactionBuilder(senderAccount, {
        fee: TX_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: recipientAccount,
            asset: asset,
            amount: amount,
          })
        )
        .addMemo(StellarSdk.Memo.text(memo))
        .setTimeout(DEFAULT_TX_TIMEOUT_SEC)
        .build();

      transaction.sign(senderKeypair);

      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      console.log("Success! Results:", JSON.stringify(result));
    })
    .catch(function (error) {
      console.error("Something went wrong!", JSON.stringify(error));
      // If the result is unknown (no response body, timeout etc.) we simply resubmit
      // already built transaction:
      // server.submitTransaction(transaction);
    });
};

export const getAccountTransactions = (account) => {

  return new Promise((resolve, reject) => {
    server.transactions()
    .forAccount(account)
    .call()
    .then(function (result) {
      console.log(`[getAccountTransactions]`);
      console.log(result);
      resolve(result);
    })
    .catch(function (err) {
      console.error(err);
      reject(err);
    })
  });
};

export const getLatestClaimableBalanceId = async (publicKey) => {
  const res = await fetch(`https://horizon-testnet.stellar.org/claimable_balances?sponsor=${publicKey}&order=desc`);
  const claimables = await res.json();

  if (claimables) {
    return claimables._embedded.records[0].id;
  } else {
    return null;
  }
}
export const getClaimablesByCreator = async (publicKey) => {

  // TODO: 
  // the following endpoint returns the list of claimable balances by sponsor
  // However we haven't figured out how to get the memo. So for demo purpose we are using local storage
  // https://horizon-testnet.stellar.org/claimable_balances?sponsor=GDWGYZGLUFBZPECJIGBBEQOG7FBSW7Q2FDRJJ5LYD2UXP7HQHZIOJS3A&order=desc
  
  let result = StorageService.getClaimables();
  return result.filter(x => x.sender === publicKey);
};

export const getClaimablesByBeneficiary = async (publicKey) => {

  // TODO: 
  // the following endpoint returns the list of claimable balances by sponsor
  // we haven't yet been able to retrieve by claimant destination. So for demo purpose we are using local storage
  // https://horizon-testnet.stellar.org/claimable_balances?sponsor=GDWGYZGLUFBZPECJIGBBEQOG7FBSW7Q2FDRJJ5LYD2UXP7HQHZIOJS3A&order=desc
  // server
  //   .claimableBalances({ claimant: value })
  //   .call()
  //   .then(result => {
  //     console.log(result);
  //   });

  let result = StorageService.getClaimables();
  return result.filter(x => x.beneficiaryAccount === publicKey);
};

export const buildCreateClaimableBalanceTransaction = (
    creatorKeypair,
    beneficiaryAccount,
    asset,
    amount,
    name,
    claimableDate) => {

  return new Promise((resolve, reject) => {
    server
      .loadAccount(beneficiaryAccount)
      .catch(function (error) {
        if (error instanceof StellarSdk.NotFoundError) {
          reject("The beneficiary account does not exist.");
        } else reject(error);
      })
      .then(function () {
        return server.loadAccount(creatorKeypair.publicKey());
      })
      .then(function (creatorAccount) {
        const creatorPredicate = StellarSdk.Claimant.predicateBeforeAbsoluteTime(
          claimableDate.getTime().toString()
        );
        const inheritorPredicate = StellarSdk.Claimant.predicateNot(
          creatorPredicate
        );

        const claimants = [
          new StellarSdk.Claimant(creatorKeypair.publicKey(), creatorPredicate),
          new StellarSdk.Claimant(beneficiaryAccount, inheritorPredicate),
        ];

        let transaction = new StellarSdk.TransactionBuilder(creatorAccount, {
          fee: TX_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.createClaimableBalance({
              asset: asset,
              amount: amount,
              claimants: claimants,
            })
          )
          .addMemo(StellarSdk.Memo.text(name))
          .setTimeout(DEFAULT_TX_TIMEOUT_SEC)
          .build();

        transaction.sign(creatorKeypair);

        resolve(transaction);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export const buildClaimTransaction = (beneficiaryKeypair, balanceId) => {
  
  return new Promise((resolve, reject) => {
    server
      .loadAccount(beneficiaryKeypair.publicKey())
      .then(function (account) {

        let transaction = new StellarSdk.TransactionBuilder(account, {
          fee: TX_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
        .addOperation(
          StellarSdk.Operation.claimClaimableBalance({
            balanceId: balanceId,
          })
        )
        .addMemo(StellarSdk.Memo.text("Claim balance"))
        .setTimeout(DEFAULT_TX_TIMEOUT_SEC)
        .build();

      transaction.sign(beneficiaryKeypair);

      resolve(transaction);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}

export const submitTransaction = (transaction) => {
  
  // // TODO: test
  // return new Promise((resolve, reject) => {
  //   setTimeout(function(){ 
  //     resolve(true);
  //   }, 3000);
  // });

  return new Promise((resolve, reject) => {
    server.submitTransaction(transaction)
    .then(result => {
      resolve(true);
    })
    .catch(function (error) {
      console.log(error);
      resolve(false);
    });
  });
};

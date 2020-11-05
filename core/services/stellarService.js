import StellarSdk, { FastSigning } from "stellar-sdk";
import StorageService from './storageService';

const DEFAULT_TX_TIMEOUT_SEC = 180;
const TX_FEE = "1000"; //default is 100

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

export const test = (value) => {
  console.log(`[test]`);

  server.claimableBalances({ claimant: value })
  .call()
  .then(result => {
    console.log(result);
  });

};

export const isAccountExists = async (account) => {
  console.log(`[isAccountExists]`);
  return new Promise((resolve, reject) => {
    server
      .loadAccount(account)
      .catch(function (error) {
        console.log("failed");
        console.log(error);
        if (error instanceof StellarSdk.NotFoundError) {
          resolve(false);
        } else {
          reject(error);
        }
      })
      .then(function () {
        console.log("success");
        resolve(true);
      });
  });
};

export const createKeyPair = () => {
  console.log(`[createKeyPair]`);

  // create a completely new and unique pair of keys
  // see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html
  const keypair = StellarSdk.Keypair.random();

  console.log(`secret: ${keypair.secret()}`);
  console.log(`publicKey: ${keypair.publicKey()}`);

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
  console.log(`[generateKeyAndCreateAccount]`);

  return new Promise((resolve, reject) => {
    const keypair = createKeyPair();
    createAccount(keypair)
      .then((result) => {
        console.log(
          `[generateKeyAndCreateAccount] returning from promise with result ${result}`
        );
        resolve(keypair.publicKey());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createAccount = async (keypair) => {
  console.log(`[createAccount]`);

  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        keypair.publicKey()
      )}`
    );
    const responseJSON = await response.json();
    //console.log("SUCCESS! You have a new account :)\n", JSON.stringify(responseJSON));
    return true;
  } catch (error) {
    throw error;
  }
};

export const getBalance = async (accountPublicKey) => {
  console.log(`[getBalance]`);

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
  console.log("[makePayment]");

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
  console.log(`[getAccountTransactions]`);

  var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  server.transactions()
    .forAccount(account)
    .call()
    .then(function (accountResult) {
      console.log(accountResult);
      console.log(JSON.stringify(accountResult));
    })
    .catch(function (err) {
      console.error(err);
    })
};

export const getClaimablesByCreator = async (publicKey) => {
  // TODO: 
  // the claimable_balance endpoint in horizon does not return the correct values
  // using local storage as temporary place holder
  let result = StorageService.getClaimables();
  return result.filter(x => x.sender === publicKey);
};

export const getClaimablesByBeneficiary = async (publicKey) => {

  // server
  //   .claimableBalances({ claimant: value })
  //   .call()
  //   .then(result => {
  //     console.log(result);
  //   });
  
  // TODO: 
  // the claimable_balance endpoint in horizon does not return the correct values
  // using local storage as temporary place holder
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
  console.log("[buildCreateClaimableBalanceTransaction]");

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
  console.log("[createClaimTransaction]");

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
  console.log(`[submitTransaction]`);

  // TODO: test
  return new Promise((resolve, reject) => {
    setTimeout(function(){ 
      resolve(true);
    }, 3000);
  });

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

const getStorageClaimable = (tx) => {

  // tx._operations[0].claimants[0]._destination
  // tx._operations[0].amount
  // tx._tx._attributes.memo._value
  
  let result = {
    balanceId: "aaaa0000",
    name: "Tiffany's Education Fund",
    amount: "3000",
    asset: "XLM",
    claimableDate: "2022-10-20",
    beneficiaryAccount:
      "GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5",
  };

  return result;
}

// References
// https://developers.stellar.org/docs/glossary/claimable-balance/
// https://stellar.github.io/js-stellar-sdk/Operation.html#.createClaimableBalance
// https://github.com/stellar/js-stellar-base/blob/master/CHANGELOG.md (find for predicate)

/*
Add Operation.claimClaimableBalance (#368) Extend the operation class with a new helper 
to create claim claimable balance operations. It receives the balanceId as exposed by 
Horizon in the /claimable_balances end-point.
 */

// get account transactions
// https://horizon.stellar.org/accounts/{accountId}/transactions


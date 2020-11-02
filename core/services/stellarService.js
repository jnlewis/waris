import StellarSdk, { FastSigning } from "stellar-sdk";

const DEFAULT_TX_TIMEOUT_SEC = 180;
const TX_FEE = "1000"; //default is 100

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

export const test = () => {
  console.log(`[test]`);
  console.log(StellarSdk.Asset.native());
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
          console.log(balance);
          result.push({
            assetType: balance.asset_type,
            balance: balance.balance,
          });
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

export const createClaimableBalance = (
  creatorKeypair,
  inheritorAccount,
  asset,
  amount,
  memo,
  claimableDate
) => {
  console.log("[createClaimableBalance]");

  // Transaction will hold a built transaction we can resubmit if the result is unknown.
  var transaction;

  // Check to make sure that the inheritor account exists.
  server
    .loadAccount(inheritorAccount)
    .catch(function (error) {
      if (error instanceof StellarSdk.NotFoundError) {
        throw new Error("The inheritor account does not exist.");
      } else return error;
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
        new StellarSdk.Claimant(inheritorAccount, inheritorPredicate),
      ];

      transaction = new StellarSdk.TransactionBuilder(creatorAccount, {
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
        .addMemo(StellarSdk.Memo.text(memo))
        .setTimeout(DEFAULT_TX_TIMEOUT_SEC)
        .build();

      transaction.sign(creatorKeypair);

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

  var server = new StellarSdk.Server("https://horizon.stellar.org");

  // var callback = function (response) {
  //   console.log(response);
  // };

  // var es = server
  //   .transactions()
  //   .forAccount(account)
  //   .cursor("now")
  //   .stream({ onmessage: callback });

  server
    .transactions()
    .forAccount(account)
    .then((response) => console.log(resoponse));
};

export const getClaimablesByCreator = (publicKey) => {
  // TODO: retrieve all transactions, then return only claimables
};

export const getClaimablesByInheritor = (publicKey) => {
  // TODO: retrieve all transactions, then return only claimables
  /*
  // Method 3: Account B could alternatively do something like:
  balances, err := client.ClaimableBalances(sdk.ClaimableBalanceRequest{Claimant: B})
  check(err)
  balanceId := balances.Embedded.Records[0].BalanceID
  */
};

export const claim = (inheritorKeypair, balanceId) => {
  console.log("[makePayment]");

  // const balanceId = '00000000da0d57da7d4850e7fc10d2a9d0ebc731f7afb40574c03395b17d49149b91f5be';

  var transaction;

  server
    .loadAccount(inheritorKeypair.publicKey())
    .then(function (account) {
      transaction = new StellarSdk.TransactionBuilder(account, {
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

      transaction.sign(inheritorKeypair);

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

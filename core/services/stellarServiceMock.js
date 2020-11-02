import StellarSdk from "stellar-sdk";

export const createClaimableBalance = (
  creatorKeypair,
  inheritorAccount,
  asset,
  amount,
  memo,
  claimableDate
) => {
  console.log("[createClaimableBalance]");
};

export const getAccountTransactions = (account) => {
  console.log(`[getAccountTransactions]`);
};

export const getClaimablesByCreator = async (publicKey) => {
  let fundsData = [];
  fundsData.push({
    name: "Tiffany's Education Fund",
    amount: "3000",
    asset: "Lumens",
    claimableDate: "2022-10-20",
    beneficiaryAccount:
      "GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5",
  });
  fundsData.push({
    name: "Retirement Savings",
    amount: "50000",
    asset: "Lumens",
    claimableDate: "2030-10-20",
    beneficiaryAccount:
      "GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5",
  });

  return fundsData;
};

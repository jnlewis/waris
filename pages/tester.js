import Head from "next/head";
import {
  createKeyPair,
  getKeyPair,
  createAccount,
  getBalance,
  makePayment,
  test,
  getAssetByName,
  createClaimableBalance,
  claim,
  getAccountTransactions,
} from "./../core/services/stellarService";

export default function Tester() {
  const actionClick = () => {
    console.log(`[actionClick]`);

    //createKeyPair();

    // Account A: secret: SD3X25CKUHPZGFF4SWTXYLXXBUPOVCN4FBKZ3LGH4KYKYGGCAAXNR6QU
    const accountA = getKeyPair(
      "SD3X25CKUHPZGFF4SWTXYLXXBUPOVCN4FBKZ3LGH4KYKYGGCAAXNR6QU"
    );
    // Account B: secret: SD4NCFJIGT4F7YKJ7T2NMRJBOHEN557UT6LLA7WQPY4W4NBXOFRTFNDO
    const accountB = getKeyPair(
      "SD4NCFJIGT4F7YKJ7T2NMRJBOHEN557UT6LLA7WQPY4W4NBXOFRTFNDO"
    );

    //test();
    //createAccount(pair);

    getAccountTransactions(accountA);

    // getBalance(accountA).then(result => {
    //   console.log('balanceAccountA');
    //   console.log(JSON.stringify(result));
    // });

    // getBalance(accountB).then(result => {
    //   console.log('balanceAccountB');
    //   console.log(JSON.stringify(result));
    // });

    // makePayment(
    //   accountA,
    //   accountB.publicKey(),
    //   getAssetByName("native"),
    //   "50",
    //   "Sending this as a test"
    // );

    // createClaimableBalance(
    //     accountA,
    //     accountB.publicKey(),
    //     getAssetByName('native'),
    //     '50',
    //     'Tiffanys College Fund',
    //     new Date("2020", "10", "02")
    //   );

    //claim(accountB, '');
  };

  return (
    <div className="container">
      <Head>
        <title>Waris</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <button onClick={() => actionClick()}>Action</button>
      </div>
    </div>
  );
}

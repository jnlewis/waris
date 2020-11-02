import React, { useState, useEffect } from "react";
import { getBalance, getKeyPair } from "../core/services/stellarService.js";
import styles from "./account-balance.style.js";

export default function AccountBalance() {
  const [balances, setBalances] = useState();

  useEffect(() => {
    const secretKey = localStorage.getItem("loggedInKey");
    const keypair = getKeyPair(secretKey);

    if (!balances) {
      getBalance(keypair.publicKey()).then((result) => {
        setBalances(result);
        console.log(JSON.stringify(result));
      });
    }
  }, [balances]);

  const displayBalances = () => {
    if (balances) {
      return balances.map((item) => {
        return (
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{item.assetType}</h5>
              <p class="card-text">{item.balance}</p>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div class="wrapper">
      <h2>Account Balance</h2>
      <div class="">{displayBalances()}</div>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

// AccountBalance.propTypes = {
//   onClick: PropTypes.func,
// };

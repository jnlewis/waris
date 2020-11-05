import React, { useState, useEffect } from "react";
import { getBalance, getKeyPair } from "../core/services/stellarService.js";
import styles from "./../styles/components/account-balance.style.js";
import StorageService from './../core/services/storageService';

export default function AccountBalance() {
  const [balances, setBalances] = useState();

  useEffect(() => {
    console.log('[useEffect] account balance');

    if (!balances) {
      const secretKey = StorageService.getLoggedInKey();
      const keypair = getKeyPair(secretKey);
  
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
          <div className="card" key={item.assetType}>
            <div className="card-body">
              <h5 className="card-title">{item.assetType}</h5>
              <p className="card-text">{item.balance}</p>
            </div>
          </div>
        );
      });
    }
  };

  const getAddress = () => {
    const secretKey = StorageService.getLoggedInKey();
    const keypair = getKeyPair(secretKey);
    return keypair.publicKey();
  }

  return (
    <div className="wrapper">
      <h2>Account Balance</h2>
      <div className="text-muted">Address: {getAddress()}</div>

      <div className="pt-4">
        {displayBalances()}
      </div>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

// AccountBalance.propTypes = {
//   onClick: PropTypes.func,
// };

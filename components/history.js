import React, { useState, useEffect } from "react";
import styles from "./../styles/components/history.style.js";
import StorageService from './../core/services/storageService';
import { getAccountTransactions, getKeyPair } from './../core/services/stellarService';

export default function History() {

  const [transactions, setTransactions] = useState();

  useEffect(() => {
    if (!transactions) {
      const secretKey = StorageService.getLoggedInKey();
      const keypair = getKeyPair(secretKey);

      getAccountTransactions(keypair.publicKey()).then((result) => {
        if (result) {
          setTransactions(result.records);
        }
      });
    }
  }, [transactions]);

  const displayTransactions = () => {
    if (transactions && transactions.length > 0) {
      return transactions.map((item, index) => {
        if (!item.memo || item.memo.trim() === '') {
          return <></>
        }
        return (
          <div className="card" key={index}>
            <div className="card-header">{item.created_at}</div>
            <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-text">{item.memo}</p>
            </div>
          </div>
        );
      });
    } else {
      return <div className="pb-4">No activities found on this account.</div>;
    }
  };

  return (
    <div className="wrapper">
      <h2>Account Activities</h2>
      <div className="text-muted">Here are your recent activities</div>
      <div className="pt-4">
        {/* {displayTransactions()} */}
        This screen is still in development.
      </div>
      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

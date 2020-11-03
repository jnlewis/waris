import React, { useState, useEffect } from "react";
import styles from "./../styles/components/claimables.style.js";
import TransactionDialog from "./../components/transaction-dialog";
import {
  getKeyPair,
  getClaimablesByBeneficiary,
  buildClaimTransaction,
} from "../core/services/stellarService";

export default function Claimables() {
  const [claimables, setClaimables] = useState();
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [txDialogTitle, setTxDialogTitle] = useState('');
  const [txDialogDesc, setTxDialogDesc] = useState('');
  const [transaction, setTransaction] = useState();

  const handleTxCancel = () => setShowTransactionDialog(false);
  const handleTxDone = () => setShowTransactionDialog(false);

  useEffect(() => {
    const secretKey = localStorage.getItem("loggedInKey");
    const keypair = getKeyPair(secretKey);

    getClaimablesByBeneficiary(keypair.publicKey()).then((result) => {
      setClaimables(result);
    });
  }, [claimables]);

  const handleClaim = (claimable) => {
    // const secretKey = localStorage.getItem("loggedInKey");
    // const keypair = getKeyPair(secretKey);
    // const tx = buildClaimTransaction(keypair, claimable.balanceId);
    const tx = null;
    setTransaction(tx);

    setTxDialogTitle(`Claim Submission`);
    setTxDialogDesc(`You are about to claim ${claimable.amount} ${claimable.asset}. Confirm submission?`);
    setShowTransactionDialog(true);
  };

  const displayClaimables = () => {
    if (claimables) {
      return claimables.map((item) => {
        return (
          <div className="card" key={item.balanceId}>
            <div className="card-header">{item.name}</div>
            <div className="card-body">
              <h5 className="card-title">
                {item.amount} {item.asset}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Claimable from {item.claimableDate}
              </h6>
              <a
                href="#"
                className="btn btn-primary"
                onClick={() => handleClaim(item)}
              >
                Claim
              </a>
            </div>
          </div>
        );
      });
    } else {
      return <div>You do not have any claimable funds.</div>;
    }
  };

  return (
    <div className="wrapper">
      <h2>Claimables</h2>
      <p>You are eligible to claim the following funds.</p>

      <div>{displayClaimables()}</div>
      <TransactionDialog
        show={showTransactionDialog}
        title={txDialogTitle}
        desc={txDialogDesc}
        onCancel={handleTxCancel}
        onFinish={handleTxDone}
        transaction={transaction}
      />
      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

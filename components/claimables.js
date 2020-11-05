import React, { useState, useEffect } from "react";
import styles from "./../styles/components/claimables.style.js";
import TransactionDialog from "./../components/transaction-dialog";
import {
  getKeyPair,
  getClaimablesByBeneficiary,
  buildClaimTransaction,
} from "../core/services/stellarService";
import StorageService from './../core/services/storageService';

export default function Claimables() {
  const [claimables, setClaimables] = useState();
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [txDialogTitle, setTxDialogTitle] = useState('');
  const [txDialogDesc, setTxDialogDesc] = useState('');
  const [transaction, setTransaction] = useState();
  const [transactionMetadata, setTransactionMetadata] = useState();

  const handleTxCancel = () => { setShowTransactionDialog(false); refreshListing(); }
  const handleTxDone = () => { setShowTransactionDialog(false); refreshListing(); }

  const refreshListing = () => {
    const secretKey = StorageService.getLoggedInKey();
    const keypair = getKeyPair(secretKey);
    getClaimablesByBeneficiary(keypair.publicKey()).then((result) => {
      setClaimables(result);
    });
  }

  useEffect(() => {
    console.log(`[useEffect] claimables`);

    if (!claimables) {
      const secretKey = StorageService.getLoggedInKey();
      const keypair = getKeyPair(secretKey);
  
      getClaimablesByBeneficiary(keypair.publicKey()).then((result) => {
        setClaimables(result);
      });
    }
  }, [claimables]);

  const handleClaim = (claimable) => {
    const secretKey = StorageService.getLoggedInKey();
    const keypair = getKeyPair(secretKey);
    const tx = buildClaimTransaction(keypair, claimable.balanceId);
    setTransaction(tx);

    // TODO: Temporary storage
    setTransactionMetadata({
      type: 'Claim',
      balanceId: claimable.balanceId
    });

    setTxDialogTitle(`Claim Submission`);
    setTxDialogDesc(`You are about to claim ${claimable.amount} ${claimable.asset}. Confirm submission?`);
    setShowTransactionDialog(true);
  };

  const displayClaimables = () => {
    if (claimables && claimables.length > 0) {
      return claimables.map((item, index) => {
        return (
          <div className="card" key={index}>
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
      <div className="text-muted">Funds you are eligible to claim</div>

      <div className="pt-4">
        {displayClaimables()}
      </div>
      <TransactionDialog
        show={showTransactionDialog}
        title={txDialogTitle}
        desc={txDialogDesc}
        onCancel={handleTxCancel}
        onFinish={handleTxDone}
        transaction={transaction}
        transactionMetadata={transactionMetadata}
      />
      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

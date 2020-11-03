import React, { useState, useEffect } from "react";
import styles from "./../styles/components/funds.style.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TransactionDialog from "./../components/transaction-dialog";
import {
  getKeyPair,
  getFundsByCreator,
  buildCreateClaimableBalanceTransaction,
  getAssetByName,
} from "../core/services/stellarService";

export default function Funds() {
  const [show, setShow] = useState(false);
  const [funds, setFunds] = useState([]);

  const [inputFundName, setInputFundName] = useState("");
  const [inputBeneficiaryAccount, setInputBeneficiaryAccount] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputClaimableDate, setInputClaimableDate] = useState("");

  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [txDialogTitle, setTxDialogTitle] = useState("");
  const [txDialogDesc, setTxDialogDesc] = useState("");
  const [transaction, setTransaction] = useState();

  const handleTxCancel = () => setShowTransactionDialog(false);
  const handleTxDone = () => setShowTransactionDialog(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const secretKey = localStorage.getItem("loggedInKey");
    const keypair = getKeyPair(secretKey);

    getFundsByCreator(keypair.publicKey()).then((result) => {
      setFunds(result);
    });
  }, [funds]);

  const handleCreate = () => {
    handleClose();
    // const secretKey = localStorage.getItem("loggedInKey");
    // const keypair = getKeyPair(secretKey);
    // const tx = buildCreateClaimableBalanceTransaction(
    //   keypair,
    //   inputBeneficiaryAccount,
    //   getAssetByName("native"),
    //   inputAmount,
    //   inputFundName,
    //   inputClaimableDate
    // );
    const tx = null;
    setTransaction(tx);

    setTxDialogTitle(`Create Fund Submission`);
    setTxDialogDesc(
      `You are about to create a claimable fund with ${inputAmount} Lumens. Confirm submission?`
    );
    setShowTransactionDialog(true);
  };

  const displayActiveFunds = () => {
    if (funds) {
      return funds.map((item) => {
        return (
          <div className="card" key={item.balanceId}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {item.amount} {item.asset}
              </h6>
              <p className="card-text">Claimable From: {item.claimableDate}</p>
              <p className="card-text">
                Benificiary Account:
                {item.beneficiaryAccount}
              </p>
              <a href="#" className="card-link text-danger">
                Invalidate
              </a>
            </div>
          </div>
        );
      });
    } else {
      return <div>No funds</div>;
    }
  };

  return (
    <div className="wrapper">
      <h2>Active Funds</h2>
      <div>
        {displayActiveFunds()}
        <div>
          <button className="btn btn-primary" onClick={() => handleShow()}>
            Create New
          </button>
        </div>
      </div>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a new fund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label>Fund Name</label>
              <input
                className="form-control"
                value={inputFundName}
                onInput={(e) => setInputFundName(e.target.value)}
                placeholder="Eg: Jane's Education Fund"
              />
            </div>
            <div className="form-group">
              <label>Benificiary Account</label>
              <input
                className="form-control"
                value={inputBeneficiaryAccount}
                onInput={(e) => setInputBeneficiaryAccount(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                className="form-control"
                value={inputAmount}
                onInput={(e) => setInputAmount(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label>Claimable Date</label>
              <input
                className="form-control"
                value={inputClaimableDate}
                onInput={(e) => setInputClaimableDate(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

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

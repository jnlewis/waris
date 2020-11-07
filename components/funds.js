import React, { useState, useEffect } from "react";
import styles from "./../styles/components/funds.style.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TransactionDialog from "./../components/transaction-dialog";
import {
  getKeyPair,
  getClaimablesByCreator,
  buildCreateClaimableBalanceTransaction,
  getAssetByName,
  getLatestClaimableBalanceId,
} from "../core/services/stellarService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StorageService from "./../core/services/storageService";

export default function Funds() {
  const [show, setShow] = useState(false);
  const [funds, setFunds] = useState();

  const [inputFundName, setInputFundName] = useState("");
  const [inputBeneficiaryAccount, setInputBeneficiaryAccount] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputClaimableDate, setInputClaimableDate] = useState(new Date());

  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [txDialogTitle, setTxDialogTitle] = useState("");
  const [txDialogDesc, setTxDialogDesc] = useState("");
  const [transaction, setTransaction] = useState();
  const [transactionMetadata, setTransactionMetadata] = useState();

  const handleTxCancel = () => {
    setShowTransactionDialog(false);
    refreshListing();
  };
  const handleTxDone = () => {
    setShowTransactionDialog(false);
    refreshListing();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refreshListing = () => {
    const secretKey = StorageService.getLoggedInKey();
    const keypair = getKeyPair(secretKey);
    getClaimablesByCreator(keypair.publicKey()).then((result) => {
      setFunds(result);
    });
  };

  useEffect(() => {
    if (!funds) {
      const secretKey = StorageService.getLoggedInKey();
      const keypair = getKeyPair(secretKey);

      getClaimablesByCreator(keypair.publicKey()).then((result) => {
        setFunds(result);
      });
    }
  }, [funds]);

  const handleCreate = () => {
    const secretKey = StorageService.getLoggedInKey();
    const keypair = getKeyPair(secretKey);

    // Validate input
    if (
      inputBeneficiaryAccount.trim() === "" ||
      inputAmount.trim() === "" ||
      inputFundName.trim() === ""
    ) {
      alert("Please enter all fields.");
      return;
    }

    // Create transaction
    buildCreateClaimableBalanceTransaction(
      keypair,
      inputBeneficiaryAccount,
      getAssetByName("native"),
      inputAmount,
      inputFundName,
      inputClaimableDate
    )
      .then((tx) => {
        handleClose();
        setTransaction(tx);

        // TODO: Metadata will be stored in local storage after transaction submitted successfully
        // for demo purpose because we are currently not able to retrieve the transaction meta text from claimable_balances endpoint
        setTransactionMetadata({
          type: "CreateClaimable",
          balanceId: null,  // we can get and set the balanceId after transaction is submitted
          name: inputFundName,
          amount: inputAmount,
          asset: "XLM",
          claimableDate: inputClaimableDate,
          beneficiaryAccount: inputBeneficiaryAccount,
          sender: keypair.publicKey(),
        });

        // Show the transaction dialog
        setTxDialogTitle(`Create Fund Submission`);
        setTxDialogDesc(
          `You are about to create a claimable fund with ${inputAmount} XLM. Confirm submission?`
        );
        setShowTransactionDialog(true);
      })
      .catch((error) => {
        alert(
          "Failed to create transaction. Please make sure the beneficiary account is valid."
        );
        console.log(error);
      });
  };

  const displayActiveFunds = () => {
    if (funds && funds.length > 0) {
      return funds.map((item, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {item.amount} {item.asset}
              </h6>
              <p className="card-text">Claimable from {item.claimableDate}</p>
              <p className="card-text small">
                Benificiary Account:
                <br />
                {item.beneficiaryAccount}
              </p>
              <a href="#" className="card-link btn text-danger">
                Invalidate
              </a>
            </div>
          </div>
        );
      });
    } else {
      return <div className="pb-4">You do not have any active funds.</div>;
    }
  };

  return (
    <div className="wrapper">
      <h2>Active Funds</h2>
      <div className="text-muted">
        Your funds which have yet to be claimed by beneficiary
      </div>
      <div className="pt-4">
        <div>{displayActiveFunds()}</div>
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
                maxLength="28"
              />
            </div>
            <div className="form-group">
              <label>Benificiary Account</label>
              <input
                className="form-control"
                value={inputBeneficiaryAccount}
                onInput={(e) => setInputBeneficiaryAccount(e.target.value)}
                placeholder=""
                maxLength="60"
              />
            </div>
            <div className="form-group">
              <label>Asset</label>
              <select className="form-control">
                <option selected="true">XLM</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                className="form-control"
                type="number"
                value={inputAmount}
                onInput={(e) => setInputAmount(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label>Claimable Date</label>
              <div>
                <DatePicker
                  className="form-control"
                  selected={inputClaimableDate}
                  onChange={(date) => setInputClaimableDate(date)}
                />
              </div>
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
        transactionMetadata={transactionMetadata}
      />

      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import styles from "./funds.style.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getClaimablesByCreator,
  createClaimableBalance,
} from "../core/services/stellarServiceMock";

export default function Funds() {
  const [isCreating, setIsCreating] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [show, setShow] = useState(false);
  const [funds, setFunds] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const secretKey = localStorage.getItem("loggedInKey");
    const keypair = getKeyPair(secretKey);

    getClaimablesByCreator(keypair.publicKey()).then((funds) => {
      setFunds(funds);
    });
  }, [funds]);

  const create = () => {
    setIsCreating(true);

    // TODO: get the values from screen

    // createClaimableBalance().then(result => {
    // if failed setShowRetry
    // if success .. need to refresh screen to show new thing and close the dialog box
    // });
  };

  const retry = () => {
    setIsCreating(true);

    // createClaimableBalance().then(result => {

    // });
  };

  const displayActiveFunds = () => {
    if (funds) {
      return funds.map((item) => {
        return (
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {item.amount} {item.asset}
              </h6>
              <p class="card-text">Claimable From: {item.claimableDate}</p>
              <p class="card-text">
                Benificiary Account:
                {item.beneficiaryAccount}
              </p>
              <a href="#" class="card-link">
                Edit
              </a>
              <a href="#" class="card-link text-danger">
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
    <div class="wrapper">
      <h2>Active Funds</h2>
      <div class="">
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
            <div class="form-group">
              <label for="exampleInputEmail1">Fund Name</label>
              <input
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Eg: Tiffany's Education Fund"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Benificiary Account</label>
              <input
                class="form-control"
                id="exampleInputEmail1"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Amount</label>
              <input
                class="form-control"
                id="exampleInputEmail1"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Claimable Date</label>
              <input
                class="form-control"
                id="exampleInputEmail1"
                placeholder=""
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!isCreating && (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {!showRetry && (
                <Button variant="primary" onClick={create}>
                  Create
                </Button>
              )}
              {showRetry && (
                <Button variant="primary" onClick={retry}>
                  Retry
                </Button>
              )}
            </>
          )}
          {isCreating && (
            <div>Please wait. This may take a couple of minutes</div>
          )}
        </Modal.Footer>
      </Modal>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

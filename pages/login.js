import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./login.style.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getKeyPair,
  isAccountExists,
  generateKeyAndCreateAccount,
} from "./../core/services/stellarService";

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showLoginByKey, setShowLoginByKey] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [input, setInput] = useState("");
  const [newAccountSecret, setNewAccountSecret] = useState("");

  const handleCloseLoginByKey = () => setShowLoginByKey(false);
  const handleShowLoginByKey = () => setShowLoginByKey(true);
  const handleCloseCreateAccount = () => setShowCreateAccount(false);
  const handleShowCreateAccount = () => {
    console.log(`[handleShowCreateAccount]`);
    setShowCreateAccount(true);
    setIsLoading(true);
    generateKeyAndCreateAccount().then((newSecret) => {
      console.log(
        `[handleShowCreateAccount] returning from promise with result ${newSecret}`
      );
      setIsLoading(false);
      setNewAccountSecret(newSecret);
    });
  };

  const loginWithSecret = () => {
    const keypair = getKeyPair(input);
    if (!keypair) {
      setInput("");
      alert("The format of the key is incorrect.");
      return;
    }

    setIsLoading(true);
    isAccountExists(keypair.publicKey()).then((exists) => {
      console.log(`returning from promise ${exists}`);
      setIsLoading(false);
      if (exists) {
        localStorage.setItem("loggedInKey", input);
        router.push("/account");
      } else {
        setInput("");
        alert("Unable to login. Please ensure that account exists on testnet.");
      }
    });
  };

  const createAccount = () => {
    console.log(`[createAccount]`);
  };

  return (
    <div class="main-container">
      <Head>
        <title>Waris - Login</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://kit.fontawesome.com/23a717da0a.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <header id="header" class="header-fixed">
        <div class="container">
          <div id="logo" class="pull-left">
            <h1>
              <a href="#intro" class="scrollto">
                Waris
              </a>
            </h1>
          </div>
          <nav id="nav-menu-container">
            <ul class="nav-menu">
              <li>
                <a href="/">Back to Home</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="more-features" class="section-bg">
        <div class="container">
          <div class="section-header">
            <h3 class="section-title">Access Your Account</h3>
            <span class="section-divider"></span>
            <p class="section-description">
              Your Waris account on the blockchain is linked to your Stellar
              wallet. <br />
              You access your private notes by logging in using your wallet
              keyfile.
            </p>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="file-input box">
                <div style={{ padding: 40 + "px" }}>
                  <div class="icon">
                    <i class="fas fa-key icon-large"></i>
                  </div>
                  <h4 class="title">
                    <a onClick={handleShowLoginByKey}>Login with Secret Key</a>
                  </h4>
                  <p class="description">
                    Your secret key will only be kept on your device browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="file-input box">
                <div style={{ padding: 40 + "px" }}>
                  <div class="icon">
                    <i class="fas fa-wallet icon-large"></i>
                  </div>
                  <h4 class="title">
                    <a>Login with Wallet (Coming Soon)</a>
                  </h4>
                  <p class="description">Drop or browse your wallet here.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 section-header">
              <p class="description create-account">
                <a className="create-account" onClick={handleShowCreateAccount}>
                  Don't have a wallet? Create one for free.
                </a>
              </p>
            </div>
          </div>
          <div class="row" style={{ marginTop: 20 + "px" }}>
            <div class="col-lg-12 section-header">
              <i class="fas fa-exclamation-triangle warning-icon"></i>
              <p class="section-description" style={{ textAlign: "left" }}>
                Alpha Build: Waris is currently in development and will use the
                Stellar Testnet for account creation and all transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showLoginByKey} onHide={handleCloseLoginByKey}>
        <Modal.Header closeButton>
          <Modal.Title>Login with Secret Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div class="form-group">
              <input
                class="form-control"
                value={input}
                onInput={(e) => setInput(e.target.value)}
                placeholder="Your Stellar account secret key"
              />
              <small class="form-text text-muted">
                We'll never store your secret key.
              </small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!isLoading && (
            <>
              <Button variant="secondary" onClick={handleCloseLoginByKey}>
                Cancel
              </Button>
              <Button variant="primary" onClick={loginWithSecret}>
                Login
              </Button>
            </>
          )}
          {isLoading && (
            <div>
              <Button variant="primary">Logging in...</Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateAccount} onHide={handleCloseCreateAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Creating New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <div>Creating your account. Please wait...</div>}
          {!isLoading && newAccountSecret && (
            <div>
              <p>
                Your account is created. Please take note of your secret key and
                keep it safely.
              </p>
              <textarea disabled className="key-textarea">
                {newAccountSecret}
              </textarea>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isLoading && (
            <Button variant="secondary" onClick={handleCloseCreateAccount}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

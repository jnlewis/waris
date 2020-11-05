import React from "react";
import styles from "./../styles/components/history.style.js";
import StorageService from './../core/services/storageService';

export default function History() {
  return (
    <div className="wrapper">
      <h2>Account Activities</h2>
      <div className="text-muted">Account history is not yet available.</div>

      {/* <div className="card">
        <div className="card-header">30 January 2020</div>
        <div className="card-body">
          <h5 className="card-title">Claimed Will</h5>
          <p className="card-text">You claimed 3000 Lumens</p>
        </div>
      </div> */}
      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

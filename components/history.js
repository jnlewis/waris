import React from "react";
import styles from "./../styles/components/history.style.js";

export default function History() {
  return (
    <div className="wrapper">
      <h2>Account Activities</h2>

      <div className="card">
        <div className="card-header">30 January 2020</div>
        <div className="card-body">
          <h5 className="card-title">Claimed Will</h5>
          <p className="card-text">You claimed 3000 Lumens</p>
        </div>
      </div>
      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

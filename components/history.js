import React from "react";
import styles from "./history.style.js";

export default function History() {
  return (
    <div class="wrapper">
      <h2>Account Activities</h2>

      <div class="card">
        <div class="card-header">30 January 2020</div>
        <div class="card-body">
          <h5 class="card-title">Claimed Will</h5>
          <p class="card-text">You claimed 3000 Lumens</p>
        </div>
      </div>
      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

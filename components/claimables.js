import React from "react";
import styles from "./../styles/components/claimables.style.js";

export default function Claimables() {
  return (
    <div class="wrapper">
      <h2>Claimables</h2>
      <p>You are eligible to claim the following funds.</p>

      <div class="">
        <div class="card">
          <div class="card-header">Tiffany's Education Fund</div>
          <div class="card-body">
            <h5 class="card-title">3000 Lumens</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Claimable from 2020-10-20
            </h6>
            <a href="#" class="btn btn-primary">
              Claim
            </a>
          </div>
        </div>
      </div>
      <style jsx global>
        {styles}
      </style>
    </div>
  );
}

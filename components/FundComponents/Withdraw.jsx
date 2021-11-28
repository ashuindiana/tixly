import React from "react";
import styles from "./FundComponents.module.css";

function Withdraw({ withdrawAmt, handleWithdrawAmt }) {
  return (
    <div
      style={{ marginBottom: "3rem", height: "30rem" }}
      className={styles.card}
    >
      <div style={{ fontSize: "3rem" }}>Withdraw</div>
      <div style={{ fontSize: "2rem" }}>Enter amount (in ₹)</div>
      <div className={styles.card_input}>
        <input
          type="number"
          placeholder="0"
          value={withdrawAmt}
          onChange={handleWithdrawAmt}
        />
      </div>
      <div style={{ fontSize: "1.5rem" }}>*Min account balance: ₹ 100</div>
      <div className={styles.button}>
        <button>Withdraw</button>
      </div>
    </div>
  );
}

export default Withdraw;

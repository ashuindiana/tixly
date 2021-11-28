import React from "react";
import styles from "./FundComponents.module.css";

function Recharge({ rchgAmt, handleRchgAmt, handleRchgAmtAddition }) {
  return (
    <div
      style={{ marginBottom: "3rem", height: "35rem" }}
      className={styles.card}
    >
      <div style={{ fontSize: "3rem" }}>Recharge</div>
      <div style={{ fontSize: "2rem" }}>Enter amount (in ₹)</div>
      <div className={styles.card_input}>
        <input
          type="number"
          placeholder="0"
          value={rchgAmt}
          onChange={handleRchgAmt}
        />
      </div>
      <div className={styles.recharge_amt_wrapper}>
        <div className={styles.rchg_amt} onClick={handleRchgAmtAddition(250)}>
          + ₹ 250
        </div>
        <div className={styles.rchg_amt} onClick={handleRchgAmtAddition(500)}>
          + ₹ 500
        </div>
        <div className={styles.rchg_amt} onClick={handleRchgAmtAddition(1000)}>
          + ₹ 1000
        </div>
      </div>
      <div className={styles.button}>
        <button>Recharge</button>
      </div>
    </div>
  );
}

export default Recharge;

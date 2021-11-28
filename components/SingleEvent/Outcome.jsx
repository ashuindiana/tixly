import { useState } from "react";
import styles from "./outcome.module.css";

function Outcome({ type }) {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(1);
  return (
    <div className={styles.container}>
      <div className={styles.sliderDiv}>
        <div className={styles.upperRow}>
          <div className={styles.rowTitle}>Qty</div>
          <div className={styles.input}>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.lowerRow}>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className={`${styles.slider} ${
              type === "yes" ? styles.yesSlider : styles.noSlider
            }`}
          />
        </div>
      </div>
      <div className={styles.sliderDiv}>
        <div className={styles.upperRow}>
          <div className={styles.rowTitle}>Price(₹)</div>
          <div className={styles.input}>
            <input
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.lowerRow}>
          <input
            type="range"
            step="1"
            min="1"
            max="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`${styles.slider} ${
              type === "yes" ? styles.yesSlider : styles.noSlider
            }`}
          />
        </div>
      </div>
      <div className={styles.result}>
        <div className={styles.resultItem}>
          <div>₹ {qty * price}</div>
          <div>Total Amount</div>
        </div>
        <div className={styles.resultItem}>
          <div>₹ 4</div>
          <div>Potential Win</div>
        </div>
      </div>
      <div className={styles.fundsInfo}>
        <div>Available Funds</div>
        <div>₹ 400</div>
      </div>
      <div className={styles.commissionInfo}>
        <div className={styles.commUpper}>
          <div>Commmission</div>
          <div>₹ 1</div>
        </div>
        <div className={styles.commLower}>*5% of potential win</div>
      </div>
      <div style={{ width: "100%" }}>
        <button
          type="submit"
          className={`${type === "yes" ? styles.yesButton : styles.noButton} ${
            styles.button
          }`}
        >
          Pick {type === "yes" ? "Yes" : "No"}
        </button>
      </div>
    </div>
  );
}

export default Outcome;

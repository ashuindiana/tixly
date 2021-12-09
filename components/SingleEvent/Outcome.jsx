import { useState } from "react";
import styles from "./outcome.module.css";
import Slider from "@mui/material/Slider";

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
          <Slider
            step={1}
            min={1}
            max={100}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            sx={{
              color: `${type === "yes" ? "#81d373" : "#f65179"}`,
              width: "50%",
              borderRadius: "25px",
              height: "12px",
              "& .MuiSlider-rail": {
                color: "#fff",
                border: "1px solid #D8D8D8",
              },
              "& .MuiSlider-thumb": {
                height: 25,
                width: 25,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "none",
                },
              },
            }}
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
          <Slider
            step={1}
            min={1}
            max={100}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{
              color: `${type === "yes" ? "#81d373" : "#f65179"}`,
              width: "50%",
              borderRadius: "25px",
              height: "12px",
              "& .MuiSlider-rail": {
                color: "#fff",
                border: "1px solid #D8D8D8",
              },
              "& .MuiSlider-thumb": {
                height: 25,
                width: 25,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "none",
                },
              },
            }}
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
          <div style={{ fontSize: "1.7rem" }}>Commmission</div>
          <div>*5% of potential win</div>
        </div>
        <div className={styles.commLower}>₹ 1</div>
      </div>
      <div style={{ width: "85%" }}>
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

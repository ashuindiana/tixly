import React from "react";
import styles from "./recent.module.css";

function Recent({ recentData }) {
  return (
    <div className={styles.card}>
      {recentData.map((item) => (
        <div className={styles.recentEvent} key={item.id}>
          <div className={styles.upper}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.time}>{item.timeElapsed} minutes ago</div>
          </div>
          <div className={styles.lower}>
            Picked {item.tradeType} @ ₹{item.price}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recent;

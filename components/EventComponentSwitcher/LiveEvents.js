import React from "react";
import ContentCards from "../ContentCards/ContentCards";
import styles from "./Switcher.module.css";

function LiveEvents({ trades, investment, card_details, live_data }) {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header_item}>
          <div className={styles.firstRow}>{trades}</div>
          <div className={styles.secondRow}>Trades</div>
        </div>
        <div className={styles.header_item}>
          <div className={styles.firstRow}>₹ {investment}</div>
          <div className={styles.secondRow}>Investment</div>
        </div>
      </div>
      <ContentCards events={live_data} card_details={card_details} />
    </div>
  );
}

export default LiveEvents;

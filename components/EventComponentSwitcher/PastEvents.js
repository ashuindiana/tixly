import React from "react";
import ContentCards from "../ContentCards/ContentCards";
import styles from "./Switcher.module.css";

function PastEvents({ trades, investment, returns, card_details, past_data }) {
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
        <div className={styles.header_item}>
          <div className={styles.firstRow}>₹ {returns}</div>
          <div className={styles.secondRow}>Returns</div>
        </div>
      </div>
      <ContentCards
        events={past_data}
        card_details={card_details}
        dataType="past"
      />
    </div>
  );
}

export default PastEvents;

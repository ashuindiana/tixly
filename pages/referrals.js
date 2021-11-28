import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/referrals.module.css";

function positions() {
  const [isCopied, setIsCopied] = useState(false);
  const inviteCode = "i09824rah";

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      // For IE
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    copyTextToClipboard(inviteCode)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      exit={{
        opacity: 0,
        x: -50,
        transitionDelay: 0.3,
      }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.info}>
              <div className={styles.firstRow}>2</div>
              <div className={styles.secondRow}>People Invited</div>
            </div>
            <div className={styles.info}>
              <div className={styles.firstRow}>₹ 250</div>
              <div className={styles.secondRow}>Earnings</div>
            </div>
          </div>
          <div className={styles.right}>
            Get ₹ 10 for every user you invite on Tixly. Users who join using
            your code will get an additional balance of ₹ 10
          </div>
        </div>
        <div className={styles.below}>
          <div className={styles.left_below}>
            <div style={{ color: "#9B9B9B", fontSize: "3rem" }}>History</div>
            <div className={styles.card}>
              <div className={styles.card_header}>
                <div className={styles.card_title}>@tauronihal joined</div>

                <div className={styles.card_change_pos}>+ ₹20</div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.card_header}>
                <div className={styles.card_title}>Withdrawal</div>
                <div className={styles.card_change_neg}>- ₹ 20</div>
              </div>
              <div className={styles.card_details}>
                <div>Captured at: Aug, 10, 2021 2:10PM</div>
                <div>Closing balance: ₹ 10</div>
                <div>Deducted for withdrawing</div>
              </div>
            </div>
          </div>
          <div className={styles.right_below}>
            <div className={styles.card}>
              <div style={{ fontSize: "3rem" }}>Invite</div>
              <div className={styles.card_input}>
                <input type="text" placeholder={inviteCode} readOnly />
              </div>
              <div className={styles.button}>
                <button onClick={handleCopyClick}>
                  {isCopied ? "Copied!" : "Copy Code"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default positions;

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/funds.module.css";
import Recharge from "../components/FundComponents/Recharge";
import Withdraw from "../components/FundComponents/Withdraw";
import Header from "../components/Header/Header";

function Funds() {
  const [rchgAmt, setRchgAmt] = useState(0);
  const [withdrawAmt, setWithdrawAmt] = useState(0);
  const [rchgIsOpen, setRchgIsOpen] = useState(false);
  const [withdrawIsOpen, setWithdrawIsOpen] = useState(false);

  const handleRchgAmt = (e) => {
    setRchgAmt(e.target.value);
  };

  const handleRchgAmtAddition = (addVal) => (e) => {
    setRchgAmt(rchgAmt + addVal);
  };

  const handleWithdrawAmt = (e) => {
    setWithdrawAmt(e.target.value);
  };

  const handleRchgOpen = () => {
    setRchgIsOpen(!rchgIsOpen);
    setWithdrawIsOpen(false);
  };

  const handleWithdrawOpen = () => {
    setWithdrawIsOpen(!withdrawIsOpen);
    setRchgIsOpen(false);
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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // padding: "0 5%",
      }}
    >
      <Header noSearch />
      <div
        style={{ padding: "0 5%", display: "flex", flexDirection: "column" }}
      >
        <div className={styles.container}>
          <div className={styles.left}>
            <div>
              <div className={styles.firstRow}>Funds Balance</div>
              <div className={styles.secondRow}>₹ 300</div>
            </div>
            <div className={styles.mobile}>
              <div className={styles.button_wrapper}>
                <button onClick={handleRchgOpen}>
                  {rchgIsOpen ? "Close" : "Add Funds"}
                </button>
                <button onClick={handleWithdrawOpen}>
                  {withdrawIsOpen ? "Close" : "Withdraw"}
                </button>
              </div>
              <div style={{ width: "80%" }}>
                <AnimatePresence exitBeforeEnter>
                  {rchgIsOpen && (
                    <motion.div
                      key={0}
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, type: "easeInOut" }}
                      exit={{ y: 20 }}
                    >
                      <Recharge
                        rchgAmt={rchgAmt}
                        handleRchgAmt={handleRchgAmt}
                        handleRchgAmtAddition={handleRchgAmtAddition}
                      />
                    </motion.div>
                  )}
                  {withdrawIsOpen && (
                    <motion.div
                      key={1}
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, type: "easeInOut" }}
                      exit={{ y: 20 }}
                    >
                      <Withdraw
                        withdrawAmt={withdrawAmt}
                        handleWithdrawAmt={handleWithdrawAmt}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div>
              <div className={styles.firstRow}>History</div>
              <div className={styles.card}>
                <div className={styles.card_header}>
                  <div className={styles.card_title}>Added Balance</div>

                  <div className={styles.card_change_pos}>+ ₹20</div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.card_header}>
                  <div className={styles.card_title}>
                    Will india win many medals in olympic 2021 ?
                  </div>
                  <div className={styles.card_change_neg}>- ₹ 20</div>
                </div>
                <div className={styles.card_details}>
                  <div>Captured at: Aug, 10, 2021 2:10PM</div>
                  <div>Closing balance: ₹ 10</div>
                  <div>Deducted for placing trade</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Recharge
              rchgAmt={rchgAmt}
              handleRchgAmt={handleRchgAmt}
              handleRchgAmtAddition={handleRchgAmtAddition}
            />
            <Withdraw
              withdrawAmt={withdrawAmt}
              handleWithdrawAmt={handleWithdrawAmt}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Funds;

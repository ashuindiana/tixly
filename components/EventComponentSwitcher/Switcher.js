import React, { useState } from "react";
import LiveEvents from "./LiveEvents";
import PastEvents from "./PastEvents";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Switcher.module.css";

function Switcher({ live_data, past_data }) {
  const [curEvent, setCurEvent] = useState("live");
  return (
    <div className={styles.switcherWrapper}>
      <div className={styles.eventWrapper}>
        <div
          onClick={() => setCurEvent("live")}
          className={`${styles.event} ${
            curEvent === "live" && styles.event_active
          }`}
        >
          <h2>Live Events</h2>
        </div>
        <div
          onClick={() => setCurEvent("past")}
          className={`${styles.event} ${
            curEvent === "past" && styles.event_active
          }`}
        >
          <h2>Past Events</h2>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {curEvent === "live" ? (
          <motion.div
            key={0}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ y: 20 }}
          >
            <LiveEvents
              trades={2}
              investment={500}
              card_details={["trades", "investment"]}
              live_data={live_data}
            />
          </motion.div>
        ) : (
          <motion.div
            key={1}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ y: 20 }}
          >
            <PastEvents
              trades={2}
              investment={500}
              returns={90}
              card_details={["trades", "investment", "returns"]}
              past_data={past_data}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Switcher;

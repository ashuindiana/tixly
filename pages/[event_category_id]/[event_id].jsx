import { server } from "../../config";
import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/event.module.css";
import { Line } from "react-chartjs-2";
import { AnimatePresence, motion } from "framer-motion";
import About from "../../components/SingleEvent/About";
import Recent from "../../components/SingleEvent/Recent";
import Community from "../../components/SingleEvent/Community";
import Outcome from "../../components/SingleEvent/Outcome";

const recentData = [
  {
    name: "Ashutosh",
    timeElapsed: "30",
    price: "9",
    tradeType: "yes",
    id: "0",
  },
  {
    name: "Asit",
    timeElapsed: "30",
    price: "9",
    tradeType: "no",
    id: "1",
  },
];

const communityData = [
  {
    name: "Ashutosh",
    comment: "I think this will be yes and in the long run its good",
    id: "0",
    timeElapsed: "30",
  },
  {
    name: "Asit",
    comment: "So what ?",
    timeElapsed: "30",
    id: "1",
  },
];

function SingleEvent({ data }) {
  const [curEvent, setCurEvent] = useState("about");
  const [outcome, setOutcome] = useState("yes");
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.image}>
              <Image src={data.imgSrc} alt="" layout="fill" objectFit="cover" />
            </div>
            <div className={styles.title}>{data.title}</div>
          </div>
          <div className={styles.details}>
            <div className={styles.detail_item}>
              <div className={styles.upperRow}>Market Ends On</div>
              <div className={styles.lowerRow}>{data.marketEnd}</div>
            </div>
            <div className={styles.detail_item}>
              <div className={styles.upperRow}>Total Volume</div>
              <div className={styles.lowerRow}>{data.volume}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.lower}>
        <div className={styles.left}>
          <div className={styles.chart}>
            <Line
              data={{
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [
                  {
                    label: "YES",
                    data: [12, 19, 3, 5, 2, 3],
                    fill: false,
                    borderColor: "#81D373",
                    tension: 0.1,
                  },
                  {
                    label: "NO",
                    data: [10, 9, 7, 2, 10, 11],
                    fill: false,
                    borderColor: "#F65179",
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: false,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
          <div className={styles.switcherWrapper}>
            <div className={styles.eventWrapper}>
              <div
                onClick={() => setCurEvent("about")}
                className={`${styles.event} ${
                  curEvent === "about" && styles.event_active
                }`}
              >
                <h2>About this Event</h2>
              </div>
              <div
                onClick={() => setCurEvent("recent")}
                className={`${styles.event} ${
                  curEvent === "recent" && styles.event_active
                }`}
              >
                <h2>Recent Trades</h2>
              </div>
              <div
                onClick={() => setCurEvent("community")}
                className={`${styles.event} ${
                  curEvent === "community" && styles.event_active
                }`}
              >
                <h2>Community</h2>
              </div>
            </div>
            <AnimatePresence exitBeforeEnter>
              {curEvent === "about" ? (
                <motion.div
                  key={0}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ y: 20 }}
                  style={{ width: "100%" }}
                >
                  <About />
                </motion.div>
              ) : curEvent === "recent" ? (
                <motion.div
                  key={1}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ y: 20 }}
                  style={{ width: "100%" }}
                >
                  <Recent recentData={recentData} />
                </motion.div>
              ) : (
                <motion.div
                  key={2}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ y: 20 }}
                >
                  <Community communityData={communityData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.right}>
          <h2>Pick Outcome</h2>
          <div className={styles.switcherWrapper}>
            <div className={styles.rightEventWrapper}>
              <div className={styles.rightEvent}>
                <button
                  onClick={() => setOutcome("yes")}
                  className={`${outcome === "yes" && styles.yesEvent_active}`}
                >
                  Yes
                </button>
              </div>
              <div className={styles.rightEvent}>
                <button
                  onClick={() => setOutcome("no")}
                  className={`${outcome === "no" && styles.noEvent_active}`}
                >
                  No
                </button>
              </div>
            </div>
            <AnimatePresence exitBeforeEnter>
              {outcome === "yes" ? (
                <motion.div
                  key={0}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ y: 20 }}
                >
                  <Outcome type="yes" />
                </motion.div>
              ) : (
                <motion.div
                  key={1}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ y: 20 }}
                >
                  <Outcome type="no" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `${server}/api/event_categories/${context.params.event_category_id}/${context.params.event_id}`
  );

  const data = await res.json();

  return {
    props: {
      data: data.message[0].events,
    },
    revalidate: 1, //Incremental Site Generation after every 1sec
  };
};

export const getStaticPaths = async () => {
  const CategRes = await fetch(`${server}/api/event_categories`);

  const data = await CategRes.json();

  const paths = [];

  for (var i = 0; i < data.message.length; i++) {
    for (var j = 0; j < data.message[i].events.length; j++) {
      paths.push({
        params: {
          event_category_id: data.message[i]._id.toString(),
          event_id: data.message[i].events[j].id.toString(),
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export default SingleEvent;

import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/event.module.css";
import { Line } from "react-chartjs-2";
import { AnimatePresence, motion } from "framer-motion";
import About from "../../components/SingleEvent/About";
import Recent from "../../components/SingleEvent/Recent";
import Community from "../../components/SingleEvent/Community";
import Outcome from "../../components/SingleEvent/Outcome";
import { dbConnect } from "../../utils/dbConnect";
import Header from "../../components/Header/Header";

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
    name: "Ashutosh",
    comment: "I think this will be yes and in the long run its good",
    id: "0",
    timeElapsed: "30",
  },
  {
    name: "Ashutosh",
    comment: "I think this will be yes and in the long run its good",
    id: "0",
    timeElapsed: "30",
  },
  {
    name: "Ashutosh",
    comment: "I think this will be yes and in the long run its good",
    id: "0",
    timeElapsed: "30",
  },
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
  {
    name: "Ashu",
    comment: "Nothing",
    timeElapsed: "20",
    id: "3",
  },
];

function Event({ data }) {
  // return <h2>Hii</h2>;
  const [curEvent, setCurEvent] = useState("about");
  const [outcome, setOutcome] = useState("yes");
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
          <div className={styles.upper}>
            <div className={styles.card}>
              <div className={styles.header}>
                <div className={styles.image}>
                  <Image
                    src={data.events.imgSrc}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.titleAndHash}>
                  <span className={styles.hashTag}>#{data.title}</span>
                  <div className={styles.title}>{data.events.title}</div>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.detail_item}>
                  <div className={styles.upperRow}>Market Ends On</div>
                  <div className={styles.lowerRow}>{data.events.marketEnd}</div>
                </div>
                <div className={styles.detail_item}>
                  <div className={styles.upperRow}>Total Volume</div>
                  <div className={styles.lowerRow}>₹ {data.events.volume}</div>
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
                      className={`${
                        outcome === "yes" && styles.yesEvent_active
                      }`}
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
      </div>
    </motion.div>
  );
}

export const getStaticProps = async (context) => {
  try {
    let { db } = await dbConnect();
    // fetch the posts
    let event = await db
      .collection("event_categories")
      .aggregate([
        // {
        //   $match: {
        //     _id: ObjectId(context.params.eventCategoryId),
        //   },
        // },
        { $unwind: "$events" },
        {
          $match: {
            "events.id": context.params.event_id,
          },
        },
      ])
      .toArray();

    return {
      props: {
        data: JSON.parse(JSON.stringify(event[0])),
      },
      revalidate: 1,
    };
  } catch (error) {
    // return the error
    throw new Error(error);
  }
};

export const getStaticPaths = async () => {
  try {
    // connect to the database
    let { db } = await dbConnect();
    // fetch the posts
    let event_categories = await db
      .collection("event_categories")
      .find({})
      .toArray();

    const data = JSON.parse(JSON.stringify(event_categories));
    const events = data.flatMap((item) => item.events);

    // for (var i = 0; i < data.length; i++) {
    //   for (var j = 0; j < data[i].events.length; j++) {
    //     paths.push({
    //       params: {
    //         // eventCategoryId: data[i]._id.toString(),
    //         slug: data[i].events[j].id.toString(),
    //       },
    //     });
    //   }
    // }

    const paths = events.map((item) => ({
      params: {
        event_id: item.id.toString(),
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    // return the error
    throw new Error(error);
  }
};

export default Event;
